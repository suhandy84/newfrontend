import Axios from 'axios'
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_SEARCH_ITEM } from './type'
import { APIURL } from './../../support/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username==='' || password===''){
            if(username==='' && password!=='') {
                dispatch({type:USER_LOGIN_FAILED,payload:'username tidak terisi'})
            }else if(password==='' && username!=='') {
                dispatch({type:USER_LOGIN_FAILED,payload:'password tidak terisi'})
            }else{
                dispatch({type:USER_LOGIN_FAILED,payload:'lengkapi data'})
            }
        }else{
            Axios.get(`${APIURL}/users/login`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.status){
                    console.log(res.data)
                    localStorage.setItem('token',res.data.token)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data})
                }else{
                    dispatch({type: USER_LOGIN_FAILED,payload:res.data.message})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const RegisUser=({username,password,email,confirmpass})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(!username || !password || !email || !confirmpass){
            if(!username && password && email && confirmpass) {
                dispatch({type:'USER_REGIS_FAILED',payload:'username tidak terisi'})
            }else if(!password && username && email && confirmpass) {
                dispatch({type:'USER_REGIS_FAILED',payload:'password tidak terisi'})
            }else if(!email && username && confirmpass && password) {
                dispatch({type:'USER_REGIS_FAILED',payload:'email tidak terisi'})
            }else if(!confirmpass && username && email && password) {
                dispatch({type:'USER_REGIS_FAILED',payload:'konfirmasi password tidak terisi'})
            }else{
                dispatch({type:'USER_REGIS_FAILED',payload:'lengkapi data'})
            }
        }else{
            if(password !== confirmpass) {
                dispatch({type:'USER_REGIS_FAILED',payload:'Password tidak sesuai'})
            }else{
                Axios.post(`${APIURL}/users/register`,{
                        username:username,
                        password:password,
                        email
                })
                .then((res)=>{
                    if(res.data.status){
                        console.log(res.data)
                        // localStorage.setItem('token',res.data.token)
                        localStorage.setItem('email',res.data.tokenemail)
                        dispatch({type:'USER_REGIS_SUCCESS',payload:res.data})
                    }else{
                        dispatch({type: 'USER_REGIS_FAILED',payload:res.data.message})
                    }
                }).catch((err)=>{
                    console.log(err)
                    dispatch({type:'USER_REGIS_FAILED',payload:err.message})
                })
            }
        }
    }
}

export const resetPass=({username,password,email,confirmpassword})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        console.log(username,password)
        if(!username || !password || !confirmpassword || !email){
            if(!username && password && confirmpassword) {
                dispatch({type:'USER_RESET_FAILED',payload:'username tidak terisi'})
            }else if(!password && username && confirmpassword) {
                dispatch({type:'USER_RESET_FAILED',payload:'password tidak terisi'})
            }else if(!confirmpassword && username && password) {
                dispatch({type:'USER_RESET_FAILED',payload:'konfirmasi password tidak terisi'})
            }else{
                dispatch({type:'USER_RESET_FAILED',payload:'lengkapi data'})
            }
        }else{
            if(password !== confirmpassword) {
                dispatch({type:'USER_RESET_FAILED',payload:'Password tidak sesuai'})
            }else{
                Axios.post(`${APIURL}/users/resetpassword`,{
                        username:username,
                        password:password,
                        email
                })
                .then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        // localStorage.setItem('token',res.data.token)
                        dispatch({type:'USER_RESET_SUCCESS'})
                    }else{
                        dispatch({type: 'USER_REGIS_FAILED',payload:res.data.message})
                    }
                }).catch((err)=>{
                    console.log(err)
                    dispatch({type:'USER_REGIS_FAILED',payload:err.message})
                })
            }
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}

export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}

export const userverified=(data)=>{
    return{
        type:'USER_VERIFIED',
        payload:data
    }
}

export const signOut=()=>{
    return{
        type:'LOGOUT'
    }
}

export const LoginSuccessAction=(datauser)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:datauser
    }
}

export const regisStart=(datauser)=>{
    return{
        type:'REGIS_START',
        payload:datauser
    }
}

export const Login_error=()=>{
    return(dispatch)=>{
        dispatch({type:'LOGIN_ERROR',payload:'Login_error'})
    }
}

export const GantiPassword = (passwordbaru) => {
    return {
      type: "GANTI_PASSWORD",
      payload: passwordbaru
    };
};
