import React, { Component } from 'react';
import './LoginLogout.css';
import { MDBInput } from 'mdbreact'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { RegisUser, LoginUser, errormessageclear } from '../redux/actions'


class LoginLogout extends Component{
    state={
        is_swap:false,
        username:'',
        password:'',
        regisuser:'',
        regispass:'',
        regisemail:'',
        regisconfirmpass:''
    }

    onInputChange = (e) => {
        this.setState({...this.state,[e.target.name]:e.target.value})
    }

    onSwapClick=()=>{
        this.setState({is_swap:!this.state.is_swap})
    }

    onRegisClick=(e)=>{
        e.preventDefault()
        var username=this.state.regisuser 
        var password=this.state.regispass
        var email=this.state.regisemail
        var confirmpass=this.state.regisconfirmpass
        console.log(username+' '+password)
        var obj = {
            username,
            password,
            email,
            confirmpass
        }
        console.log(obj)
        this.props.RegisUser(obj)
    }

    onLoginClick=(e)=>{
        e.preventDefault()
        var username=this.state.username 
        var password=this.state.password
        console.log(username+' '+password)
        var obj = {
            username,
            password
        }
        console.log(obj)
        this.props.LoginUser(obj)
    }
    
    render() {
        if (this.props.Auth.islogin) {
            return <Redirect to={'/'}/>
        }
        if (this.props.Auth.isregis) {
            return <Redirect to={'/mailverified'}/>
        }
        return(
        <div style={{marginTop:"130px", display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className={this.state.is_swap===false?"container-l" : "container-l right-panel-active" } id="container">
                <div className="form-container sign-up-container">
                    <form className="formlog" onSubmit={this.onRegisClick}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <div className="form-group" style={{width:'70%'}}>
                            <MDBInput label="Username" outline name="regisuser" onChange={this.onInputChange}/>
                            <MDBInput label="Email" outline name="regisemail" onChange={this.onInputChange}/>
                            <MDBInput label="Password" outline type="password" name="regispass" onChange={this.onInputChange}/>
                            <MDBInput label="Confirm Password" outline type="password" name="regisconfirmpass" onChange={this.onInputChange}/>
                            {
                                this.props.Auth.errormesreg === ''?
                                null
                                :
                                <p style={{color:"red", lineHeight:0}}>
                                    {this.props.Auth.errormesreg} <span style={{cursor:'pointer'}} onClick={()=>{this.props.errormessageclear()}} className='float-right font-weight-bold'>x</span>
                                </p>
                            }
                        </div>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="formlog" onSubmit={this.onLoginClick}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <div className="form-group" style={{width:'70%', textAlign:'left'}}>
                            <MDBInput label="Email / Username" outline type="text" name="username" onChange={this.onInputChange}/>
                            <MDBInput label="Password" outline type="password" name="password" onChange={this.onInputChange} />
                            {
                                this.props.Auth.errormes === ''?
                                null
                                :
                                <p style={{color:"red", lineHeight:0}}>
                                    {this.props.Auth.errormes} <span style={{cursor:'pointer'}} onClick={()=>{this.props.errormessageclear()}} className='float-right font-weight-bold'>x</span>
                                </p>
                            }
                        </div>
                        <a href="/sendresetpassword">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlays">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={this.onSwapClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={this.onSwapClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

const mapStateToProps=(state)=>{
    return {
        Auth:state.Auth
    }
}

export default connect(mapStateToProps,{errormessageclear,LoginUser,RegisUser}) (LoginLogout)