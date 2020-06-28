import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { useEffect } from 'react';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import { Redirect } from 'react-router-dom';
import { regisStart } from '../redux/actions'

const SendMailVerified = (props) => {

    // const[email, setemail] = useState('')
    const[role, setrole] = useState(0)
    const[isloading, setisloading] = useState(true)


    useEffect(()=>{
        const email = localStorage.getItem('email')
        Axios.get(`${APIURL}/users/keeplogin`,{
            headers:{
              'Authorization':`Bearer ${localStorage.getItem("email")}`
            }
            }).then((res)=>{
              props.regisStart(res.data)
              setrole(res.data.role)
              console.log(res.data)
            }).catch((err)=>{
              console.log(err)
            })
            .finally(()=>{
                setisloading(false)
            //   this.setState({loading:false})
            })

        // if (email) {
        //     setisloading(false)
        // }
        // // console.log(email)
        // console.log(props.Auth)
    },[])

    const onSendMail = () => {
        // console.log(props.Auth)
        Axios.post(`${APIURL}/users/sendmailverification`,{
            email:props.Auth.email,
            username:props.Auth.username,
            iduser:props.Auth.iduser
        }).then((res)=>{
            console.log(res.data)
            //kasih tau kalau udah berhasil dikirim
        }).catch((err)=>{
            console.log(err)
        })
    } 

    //cek lagi buat proteksinya
    if (!isloading) {
    if(props.Auth.isverified || !props.Auth.islogin) {
        return <Redirect to='/notfound' />
    } 
}

        return(
            <div className="paddingatas">
                <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                    <div className='d-flex justify-content-center align-items-center' style={{flexDirection:"column", width:'30%', border:'2px solid #281e5a', borderRadius:'10px', height:'600px'}}>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start', width:'90%'}}>
                            <h1 className="h1 text-left mb-4" style={{lineHeight:0, color:'#281e5a'}}>Thanks !</h1>
                            <h2 className="h2 text-left mb-4" style={{color:'#281e5a'}}>Now Check Your Email</h2>
                        </div>
                        <h5 className="h5 text-left mb-4 grey-text" style={{color:'#281e5a', width:'90%'}}>We've sent an email to <strong style={{fontWeight:'bolder', color:'#281e5a'}}>{props.Auth.email}</strong> to verify your account</h5>
                        <div className='d-flex justify-content-center align-items-center' style={{fontSize:'100px', marginTop:'15px', color:'#281e5a'}}>
                            <FaRegEnvelopeOpen />
                        </div>
                        <div className="grey-text" style={{marginTop:'50px'}}>
                            <div className="text-center" >
                                <p>Didn't received an email ?</p>
                                <button className="buttoncart" onClick={onSendMail} >Send Mail Verification</button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        )
    // }

}

const mapStateToProps=(state)=>{
    return {
        Auth:state.Auth
    }
}

export default connect(mapStateToProps,{regisStart}) (SendMailVerified)