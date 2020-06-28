import Axios from "axios";
import { APIURL } from "../../support/ApiUrl";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// export const getUser = () => {
//   return async dispatch => {
//     try {
//       dispatch({ type: "LOADING" });
//       const token = localStorage.getItem("token");
//       if (!token) {
//         return dispatch({ type: "LOADING_DONE" });
//       }
//       const res = await Axios.get(`${APIURL}users/login/${id}`);
//       // const resCart = await Axios.get(`${APIURL}trans/getcart/${id}`);
//       // dispatch({
//       //   type: "GETCART_SUCCESS",
//       //   payload: resCart.data.result[0].cart
//       // });
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] });
//     } catch (error) {
//       dispatch({ type: "LOADING_DONE" });
//     }
//   };
// };

export const getDetail = data => {
  return {
    type: "GETDATA_SUCCESS",
    payload: data
  };
};

export const updateUser = (id, data) => {
  const {namadepan, namabelakang, kokab, kodepos, alamat, nomorhp, provinsi} = data
  console.log(namadepan)
  return (dispatch) => {
    dispatch({type:'USER_PROFILE_START'})
    if (!namadepan || !kokab || !kodepos || !alamat || !nomorhp || !provinsi) {
      if(!namadepan && kokab && kodepos && alamat && nomorhp && provinsi) {
          dispatch({type:'USER_PROFILE_FAILED',payload:'nama depan tidak terisi'})
      }else if(!kokab && kodepos && alamat && nomorhp && namadepan && provinsi) {
          dispatch({type:'USER_PROFILE_FAILED',payload:'kota / kabupaten tidak terisi'})
      }else if(!kodepos && alamat && nomorhp && namadepan && kokab && provinsi) {
          dispatch({type:'USER_PROFILE_FAILED',payload:'email tidak terisi'})
      }else if(!alamat && nomorhp && namadepan && kokab && kodepos && provinsi) {
          dispatch({type:'USER_PROFILE_FAILED',payload:'alamat tidak terisi'})
      }else if(!nomorhp && namadepan && kokab && kodepos && alamat && provinsi) {
          dispatch({type:'USER_PROFILE_FAILED',payload:'nomor hp tidak terisi'})
      }else if(!provinsi && namadepan && kokab && kodepos && alamat && nomorhp) {
          dispatch({type:'USER_PROFILE_FAILED',payload:'provinsi tidak terisi'})
      }else{
          dispatch({type:'USER_PROFILE_FAILED',payload:'lengkapi data'})
      } 
    } else {
      Axios.put(`${APIURL}/profile/updateuser/${id}`, data)
      .then((res)=>{
          if(res.data.status){
              console.log(res.data)
              // localStorage.setItem('token',res.data.token)
              // localStorage.setItem('email',res.data.tokenemail)
              dispatch({type:'USER_PROFILE_SUCCESS',payload:res.data})
          }else{
              dispatch({type: 'USER_PROFILE_FAILED',payload:res.data.message})
          }
      }).catch((err)=>{
          console.log(err)
          dispatch({type:'USER_PROFILE_FAILED',payload:err.message})
      })
      
    }
  }
  // return async dispatch => {
  //   try {
  //     const res = await Axios.put(`${APIURL}manage/updateuser/${id}`, data);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
};



export const changePassUser=({oldpass,newpass,confirmnewpass,token})=>{
    return (dispatch)=>{
        dispatch({type:"USER_CHANGEPASS_START"})
        // console.log(token,"lewat")
        if(!oldpass || !newpass || !confirmnewpass){//kalo ada input yang kosong
          if(!oldpass && newpass && confirmnewpass) {
            dispatch({type:'USER_CHANGEPASS_FAILED',payload:'password lama tidak terisi'})
          } else if(!newpass && confirmnewpass && oldpass) {
            dispatch({type:'USER_CHANGEPASS_FAILED',payload:'password baru tidak terisi'})
          } else if(!confirmnewpass && oldpass && newpass) {
            dispatch({type:'USER_CHANGEPASS_FAILED',payload:'konfirmasi password baru tidak terisi'})
          } else{
            dispatch({type:"USER_CHANGEPASS_FAILED",payload:'data tidak lengkap'})
          }
        }else{
          if (newpass !== confirmnewpass) {
            dispatch({type:"USER_CHANGEPASS_FAILED",payload:'password tidak sesuai'})
          } else {
            Axios.get(`${APIURL}/profile/changepassword`,{
              params:{
                password:oldpass,
                newpassword:newpass
              },
              headers:{
                'Authorization':`Bearer ${token}`
              }
            })
            .then((res)=>{
                if(res.data.status){
                    console.log(res.data)
                    MySwal.fire({
                      icon:'success',
                      title:'password berhasil diubah'
                    }).then((res)=>{
                      dispatch({type:'USER_CHANGEPASS_SUCCESS'})
                        // props.countCart(props.User.id)
                    })
                }else{
                  console.log('masuk sini')
                    dispatch({type: 'USER_CHANGEPASS_FAILED',payload:res.data.message})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:'USER_CHANGEPASS_FAILED',payload:err.message})
            }) 
          }
        }
    }
}

export const resetClear=()=>{
    return{
        type:'CLEAR_ERROR'
    }
}
