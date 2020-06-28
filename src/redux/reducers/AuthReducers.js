import {
    USER_LOGIN_FAILED,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS
} from './../actions/type'

const INITIAL_STATE={
    iduser:0,
    username:'',
    password:'',
    // login:false,
    error: '',
    errormes:'',
    errormesreg:'',
    errormesres:'',
    isreset:false,
    loading: false,
    role:'',
    loading:false,
    islogin:false,
    token:'',
    isverified:0,
    isregis:false
}
export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state,loading:false,...action.payload,error:'',islogin:true,isregis:true}
        case 'REGIS_START':
            return {...state,loading:false,...action.payload,error:'',isregis:true}
        case 'USER_REGIS_SUCCESS':
            return {...state,loading:false,...action.payload,error:'',isregis:true}
        case 'USER_LOGIN_SUCCESS':
            return {...state,loading:false,...action.payload,error:'',islogin:true}
        case 'COUNT_CART':
            return {...state,loading:false,cart:+action.payload}
        case 'LOGIN_LOADING':
            return {...state,loading:true,error:''}
        case 'USER_LOGIN_FAILED':
            return{...state,loading:false,errormes:action.payload}
        case 'USER_REGIS_FAILED':
            return{...state,loading:false,errormesreg:action.payload}
        case 'USER_RESET_FAILED':
            return{...state,loading:false,errormesres:action.payload}
        case 'USER_RESET_SUCCESS':
            return{...state, isreset:true}
        case 'ErrorClear' :
            return{...state,errormes:'',errormesreg:'',errormesres:''}
        case 'LOGIN_ERROR':
            return {...state,error:action.payload,loading:false}
        case 'USER_VERIFIED':
            return {...state,...action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}