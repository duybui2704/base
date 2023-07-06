import {EventEmitter} from './EventEmitter';
import {Events, ToastTypes} from '@/common/Constants';

function showToast(msg: string, type: keyof typeof ToastTypes) {
  console.log('msg', msg);

  if (msg) {
    const obj = {
      msg,
      type,
    };

    EventEmitter.emit(Events.TOAST, obj);
  }
}

function showSuccessToast(msg: string) {
  console.log('showSuccessToast');

  showToast(msg, 'SUCCESS');
}

function showErrorToast(msg: string) {
  showToast(msg, 'ERR');
}

function showMsgToast(msg: string) {
  showToast(msg, 'MSG');
}

export default {
  showSuccessToast,
  showErrorToast,
  showMsgToast,
};
