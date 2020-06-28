import React,{ useEffect,useState } from 'react';
import {MDBInput} from 'mdbreact';
import { FaUnlock } from 'react-icons/fa';
import querystring from 'query-string';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import { Redirect } from 'react-router-dom';
import {resetPass,errormessageclear} from '../redux/actions'
import { connect } from 'react-redux';


const ResetPassword = (props) => {

    const [data, setdata] = useState({
        username:"",
        password:"",
        confirmpassword:"",
        email:""
    })
    // const [isreset, setisreset] = useState(false)

    const dataOnChange = (e) => {
        e.preventDefault()
        setdata({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        console.log(props.location.search)
        var obj = querystring.parse(props.location.search)
        console.log(obj.token)
        Axios.get(`${APIURL}/users/forgotpasswordverified`,{
            headers:{
                'Authorization':`Bearer ${obj.token}`
            }
        }).then((res)=>{
            console.log(res.data)
            setdata({email:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onResetSend = (e) => {
        e.preventDefault()
        var obj={
            username:data.username,
            email:data.email,
            password:data.password,
            confirmpassword:data.confirmpassword
        }
        console.log(data.username)

        props.resetPass(obj)
        // console.log(obj)
        // Axios.post(`${APIURL}/users/resetpassword`,
        //     obj
        // )
        // .then((res)=>{
        //     if(res.data.status) {
        //         console.log(res.data.status)

        //         // alert('kirim pesan berhasil')
        //     }
        //     // setemail('')
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }

    if(props.Auth.isreset){
        return <Redirect to='login' />
    }
    //jangan lupa kasih proteksi kalau user sudah login
    return (
        <div className="paddingatas">
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form className='d-flex justify-content-center align-items-center' onSubmit={onResetSend} style={{flexDirection:"column", width:'30%', border:'2px solid #281e5a', borderRadius:'10px', height:'600px', paddingTop:'30px'}}>
                    <h1 className="h1 text-center mb-4" style={{lineHeight:0, color:'#281e5a'}}>Reset Password</h1>
                    <h5 className="h5 text-center mb-4" style={{color:'#281e5a'}}>You can reset your password here</h5>
                    <div className='d-flex justify-content-center align-items-center' style={{fontSize:'100px', marginTop:'15px', color:'#281e5a'}}>
                        <FaUnlock />
                    </div>
                    <div className="grey-text" style={{marginTop:'20px'}}>
                        <MDBInput 
                            label="Your Username" 
                            name='username' 
                            onChange={dataOnChange} 
                            icon="user" 
                            group 
                            type="text" 
                            validate 
                            error='dsadas'
                            outline
                            value={data.username}
                        />
                        <MDBInput 
                            label="Your New Password" 
                            name='password' 
                            onChange={dataOnChange} 
                            icon="lock" 
                            group 
                            type="password" 
                            validate 
                            error='dsadas'
                            outline
                            value={data.password}
                            style={{marginTop:'-20px'}}
                        />
                        <MDBInput 
                            label="Confirm Password" 
                            name='confirmpassword' 
                            onChange={dataOnChange} 
                            icon="lock" 
                            group 
                            type="password" 
                            validate 
                            error='dsadas'
                            outline
                            value={data.confirmpassword}
                            style={{marginTop:'-20px'}}
                        />
                            {
                                props.Auth.errormesres === ''?
                                null
                                :
                                <p style={{color:"red", lineHeight:0}}>
                                    {props.Auth.errormesres} <span style={{cursor:'pointer'}} onClick={()=>{props.errormessageclear()}} className='float-right font-weight-bold'>x</span>
                                </p>
                            }
                        {/* <p>{console.log(email)}</p> */}
                        <div className="text-center" >
                            <button className="buttoncart" type='submit'>Reset My Password</button>
                            <p>Just Remembered ? <span><a href='/login'>Sign In</a></span></p>
                        </div>
                    </div>
                </form>
            </div>                
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        Auth:state.Auth
    }
}

export default connect(mapStateToProps,{resetPass,errormessageclear}) (ResetPassword)

