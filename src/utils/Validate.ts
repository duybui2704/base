import {NUMBER_REGEX, PHONE_REGEX} from '@/common/Constants';

function isEmpty(...data: any[]) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]) return false;
  }
  return true;
}

function isStringEmpty(string: string) {
  return !string || string === 'null' || String.prototype.trim.call(string) === '';
}

function isEmptyValue(value: string) {
  return typeof value === 'undefined' || value === null || value.toString().length === 0;
}

function isObjectEmpty(obj: any) {
  return isEmpty(obj);
}

function isListEmpty(obj: any) {
  return typeof obj === 'undefined' || obj === null || obj.length === 0;
}

function isEmptyNumber(value: string) {
  const _isEmpty = isEmptyValue(`${value}`);
  if (!_isEmpty) {
    const number = Number(`${value}`.replace(/[^0-9]/g, ''));
    return number === 0;
  }
  return true;
}

function stringIsNumberOnly(value: string) {
  if (value) {
    return NUMBER_REGEX.test(value);
  }
  return false;
}

function isValidPhone(phone: string) {
  if (phone) {
    return PHONE_REGEX.test(phone);
  }
  return false;
}

function isValidPassword(orgPass: string) {
  if (orgPass) {
    // password cho phep nhap tieng viet -> ko check regex nua, chi check length
    // return PASSWORD_REGEX.test(orgPass);
    return orgPass.length >= 6 && orgPass.length <= 20;
  }
  return false;
}

function trim(str: string) {
  if (str) {
    return String.prototype.trim.call(str);
  }
  return '';
}

export default {
  isEmpty,
  isStringEmpty,
  isEmptyValue,
  isObjectEmpty,
  isListEmpty,
  isEmptyNumber,
  isValidPhone,
  trim,
  isValidPassword,
  stringIsNumberOnly,
};
