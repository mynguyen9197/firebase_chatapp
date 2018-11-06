export const addConnectedUser = ({ uid, userPayload }) => {
  return {
    type: 'USER_AUTHED',
    uid,
    userPayload
  }
};