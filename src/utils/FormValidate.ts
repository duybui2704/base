import {Languages} from '@/locales/Languages';
import Validate from './Validate';

const validateSpecialCharacters = (username: string) => {
  const reg = /^[a-zA-Z- ]+$/;
  return reg.test(removeAscent(username));
};

const validatePhone = (username: string) => {
  const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return reg.test(username);
};

const validateBirthday = (birthday: string) => {
  const regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  return regexVar.test(birthday);
};

function removeAscent(str: string) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}

function passValidate(pwd: string) {
  let errMsg = '';
  if (Validate.isStringEmpty(pwd)) {
    errMsg = Languages.errorMsg.pwdNull;
  } else if (pwd.length < 8) {
    errMsg = Languages.errorMsg.pwdCheck;
  }
  return errMsg;
}
function passConFirmValidate(conFirmPwd: string, pwd?: string) {
  let errMsg = '';
  if (Validate.isStringEmpty(conFirmPwd)) {
    errMsg = Languages.errorMsg.pwdNull;
  } else if (conFirmPwd !== pwd) {
    errMsg = Languages.errorMsg.conFirmPwd;
  }
  return errMsg;
}

function passConFirmPhone(phone: string) {
  let errMsg = '';
  if (Validate.isStringEmpty(phone)) {
    errMsg = Languages.errorMsg.phoneIsEmpty;
  } else if (!validatePhone(phone)) {
    errMsg = Languages.errorMsg.phoneRegex;
  } else if (phone.length < 10 || phone.length > 10) {
    errMsg = Languages.errorMsg.phoneCount;
  }
  return errMsg;
}

function inputNameEmpty(value: any, errEmpty: string, errCharacters?: any) {
  let errMsg = '';
  if (Validate.isStringEmpty(value)) {
    errMsg = errEmpty;
  } else if (!validateSpecialCharacters(value)) {
    errMsg = errCharacters;
  }
  return errMsg;
}

function userNameValidate(userName: string) {
  let errMsg = '';
  if (Validate.isStringEmpty(userName)) {
    errMsg = Languages.errorMsg.userNameRequired;
  } else if (userName.length < 8) {
    errMsg = Languages.errorMsg.userNameLength;
  } else if (!validateSpecialCharacters(userName)) {
    errMsg = Languages.errorMsg.userNameRegex;
  }
  return errMsg;
}

function birthdayValidate(birthday: string) {
  let errMsg = '';
  const today = new Date();

  if (Validate.isStringEmpty(birthday.toString())) {
    errMsg = Languages.errorMsg.birthdayNull;
  } else if (!validateBirthday(birthday.toString())) {
    errMsg = Languages.errorMsg.birthdayRegex;
  }
  return errMsg;
}

function inputEmpty(value: any, errEmpty: string) {
  let errMsg = '';
  if (Validate.isStringEmpty(value)) {
    errMsg = errEmpty;
  }
  return errMsg;
}

export default {
  passValidate,
  passConFirmValidate,
  passConFirmPhone,
  inputNameEmpty,
  birthdayValidate,
  removeAscent,
  inputEmpty,
  userNameValidate,
};
