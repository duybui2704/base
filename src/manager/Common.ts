import {AppConfigModel} from '@/models/app-config';
import {action, makeObservable, observable} from 'mobx';

export class Common {
  @observable refresh = false;
  @observable count = 0;

  @observable appConfig: AppConfigModel | undefined;

  constructor() {
    makeObservable(this);
  }

  @action setRefresh(refresh: boolean) {
    this.refresh = refresh;
  }

  @action setAppConfig(appConfig: AppConfigModel) {
    this.appConfig = appConfig;
  }

  @action setCount() {
    this.count += 1;
  }
}
