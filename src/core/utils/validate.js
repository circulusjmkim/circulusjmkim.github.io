/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
// import axios from 'axios';
import moment from 'moment';
// import { dataURItoBlob } from './common';\

export const MAIL_REGEXP =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
export const TEL_REGEXP = /^0([1|7])([0|1|6|7|8|9|0]?)?([0-9]{7,8})$/g;
export const PW_REGEXP =
  /(((?=.*[a-zA-Z])(?=.*\d))|((?=.*[a-zA-Z])(?=.*[-~!@#$%^&*_+=;:,.?]))|((?=.*\d)(?=.*[-~!@#$%^&*_+=;:,.?]))|((?=.*[a-z])(?=.*[A-Z])))[A-Za-z\d-~!@#$%^&*_+=;:,.?]{8,20}$/;
export const ID_REGEXP = /(^[a-zA-Z]+[a-zA-Z0-9._-]+[a-zA-Z0-9]{1,12}$)/g;

export const validateId = (value) => {
  if (!isNaN(value.charAt(0))) {
    return '아이디는 숫자로 시작할 수 없습니다.';
  }
  if (value.length < 4 || value.length > 14) {
    return '아이디는 4자 이상 14자 이하로 입력해야 합니다.';
  }
  // eslint-disable-next-line no-useless-escape
  if (value.charAt(value.length - 1).search(/[.\-\_]/) > -1) {
    return '아이디는 - , _ , . 의 문자로 끝날 수 없습니다.';
  }
  if (!new RegExp(ID_REGEXP, 'g').test(value)) {
    return '아이디에는 영문(소문자, 대문자), 숫자, - , _ , . 의 문자만 사용 가능합니다.';
  }
  return false;
};

export const validatePassword = (value) => {
  if (!new RegExp(PW_REGEXP, 'g').test(value)) {
    return '비밀번호는 영문, 숫자 및 특수문자(~!@#$%^&*_-+=;:,.?)를 조합하여 8~20자 이하로 입력해야 합니다.';
  }
  return '';
};

export const validateComparePassword = (value, compareValue) => {
  if (compareValue && compareValue.length > 0 && value !== compareValue) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

export const validateName = (value, item) => {
  const target = item === 'lastName' ? '성' : '이름';
  if (!value) {
    return `${target}을 입력해주세요.`;
  }
  const expression = '^[a-zA-Z가-힣]+$';
  const nameRegExp = new RegExp(expression, 'ig');
  if (value.match(nameRegExp) > -1) {
    return '이름에 숫자, 공백 및 특수문자는 입력할 수 없습니다.';
  }
  if (value.length > 30) {
    return `${target}은 30자까지 입력할 수 있습니다.`;
  }
  return '';
};

export const validateNick = (value) => {
  if (!value) {
    return '닉네임을 입력해주세요.';
  }
  const expression = '^[a-zA-Z가-힣0-9_-]+$';
  const nameRegExp = new RegExp(expression, 'ig');
  if (value.match(nameRegExp) > -1) {
    return '닉네임에 공백 및 _, - 외 특수문자는 입력할 수 없습니다.';
  }
  if (value.length > 20) {
    return '닉네임은 20자까지 입력할 수 있습니다.';
  }
  return '';
};

export const validateBirthDate = (value) => {
  if (!value) {
    return '생년월일을 선택하세요.';
  }
  const today = moment().format('YYYY-MM-DD');
  const birth = moment(value, 'YYYY-MM-DD');
  if (!(birth.isValid() && birth.isSameOrBefore(today))) {
    return '유효한 날짜가 아닙니다.';
  }
  return '';
};

export const validateTel = (data) => {
  let tel;
  let verified = false;
  if ('value' in data) {
    tel = data.value;
  } else if ('tel' in data) {
    tel = data.tel;
  }
  if (!tel && 'verified' in data) {
    verified = data.verified.email;
    if (!verified) {
      return '문자 수신이 가능한 전화번호를 입력하세요.';
    }
    return '';
  }
  const validPattern = new RegExp(TEL_REGEXP, 'g').test(tel);
  if (!validPattern) {
    return '문자 수신이 가능한 전화번호를 입력하세요.';
  }
  return '';
};

export const validateEmail = (data) => {
  let email;
  let verified = false;
  if ('value' in data) {
    email = data.value;
  } else if ('email' in data) {
    email = data.email;
  }
  if (!email) return '';
  if ('verified' in data) {
    verified = data.verified.tel;
    if (!verified) {
      return '유효한 메일 형식이 아닙니다.';
    }
    return '';
  }
  const validPattern = new RegExp(MAIL_REGEXP).test(email);
  if (!validPattern) {
    return '유효한 메일 형식이 아닙니다.';
  }
  return '';
};

export const validateInterest = (value) => {
  if (value.length === 0) {
    return '관심사를 1개 이상 선택하세요.';
  }
  if (value.length > 5) {
    return '선택할 수 있는 관심사는 5개 이하입니다.';
  }
  return '';
};

/* export const validateImage = async value => {
  if (!value) {
    return '사용자의 인물 사진을 등록해주세요. 등록된 사진을 기반으로 파이보가 사용자의 얼굴을 인식합니다.';
  }

  const blob = value;
  const formData = new FormData();
  formData.append(
    'file',
    blob,
  );
  if (!blob) return '';
  if (typeof blob === 'string') return '';
  try {
    const detectResult = await axios({
      url: `${API_URL}user/face_detect`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'cache-control': 'no-cache',
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
      },
      data: formData,
    });
    const {
      data: { result, d, error: e },
    } = detectResult;
    if (result) {
      const { msg } = FACE_DETECT_RESULTS.find(({ code }) => code === d.status);
      if (msg) {
        return i18.t(msg);
      }
    } else {
      return JSON.stringify(e);
    }
  } catch (e) {
    return i18.t('user:IMG.MSG.CATCH_ERROR');
  }

  return '';
}; */

export const validateInfos = async ({ value, name }) => {
  let msg = false;
  switch (name) {
    // case 'imageFile':
    //   msg = await validateImage(value);
    //   break;
    case 'nickName':
      msg = validateNick(value);
      break;
    case 'email':
      msg = validateEmail(value);
      break;
    case 'tel':
      msg = validateTel(value);
      break;
    case 'birthDate':
      msg = validateBirthDate(value);
      break;
    case 'interest':
      msg = validateInterest(value);
      break;
    case 'firstName':
    case 'lastName':
      msg = validateName(value, name);
      break;
    default:
      break;
  }
  if (!msg && name === 'email') {
    const { email, verified, sent } = value;
    if (email && verified && !verified.email && !sent) {
      return { verified: { email: '메일 인증을 요청하세요.' } };
    }
    if (sent && verified && !verified.email) {
      return { verified: { email: '메일 인증을 완료하세요.' } };
    }
  }
  if (!msg && name === 'tel') {
    const { tel, verified, sent } = value;
    if (tel && verified && !verified.tel && !sent) {
      return { verified: { tel: '전화번호 인증을 요청하세요.' } };
    }
    if (sent && verified && !verified.tel) {
      return { verified: { tel: '전화번호 인증을 완료하세요.' } };
    }
  }
  return { [name]: msg };
};

export const validateAll = async (user) => {
  let msg = '';
  if (user) {
    const {
      birthDate,
      email,
      firstName,
      gender,
      interest,
      lastName,
      nickName,
      data,
      image,
    } = user;
    const validItemArr = [
      { name: 'imageFile', value: data || image },
      { name: 'lastName', value: lastName },
      { name: 'firstName', value: firstName },
      { name: 'gender', value: gender },
      { name: 'nickName', value: nickName },
      { name: 'email', value: email },
      { name: 'birthDate', value: birthDate },
      { name: 'interest', value: interest },
    ];
    for (let i = 0; i < validItemArr.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      msg = await validateInfos(validItemArr[i]);
      if (msg) {
        return msg;
      }
    }
  }

  return msg;
};
