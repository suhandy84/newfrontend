import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {changePassUser,resetClear} from '../redux/actions'
import {Redirect} from 'react-router-dom' 
import { useEffect } from "react";
// import Axios from 'axios'
// import {API_URL} from './../supports/ApiUrl'
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

const Forgotpassword = (props)=>{
        const [data,setdata]=useState({
            oldpass:'',
            newpass:'',
            confirmnewpass:'',
            token:''
        })

        useEffect(()=>{
            var token = localStorage.getItem('token')
            setdata({...data,token:token})
        },[])
        
        const dataOnChange=(e)=>{
            setdata({...data,[e.target.name]:e.target.value})
            console.log(data)
        }

        const onFormSubmit=(e)=>{
            e.preventDefault()
            console.log(data)
            props.changePassUser(data)
            setdata({...data, oldpass:'', newpass:'', confirmnewpass:''})
        }
    
        // if(props.Changepass.status){
        //     return <Redirect to='/login'/>      
        // }
        
        if(props.User.role){
            return (
                <div className="paddingatas">
                    <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'90vh'}}>
                        <p className="h3 text-center" style={{marginBottom:'40px'}}>Change Password</p>
                        <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                            <div className="grey-text">
                                <MDBInput 
                                    label="Type your old password" 
                                    name='oldpass' 
                                    onChange={dataOnChange} 
                                    icon="lock" 
                                    group 
                                    type="password" 
                                    validate 
                                    error='dsadas'
                                    value={data.oldpass}
                                    outline
                                />
                                <MDBInput outline value={data.newpass} label="Type your new password" name='newpass'  icon="lock" group type="password"  onChange={dataOnChange} validate />
                                <MDBInput outline value={data.confirmnewpass} label="Confirm your new password" name='confirmnewpass' icon="lock" group type="password"  onChange={dataOnChange} validate />
                            </div>
                            {
                                props.Changepass.errorreset?
                                <MDBAlert color="danger" >
                                    {props.Changepass.errorreset} <span className='float-right font-weight-bold' style={{cursor:'pointer'}} onClick={()=>props.resetClear()}>X</span>
                                </MDBAlert>
                                :
                                null
                            }
                            <div className="text-center">
                                <button type='submit' className='buttonresetpass'>Change Password</button>
                            </div>
                        </form>
                    </div>                
                </div>
            )
        }else{
            return <Redirect to="/notfound" />
        }
}

const MapstatetoProps=(state)=>{
    return {
        Changepass:state.userReducers,
        User:state.Auth
    }
    
}

export default connect(MapstatetoProps,{changePassUser,resetClear}) (Forgotpassword);