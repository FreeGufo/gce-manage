package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/pkg/errors"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	compute "google.golang.org/api/compute/v1"
	appengine "google.golang.org/appengine"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/urlfetch"
)

func init() {
	instanceAPI := instanceAPI{}
	projectAPI := projectAPI{}

	http.HandleFunc("/instance", instanceAPI.handler)
	http.HandleFunc("/projectid", projectAPI.get)
}

type projectAPI struct{}

func (p *projectAPI) get(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	project := appengine.AppID(ctx)
	m := map[string]string{
		"projectId": project,
	}
	b, err := json.Marshal(m)
	if err != nil {
		log.Errorf(ctx, "json.Marshal error: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, string(b))
}

type instanceAPI struct{}

func (i *instanceAPI) handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		i.post(w, r)
	case "GET":
		i.get(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (i *instanceAPI) get(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	project := appengine.AppID(ctx)

	s, err := NewComputeService(ctx)
	if err != nil {
		log.Errorf(ctx, "ERROR compute.New: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	zs := compute.NewZonesService(s)
	zoneList, err := zs.List(project).Do()
	if err != nil {
		log.Errorf(ctx, "zs.List error: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// respons-json作成用Struct
	type insStruct struct {
		Instance string `json:"instance"`
		Zone     string `json:"zone"`
		Status   string `json:"status"`
		Ip       string `json:"ip"`
	}

	insStructList := make([]insStruct, 0, 10)
	for _, zone := range zoneList.Items {
		is := compute.NewInstancesService(s)
		insList, err := is.List(project, zone.Name).Do()
		if err != nil {
			log.Errorf(ctx, "is.List error: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		for _, ins := range insList.Items {
			natIp := ins.NetworkInterfaces[0].AccessConfigs[0].NatIP
			insStruct := insStruct{Instance: ins.Name, Status: ins.Status, Zone: zone.Name, Ip: natIp}
			insStructList = append(insStructList, insStruct)
		}
	}
	log.Debugf(ctx, "insStructList: %v", insStructList)

	b, err := json.Marshal(insStructList)
	if err != nil {
		log.Errorf(ctx, "json.Marshal error: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Debugf(ctx, "json: %s", string(b))
	// content-Typeを設定
	w.Header().Add("Content-Type", "application/json; charset=utf-8")
	fmt.Fprint(w, string(b))
}

// postのリクエスト受信用struct
type postRequest struct {
	Instance string `json:"instance"`
	Zone     string `json:"zone"`
	Method   string `json:"method"` //start or stop
}

func (i *instanceAPI) post(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	project := appengine.AppID(ctx)

	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Errorf(ctx, "ioutil.ReadAll error: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var req postRequest
	if err := json.Unmarshal(b, &req); err != nil {
		log.Errorf(ctx, " json.Unmarshal error: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	ope := &opeInstance{
		project:  project,
		instance: req.Instance,
		zone:     req.Zone,
		method:   req.Method,
	}
	if err := ope.opeInstance(ctx); err != nil {
		log.Debugf(ctx, "ope.opeInstance Cause: %v", errors.Cause(err))
		log.Errorf(ctx, "ope.opeInstance error: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return

	}
	return
}

func NewComputeService(ctx context.Context) (*compute.Service, error) {
	client := &http.Client{
		Transport: &oauth2.Transport{
			Source: google.AppEngineTokenSource(ctx, compute.ComputeScope),
			Base:   &urlfetch.Transport{Context: ctx},
		},
	}
	s, err := compute.New(client)
	if err != nil {
		err = errors.Wrap(err, "test")
		return nil, err
	}

	return s, nil
}

type opeInstance struct {
	project  string
	instance string
	zone     string
	method   string //start or stop
}

// opeInstance インスタンスのstart,stopを実施する。
func (o *opeInstance) opeInstance(ctx context.Context) (err error) {
	s, err := NewComputeService(ctx)
	if err != nil {
		errors.Wrap(err, "is.Start error")
		return
	}

	is := compute.NewInstancesService(s)
	switch o.method {
	case "start":
		_, err = is.Start(o.project, o.zone, o.instance).Do()
	case "stop":
		var ope *compute.Operation
		ope, err = is.Stop(o.project, o.zone, o.instance).Do()
		log.Debugf(ctx, "stop ope: %v", ope)
	}
	if err != nil {
		errors.Wrap(err, "is.Start error")
		return
	}

	return
}
