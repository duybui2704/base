import {API_CONFIG} from '@/common/Constants';
import {BaseService} from './base-service';

export class CommonServices extends BaseService {
  getApiTest = async () => this.api().get(API_CONFIG.TEST, {});
}
