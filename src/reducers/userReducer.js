const users = (state = {}, action) => {
  switch(action.type) {
    case "USER_AUTHED":
      const { uid, userPayload } = action;

      return {
        ...state,
        [uid]: {
          ...userPayload
        }
      };
    default:
      return state;
  }
};

export default users