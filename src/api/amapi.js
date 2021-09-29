import { POST, GET, PATCH, DELETE, encodeGetParams, setAPI,  } from './common';

const getFetchResult = async (route, method, data) => {
  const { url, headers } = setAPI(route, method, data);
  const res = await fetch(url, headers);
  const result = res.json();
  return result;
};

export const connectRobotsBySerial = async ({ userId, serial }) => {
  // 논리적 아이디 필요
  const result = await getFetchResult(`robotsConnect`, POST, { userId, serial });
  return result;
};

export const connectRobotBySerial = async ({ userId, serial }) => {
  // 논리적 아이디 필요
  const result = await getFetchResult(`robotConnect`, POST, { userId, serial });
  return result;
};

export const disconnectRobotBySerial = async ({ serial }) => {
  const result = await getFetchResult(`robotDisconnect`, PATCH, { serial });
  return result;
};

export const deleteTempUser = async ({ userId }) => {
  const result = await getFetchResult(`guests`, DELETE, { userId });
  return result;
};

export const deleteAndBAKWithdrawUser = async ({ userId }) => {
  const result = await getFetchResult(`users`, DELETE, { userId });
  return result;
};

export const updateUserPassword = async ({ userId, newPw }) => {
  const result = await getFetchResult(`resetPassword`, PATCH, { userId, newPw });
  return result;
};

export const updateUserVerifiedInfo = async ({ userId, tel, email }) => {
  const result = await getFetchResult(`user`, PATCH, { userId, tel, email  });
  return result;
};

export const findRobot = async ({ robot, use }) => {
  const result = await getFetchResult(`findRobot?${encodeGetParams({ robot, use })}`, GET);
  return result;
};
export const findRobotByUser = async ({ user, robot }) => {
  const result = await getFetchResult(`findUserRobot?${encodeGetParams({ user, robot })}`, GET);
  return result;
};

export const clearUserData = async ({ userId }) => {
  const result = await getFetchResult(`clearUser?${encodeGetParams({ userId })}`, DELETE);
  return result;
};

export const clearRobotData = async ({ robotOId }) => {
  const result = await getFetchResult(`clearRobot?${encodeGetParams({ robotOId })}`, DELETE);
  return result;
};

export const transferRobotData = async ({ userId, serial, newSerial }) => {
  const result = await getFetchResult(`replaceRobot`, POST, { userId, serial, newSerial });
  return result;
};
export const findUserForRobotConnect = async ({ userId, use }) => {
  const result = await getFetchResult(`findUserByUserId?${encodeGetParams({userId, use})}`, GET);
  return result;
};

export const findUserList = async (data) => {
  const result = await getFetchResult(`users?${encodeGetParams(data)}`, GET);
  return result;
};

export const clearUserDataForTest = async ({userId, deleteUser}) => {
  const result = await getFetchResult(`clearUserDirect?${encodeGetParams({userId, deleteUser})}`, DELETE);
  return result;
};

export const registerRedis = async ({ userId, userPId, robotId, robotPId }) => {
  const result = await getFetchResult(`redis`, POST, { userId, userPId, robotId, robotPId });
  return result;
};

export const unregisterRedis = async ({ userPId, robotPId }) => {
  const result = await getFetchResult(`redis`, DELETE, { userPId, robotPId });
  return result;
};

export const findRedis = async ({userId, userPId, robotId, robotPId}) => {
  const result = await getFetchResult(`redis?${encodeGetParams({userId, userPId, robotId, robotPId})}`, GET, {userId, userPId, robotId, robotPId});
  return result;
};

export const signupByAdmin = async (data) => {
  const result = await getFetchResult(`signup`, POST, {data});
  return result;
};

export const getNoticeList = async ({ skip, limit }) => {
  const result = await getFetchResult(`notice?${encodeGetParams({skip, limit})}`, GET);
  return result;
};

export const getNoticeItem = async (id) => {
  const result = await getFetchResult(`notice?${encodeGetParams({id})}`, GET);
  return result;
};

export const addNotice = async (data) => {
  const result = await getFetchResult(`notice`, POST, data);
  return result;
};

export const updateNotice = async (data) => {
  const result = await getFetchResult(`notice`, PATCH, data);
  return result;
};

export const deleteNotice = async (data) => {
  const result = await getFetchResult(`notice`, DELETE, data);
  return result;
};

export const checkUserId = async (userId) => {
  const result = await getFetchResult(`checkId?${encodeGetParams({userId})}`, GET);
  return result;
};

export const userSignUp = async (data) => {
  const result = await getFetchResult('signup', POST, data);
  return result;
};

export const checkUserInfo = async ({ target, value }) => {
  const result = await getFetchResult(`checkInfo?${encodeGetParams({target, value})}`, GET);
  return result;
}