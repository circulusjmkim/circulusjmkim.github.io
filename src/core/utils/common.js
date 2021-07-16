import moment from 'moment';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const trimAll = (str) => str.replace(/\s/gi, '');

const setLocalStorage = (name, value) => {
  const preData = localStorage.getItem(name);
  if (preData) {
    const obj = JSON.parse(preData);
    localStorage.setItem(name, JSON.stringify({ ...obj, ...value }));
  }
  localStorage.setItem(name, JSON.stringify(value));
};

const setCurrentUser = (user) => {
  const preData = localStorage.getItem('currentUser');
  if (preData) {
    const cuObj = JSON.parse(preData);
    return localStorage.setItem(
      'currentUser',
      JSON.stringify({ ...cuObj, ...user }),
    );
  }
  const { userId, robotId, nickName, robotPId, userPId } = user;
  return localStorage.setItem(
    'currentUser',
    JSON.stringify({
      userId: userId || '',
      robotId: robotId || '',
      nickName: nickName || '',
      robotPId: robotPId || '',
      userPId: userPId || '',
    }),
  );
};

const setUserToken = (userToken) =>
  localStorage.setItem('userToken', userToken);

const getUserToken = () => localStorage.getItem('userToken');

const getUserPhoto = () => {
  const currentUser = localStorage.getItem('currentUser');
  const parsedData = JSON.parse(currentUser);
  if (parsedData && 'userPhoto' in parsedData) {
    const { userPhoto } = parsedData;
    return userPhoto;
  }
  return '';
};

const getNickName = () => {
  const currentUser = localStorage.getItem('currentUser');
  const parsedData = JSON.parse(currentUser);
  if (parsedData && 'nickName' in parsedData) {
    const { nickName } = parsedData;
    return nickName;
  }
  return '';
};

const getRobotPId = () => {
  const currentUser = localStorage.getItem('currentUser');
  const parsedData = JSON.parse(currentUser);
  if (parsedData && 'robotPId' in parsedData) {
    const { robotPId } = parsedData;
    return robotPId;
  }
  return '';
};

const getRobotId = () => {
  const currentUser = localStorage.getItem('currentUser');
  const parsedData = JSON.parse(currentUser);
  if (parsedData && 'robotId' in parsedData) {
    const { robotId } = parsedData;
    return robotId;
  }
  return '';
};

const getUserId = () => {
  const currentUser = localStorage.getItem('currentUser');
  const parsedData = JSON.parse(currentUser);
  if (parsedData && 'userId' in parsedData) {
    const { userId } = parsedData;
    return userId;
  }
  return '';
};

const getLoginId = () => {
  const loginIdItem = localStorage.getItem('loginId');
  const loginId = JSON.parse(loginIdItem);
  return loginId || '';
};

const getUserPId = () => {
  const currentUser = localStorage.getItem('currentUser');
  const parsedData = JSON.parse(currentUser);
  if (parsedData && 'userPId' in parsedData) {
    const { userPId } = parsedData;
    return userPId;
  }
  return '';
};

const validateName = (v) => {
  if (!v) {
    return '성 또는 이름을 입력하세요.';
  }
  if (!/^[a-zA-Z가-힣]+$/g.test(v)) {
    return '한글 및 영문 외의 문자는 입력할 수 없습니다.';
  }
  if (v.length > 30 || v.length < 1) {
    return '이름은 1자 이상 30자 이하로 입력할 수 있습니다.';
  }
  return '';
};
const validateBirthDate = (v) => {
  if (!v) {
    return '생년월일을 입력하세요.';
  }
  const today = moment().format('YYYY-MM-DD');
  const birth = moment(v, 'YYYY-MM-DD');
  if (!(birth.isValid() && birth.isSameOrBefore(today))) {
    return '유효한 날짜가 아닙니다.';
  }
  return '';
};
const validateEmail = (v) => {
  if (!v) {
    return '이메일을 입력하세요.';
  }
  if (
    !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
      v,
    )
  ) {
    return '유효한 메일 형식이 아닙니다.';
  }
  return '';
};

const validatePassword = (value, { password, passwowrdConfirm }) => {
  const [[k, v]] = Object.entries(value);
  const passwordRegex = /(((?=.*[a-zA-Z])(?=.*\d))|((?=.*[a-zA-Z])(?=.*[-~!@#$%^&*_+=;:,.?]))|((?=.*\d)(?=.*[-~!@#$%^&*_+=;:,.?]))|((?=.*[a-z])(?=.*[A-Z])))[A-Za-z\d-~!@#$%^&*_+=;:,.?]{8,20}$/gm;
  const compareValue = k === 'password' ? passwowrdConfirm : password;
  if (compareValue && compareValue.length > 0) {
    if (v !== compareValue) {
      return '비밀번호가 일치하지 않습니다.';
    }
  }
  if (!passwordRegex.test(v)) {
    return '비밀번호는 숫자와 영문을 조합하여 8~20자 이하로 입력해야 합니다.';
  }
  return '';
};

export {
  descendingComparator,
  getComparator,
  stableSort,
  setLocalStorage,
  setCurrentUser,
  setUserToken,
  getUserToken,
  getUserPhoto,
  getNickName,
  getRobotPId,
  getRobotId,
  getUserId,
  getLoginId,
  getUserPId,
  trimAll,
  validateName,
  validateBirthDate,
  validateEmail,
  validatePassword,
};
