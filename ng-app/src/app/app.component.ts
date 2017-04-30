import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';

import { Instance } from './instance';
import { InstanceService, Param } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [InstanceService]
})
export class AppComponent implements OnInit{
  project = 'app-works!';
  instanceList: Instance[];

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
    let param: Param = AppComponent.createParam(ins, 'start');
    this.instanceService.post(param)
      .then(() => this.getInstances());
  }

  stopIns(ins: Instance): void {
    let param: Param = AppComponent.createParam(ins, 'stop');
    this.instanceService.post(param)
      .then(() => this.getInstances());
  }

  private static createParam(ins: Instance, method: string): Param {
    let param = new Param();
    param.instance = ins.instance;
    param.zone = ins.zone;
    param.Method = method;
    return param;
  }
}
