const INITAL_STATE = {
  iduser: "",
  email: "",
  phone: "",
  loading: true,
  erroredit: "",
  errorreset:"",
  status:false
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "GETDATA_SUCCESS":
      return { ...state, ...action.payload, loading: false, erroredit: "" };
    case "GETDATA_FAIL":
      return { ...state, error: "GAGAL" };
    case "LOADING_USER":
      return { ...state, loading: true };
    case "USER_PROFILE_START":
      return { ...state, loading: true };
    case "USER_PROFILE_SUCCESS":
      return { ...state, ...action.payload, loading: false, erroredit: "" };
    case "USER_PROFILE_FAILED":
      return { ...state, loading: false, erroredit:action.payload };
    case "USER_CHANGEPASS_START":
      return { ...state, loading: true };
    case "USER_CHANGEPASS_SUCCESS":
      return { ...state, loading: false, errorreset:"", status:true };
    case "USER_CHANGEPASS_FAILED":
      return { ...state, loading: false, errorreset:action.payload };     
    case "LOADING_USER":
      return { ...state, loading: true };
    case "CLEAR_ERROR":
      return INITAL_STATE;
    default:
      return state;
  }
};
