/**
 * Created by t_nuki on 2017/04/27.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Instance } from './instance'
import { INSLIST } from './mock-instances'

export class Param {
  instance: string;
  zone: string;
  Method: string;
}

@Injectable()
export class InstanceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private instanceUrl = 'instance';  // URL to web api

  constructor(private http: Http) { }

  getInstances(): Promise<Instance[]> {
    return Promise.resolve(INSLIST);
  }

  post(param: Param): Promise<Instance> {
    const url = `${this.instanceUrl}`;
    return this.http
      .post(url, JSON.stringify(param), {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
