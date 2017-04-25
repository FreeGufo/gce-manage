import { Component } from '@angular/core';

export class Instance {
  instance: string;
  zone: string;
  status: string;
  ip: string;
}

const InstanceList: Instance[] = [
  {
    instance: 'ins1',
    zone: 'zone1',
    status: 'running',
    ip: '1.0.0.0'
  },
  {
    instance: 'ins2',
    zone: 'zone2',
    status: 'stop',
    ip: '1.0.0.1'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  project = 'app-works!';
  instanceList = InstanceList;
  instance = this.instanceList[0];

  instanceRefresh(): void{
    alert('refresh');
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
