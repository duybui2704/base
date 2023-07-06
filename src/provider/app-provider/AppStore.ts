import {makeObservable, observable} from 'mobx';

// import {ApiServices} from '../../api/index';
// import {AppManager} from '@/manager/AppManager';
import {AppManager} from '@/manager/AppManager';
import {NetworkManager} from '@/manager/NetworkManager';
import {ApiServices} from '@/api';
import {Common} from '@/manager/Common';

class AppStore {
  @observable appManager = new AppManager();

  @observable networkManager = new NetworkManager();

  @observable apiServices = new ApiServices();

  @observable common = new Common();

  constructor() {
    makeObservable(this);
  }
}

export type AppStoreType = AppStore;
export default AppStore;
