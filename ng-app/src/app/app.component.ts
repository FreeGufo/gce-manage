import { Component, OnInit } from '@angular/core';
import {Instance} from './instance';

import { InstanceService } from './app.service';


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

  constructor(private instanceService: InstanceService) { }

  getInstances(): void {
    this.instanceService.getInstances().then(instanceList => this.instanceList = instanceList);
  }

  ngOnInit(): void {
    this.getInstances();
    // this.instance = this.instanceList[0];
  }

  instanceRefresh(): void{
    this.getInstances();
    // this.instance = this.instanceList[0];
  }
  startIns(ins: Instance): void {
    this.instance = ins;
    alert('start ' + this.instance.instance);
  }
  stopIns(ins: Instance): void {
    this.instance = ins;
    alert('stop ' + this.instance.instance);
  }
}
