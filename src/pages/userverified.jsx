import React, { Component } from 'react'
import Axios from 'axios'
import {APIURL} from '../support/ApiUrl'
import querystring from 'query-string'
import {userverified} from '../redux/actions'
import {connect} from 'react-redux';
import {FaCheckCircle,FaClock} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom'

class UserVerified extends Component{
    state={
        success:0
    }

    componentDidMount() {
        console.log(this.props.location.search)
        var obj = querystring.parse(this.props.location.search)
        console.log(obj.token)
        Axios.get(`${APIURL}/users/verified`,{
            headers:{
                'Authorization':`Bearer ${obj.token}`
            }
        }).then((res)=>{
            console.log(res.data)
            // this.props.userverified(res.data)
            this.setState({success:1})
            localStorage.removeItem('email')
        }).catch((err)=>{
            console.log(err)
            this.setState({success:2})
        })
    }

    render() {
        if(this.state.success===0){
            return(
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <div style={{height:'150px', width:'150px', color:'#281e5a', marginBottom:'7%', boxShadow:'2px 2px 2px 2px', border:'1px solid #281e5a', borderRadius:'50%'}}>
                            <FaClock style={{height:'100%', width:'100%'}}/>
                        </div>
                        <h1 className="h1 text-center mb-4" style={{color:'#281e5a'}}>
                            Waiting !
                        </h1>
                        <h3 className="h3 text-center mb-4 grey-text">
                            Your verification process is still in progress ....
                        </h3>
                    </div>
                </div>    
                )
        }else if(this.state.success===2){
            return(
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <div style={{height:'150px', width:'150px', color:'#281e5a', marginBottom:'7%', boxShadow:'2px 2px 2px 2px', border:'1px solid #281e5a', borderRadius:'50%'}}>   
                            <AiFillCloseCircle style={{height:'100%', width:'100%'}}/>
                        </div>
                        <h1 className="h1 text-center mb-4" style={{color:'#281e5a'}}>
                            Oops!
                        </h1>
                        <h3 className="h3 text-center mb-4 grey-text" style={{lineHeight:0}}>
                            Verification failed :((
                        </h3>
                        <Link to='/'>
                            <button style={{marginTop:'10%'}}>Go to Homepage</button>
                        </Link>
                    </div>
                </div>        
                )
        }else{
            return(
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <div style={{height:'150px', width:'150px', color:'#281e5a', marginBottom:'7%', boxShadow:'2px 2px 2px 2px', border:'1px solid #281e5a', borderRadius:'50%'}}>
                            <FaCheckCircle style={{height:'100%', width:'100%'}}/>
                        </div>
                        <h1 className="h1 text-center mb-4" style={{color:'#281e5a'}}>
                            Verified!
                        </h1>
                        <h3 className="h3 text-center mb-4 grey-text" style={{lineHeight:0}}>
                            Voila! You have succesfully verified your account
                        </h3>
                        <Link to='/'>
                            <button style={{marginTop:'10%'}}>Go to Homepage</button>
                        </Link>
                    </div>
                </div>        
                )
        }
    }    
}

const mapStateToProps = (state) => {
    return {
        // AuthLog: state.Auth.login,
        Auth: state.Auth
    }
}

export default connect(mapStateToProps,{userverified}) (UserVerified)

