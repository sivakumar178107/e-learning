const initialState = {
  role: "",
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ROLE":
      return {
        ...state,
        role: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;