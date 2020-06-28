import React, { Component } from 'react';
import Header from './component/header'
import Home from './pages/home';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Login from './pages/LoginLogout';
import Forgotpassword from './pages/forgotpassword';
import Resetpassword from './pages/resetpassword'
// import Register from "./pages/register";
// import Pagenotfound from './pages/pagenotfound'
// import UserSetting from './pages/usersetting'
import {connect} from 'react-redux'
import {LoginSuccessAction} from './redux/actions'
import Axios from 'axios';
import { APIURL } from './support/ApiUrl';
import Userverified from './pages/userverified'
import sendmailverified from './pages/sendmailverified';
// import Allproducts from './pages/Allproducts'
import Profile from './pages/userProfile'
import NotFound from './pages/notfound'
import ManageAdmin from './pages/manageadmin'
import ManageDiskon from './pages/managediskon'
import FilterProduct from './pages/filterproduct'
import Allproduct from './pages/allproduct';
import Detailproduk from './pages/productgramed';
import Cart from './pages/cartgramed';
import Checkout from './pages/checkout';
import Userhistory from './pages/userhistory';
import Changepassword from './pages/resetpassworduser'
import SearchProduct from './pages/search';
// import Detailproduk from './pages/productgramed'
import DiscProduct from './pages/discountproduct'

class App extends Component {
  state = {
	  loading: true
  };

  componentDidMount() {
  var token = localStorage.getItem("token");

  if(token){
    Axios.get(`${APIURL}/users/keeplogin`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
      }).then((res)=>{
        console.log(res)
        this.props.LoginSuccessAction(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        this.setState({loading:false})
      })
    } else {
      // if(email) {
        Axios.get(`${APIURL}/users/keeplogin`,{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem("email")}`
          }
          }).then((res)=>{
            this.props.regisStart(res.data)
            console.log(this.props.AuthLog)
          }).catch((err)=>{
            console.log(err)
          }).finally(()=>{
            this.setState({loading:false})
          })
      // } else {
      //   this.setState({loading:false})
      // }
    this.setState({loading:false})
  } 
	  // .then(res => {
		// // this.props.LoginSuccessAction(res.data);
    // // this.setState({ loading: true });
    // //   Axios.get(`${APIURL}/orders?userId=${id}`)
    // //   // .then(res1=>{
    // //   //   this.props.countCart(res1.data.length)
    // //   //   console.log(res1.data.length);
    // //   // })
    // //   .catch(err1 => {
    // //     console.log(err1);
    // //   })
	  // })
	  // .catch(err => {
		//   console.log(err);
	  // }).finally(()=>{
    //   this.setState({loading:false})
    // })
  }

  render() {
	if (this.state.loading) {
	  return <div>Loading... Please Wait...</div>;
	}
	return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path='/allproducts' exact component={Allproducts}/> */}
        <Route exact path="/login" component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/sendresetpassword' component={Forgotpassword} />
        <Route exact path='/resetpassword' component={Resetpassword} />
        <Route exact path='/mailverified' component={sendmailverified} />
        <Route exact path='/verified' component={Userverified} />
        <Route exact path='/manageadmin' component={ManageAdmin} />
        <Route exact path='/managediskon' component={ManageDiskon} />
        <Route exact path='/filterprod/:idfilter' component={FilterProduct} />
        {/* <Route exact path='/filterdiscprod' component={DiscProduct} /> */}
        {/* <Route exact path='/filterprod' component={FilterProduct} /> */}
        <Route exact path='/allproduct' component={Allproduct} />
        <Route exact path='/searchproduct' component={SearchProduct} />
        <Route exact path='/detailprod/:idprod' component={Detailproduk} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/history' component={Userhistory} />
        <Route exact path='/changepassword/:id' component={Changepassword} />
        <Route exact path='/diskonprod/:iddisc' component={DiscProduct} />
        {/* <Route exact path={"/home"} component={Home} /> */}
        {/* <Route exact path={"/register"} component={Register} /> */}
        {/* <Route exact path='/settings' component={UserSetting} /> */}
        {/* <Route exact path='/pagenotfound' component={Pagenotfound} /> */}
        {/* <Route path='/*' component={Pagenotfound} /> */}
        <Route path='/*' component={NotFound} />
      </Switch>
    </div>
  );
  }
}

const MapStateToProps=(state)=>{
  return{
	AuthLog:state.Auth.login
  }
}

export default connect(MapStateToProps, {LoginSuccessAction}) (App);