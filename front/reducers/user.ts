export const initialState = {
  isLoggedIn: false
};

export const loginAction = data => {
  return {
    type: 'LOG_IN',
    data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: action.data
      };
    default:
      return state;
  }
};

export default reducer;
