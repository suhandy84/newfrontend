import React,{ useState } from 'react';
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import { FaLock } from 'react-icons/fa';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';


const ForgotPassword = () => {

    const [email, setemail] = useState('')

    const dataOnChange = (e) => {
        e.preventDefault()
        setemail(e.target.value)
    }

    const onSendForgot = (e) => {
        e.preventDefault()
        // console.log(email)
        Axios.post(`${APIURL}/users/sendmailforgotpassword`,{
            email:email
        })
        .then((res)=>{
            if(res.data.status) {
                alert('kirim pesan berhasil')
            }
            setemail('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="paddingatas">
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form className='d-flex justify-content-center align-items-center' onSubmit={onSendForgot} style={{flexDirection:"column", width:'30%', border:'2px solid #281e5a', borderRadius:'10px', height:'500px'}}>
                    <div className='d-flex justify-content-center align-items-center' style={{fontSize:'100px', marginBottom:'70px', color:'#281e5a'}}>
                        <FaLock />
                    </div>
                    <h1 className="h1 text-center mb-4" style={{lineHeight:0, color:'#281e5a'}}>Forgot Password ?</h1>
                    <h5 className="h5 text-center mb-4" style={{color:'grey', fontSize:'12px', width:'320px'}}>Please Enter your user account's verified email address and we will send you a password reset link.</h5>
                    <div className="grey-text" >
                        <MDBInput 
                            label="Input Your Email" 
                            name='email' 
                            onChange={dataOnChange} 
                            icon="envelope" 
                            group 
                            type="text" 
                            validate 
                            error='dsadas'
                            outline
                            value={email}
                        />
                        {/* <p>{console.log(email)}</p> */}
                        <div className="text-center" style={{marginTop:"-20px"}}>
                            <button className="buttoncart" type='submit' >Send Link to My Email</button>
                        </div>
                    </div>
                </form>
            </div>                
        </div>
    )
}

export default ForgotPassword

