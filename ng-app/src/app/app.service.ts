/**
 * Created by t_nuki on 2017/04/27.
 */
import { Injectable } from '@angular/core';
import { Instance } from './instance'
import { INSLIST } from './mock-instances'

@Injectable()
export class InstanceService {
  getInstances(): Promise<Instance[]> {
    return Promise.resolve(INSLIST);
  }
}
