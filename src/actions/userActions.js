export const addConnectedUser = ({ uid, userPayload }) => {
  return {
    type: 'USER_LOGGED_IN',
    uid,
    userPayload
  }
};