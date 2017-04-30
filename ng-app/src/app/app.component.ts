import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
// import { Location }          from '@angular/common';

import { Instance } from './instance';

import { InstanceService, Param } from './app.service';

import { INSLIST } from './mock-instances'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [InstanceService]
})
export class AppComponent implements OnInit{
  project = 'app-works!';
  instanceList: Instance[];
  instance: Instance;

  param: Param;

  constructor(
    private instanceService: InstanceService
    // private location: Location
  ) { }

  getInstances(): void {

    this.instanceService.getInstances().then(instanceList => this.instanceList = instanceList);
  }

  ngOnInit(): void {
    this.getInstances();
      // this.instanceList = INSLIST;
  }

  instanceRefresh(): void{
    this.getInstances();
    // this.instance = this.instanceList[0];
  }
  startIns(ins: Instance): void {
    this.instance = ins;
    alert('start ' + this.instance.instance);
    this.param.instance = ins.instance;
    this.param.zone = ins.zone;
    this.param.Method = 'start';

    this.instanceService.post(this.param)
      .then(() => this.instanceRefresh());
  }
  stopIns(ins: Instance): void {
    this.instance = ins;
    alert('stop ' + this.instance.instance);
    this.param.instance = ins.instance;
    this.param.zone = ins.zone;
    this.param.Method = 'stop';

    this.instanceService.post(this.param)
      .then(() => this.instanceRefresh());
  }
  //
  // goBack(): void {
  //   this.location.back();
  // }

}
