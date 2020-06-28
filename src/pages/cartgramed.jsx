import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
// import { Modal,ModalBody,ModalFooter,ModalHeader,Button } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {countCart} from '../redux/actions';
import {Redirect} from 'react-router-dom';
// import {today} from '../supports/date'
import { FaRegTrashAlt,FaInfoCircle } from 'react-icons/fa';
// import { MDBBtn, MDBInputGroup } from 'mdbreact' 
import { APIURL } from '../support/ApiUrl';
import { capitalize } from '../support/sentencecase';
import { changetoRupiah } from '../support/changetorupiah';

const MySwal = withReactContent(Swal)

class Cart extends Component {
    state={
        isicart:[],
        // isModaladdOpen:false,
        transactionsId:[],
        // shipping:10000,
        ischeckout:false,
        discount:5000,
        coupon:'',
        removeindex:null
    }

    componentDidMount() {
        this.getdata()
        // console.log(today())
    }

    renderIsiData=()=>{
        return this.state.isicart.map((val, index)=>{
            return(
                <div className={this.state.removeindex===val.idtransactiondetail?'d-flex removed-item':'d-flex'} style={{alignItems:'center', padding:'20px', justifyContent:'space-around', backgroundColor:'#e8eaf6', borderRadius:'10px', marginBottom:'10px'}}>
                    <div className='d-flex'style={{width:"50%"}}>
                        <div className="imagetd">
                                <img src={APIURL+val.image} height="250px" width="150px" alt=""/>
                        </div>
                        <div className="tex-td" style={{marginLeft:'5%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <div className="name-td" style={{width:'100%'}}>
                                <h3 width="100%">{capitalize(val.name)}</h3>
                            </div>
                            <div>
                                <p style={{fontSize:'15px'}}>{capitalize(val.author)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="qty-td">
                            <button className="btn p-0" onClick={()=>this.onMinqty(index, val.idtransactiondetail)} style={{color:'white', width:"30px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a', boxShadow:'none', marginRight:'15px'}} >-</button>
                            {val.qty}
                            <button className="btn p-0" onClick={()=>this.onPlusqty(index, val.idtransactiondetail)} disabled={val.qty>=val.stock} style={{color:'white', width:"30px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a', boxShadow:'none', marginLeft:'15px'}} >+</button>
                    </div>
                    {/* <div width="25%" style={{fontSize:'18px'}}>{changetoRupiah(val.qty*val.price)}</div> */}
                    <div width="5%"><button className="delete" style={{borderRadius:'10px', border: '1px solid #f76c6c', outline:'none'}} onClick={()=>this.deleteconfirm(index, val.idtransactiondetail)}><FaRegTrashAlt/></button></div>
                </div>
            )
        })
    }

    renderTotal=()=>{
        let total=0
        this.state.isicart.forEach((val)=>{
            total+=val.qty*val.price
        })
        return(
            total
        )
    }

    onCheckoutClick=()=>{
        this.setState({ischeckout:true})
    }

    totalPrice=()=>{
        return this.renderTotal() - this.state.discount
    }

    getdata=()=>{
        Axios.get(`${APIURL}/transactions/cart?userId=${this.props.User.iduser}&status=oncart`)
        .then((res)=>{
            console.log(res.data)
            this.setState({isicart:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onPlusqty=(index,id)=>{
        console.log(index, id)
        Axios.get(`${APIURL}/transactions/plusqty/${id}`)
        .then((res)=>{
            console.log(res.data)
            if (res.data.status) {
                this.getdata()
            }
            this.props.countCart(this.props.User.iduser)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onMinqty=(index,id)=>{
        console.log(index, id)

        Axios.get(`${APIURL}/transactions/minqty/${id}`)
        .then((res)=>{
            console.log(res.data[0].qty)
            this.getdata()
            this.props.countCart(this.props.User.iduser)
            if(res.data[0].qty===0){
                Axios.put(`${APIURL}/transactions/deletecart/${id}`)
                .then((res2)=>{
                    this.getdata()
                    this.props.countCart(this.props.User.iduser)
                }).catch((err2)=>{
                    console.log(err2)
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    deleteconfirm=(index,id)=>{
        console.log(index, id)

        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.isicart[index].name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.put(`${APIURL}/transactions/deletecart/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                      if(result.value){
                          this.setState({removeindex:id})
                          const timer = setTimeout(() => {
                              this.getdata()
                              this.props.countCart(this.props.User.iduser)
                            }, 850);
                            return () => clearTimeout(timer)
                        }
                        //   console.log(this.props.User.id)
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }

    // BayarClick = () => {
    //     var method = this.refs.method.value
    //     var ccid = this.refs.ccnums.value
    //     var tes = this.state.transactionsId
    //     var yy =new Date().getFullYear()
    //     var mm =new Date().getMonth()
    //     var dd =new Date().getDate()
    //     var ms =new Date().getMilliseconds()
    //     console.log(tes)
    //     console.log(method)
    //     Axios.patch(`${API_url}/transactions/${tes[0].id}`,{
    //         method,
    //         userId:this.props.User.id,
    //         status:"pending",
    //         // id:tes[0].id,
    //         date:today(),
    //         date2:"",
    //         cc:ccid,
    //         tr:method+tes[0].id+yy+mm+dd+ms
    //     })
    //     .then((res)=>{
    //         this.getdata()
    //         this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    //         this.setState({isicart:[]})
    //         // console.log(res.data)
    //     }).catch((errbayar)=>{
    //         console.log(errbayar)
    //     })
    // }

    render() {
        if (this.state.ischeckout) {
            MySwal.fire({
                title: `Are you sure wanna proceed to checkout ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, proceed!'
              }).then((result) => {
                  if (result.value) {
                    //   return(
                        //   <Redirect to='/checkout' />
                        window.location.href='/checkout'
                    //   )
                  }
              })
        }

        if(this.props.User.role===1 && this.props.User.isverified){
            return (
                <div className="paddingatas" style={{paddingLeft:'10%', paddingRight:'10%', display:'flex'}}>
                    <div style={{flex:3, marginTop:'20px'}}>
                            {   
                                this.renderIsiData()
                            }
                    </div>
                    <div style={{display:'flex', flexDirection:'column', flex:1}}>
                        <div className="box-info2" style={{flex:1, marginLeft:'15px', marginTop:'20px', justifyContent:'space-around'}}>
                            <div style={{display:'flex', width:'100%', marginBottom:'20px', justifyContent:'center'}}>
                                <div style={{verticalAlign:'middle'}}>
                                    <p style={{color:'#281e5a', fontSize:'20px', fontWeight:'bolder'}}>Summary</p>
                                </div>
                            </div>
                            <div>
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{verticalAlign:'middle'}}>
                                        <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Subtotal</p>
                                    </div>
                                    <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}>{ changetoRupiah(this.renderTotal()) }</div>
                                </div>
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{verticalAlign:'middle'}}>
                                        <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Discount</p>
                                    </div>
                                    <div style={{flex:1, textAlign:'right', verticalAlign:'middle', color:this.state.discount?'red':'#281e5a'}}>
                                        {this.state.discount?
                                        `- ${changetoRupiah(this.state.discount)}`
                                        :
                                        changetoRupiah(this.state.discount)
                                        }
                                    </div>
                                </div>
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}>{changetoRupiah(this.state.shipping)}</div>
                                </div>
                            </div>
                            <div style={{display:'flex', width:'100%', borderTop:'1px solid #281e5a', paddingTop:'10px'}}>
                                <div style={{verticalAlign:'middle'}}>
                                    <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Total</p>
                                </div>
                                <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}>{ changetoRupiah(this.totalPrice()) }</div>
                            </div>
                            <button className="btn" style={{backgroundColor:'#2B4C80', color:'white', borderRadius:'10px'}} disabled={!this.state.isicart.length} onClick={this.onCheckoutClick}>Checkout</button>
                        </div>
                        <div  style={{flex:1, marginLeft:'15px', marginTop:'20px', width:'100%'}}>
                            {/* <div className="box-info3" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <MDBInputGroup
                                    hint="insert your code..."
                                    containerClassName=""
                                    append={
                                        <button style={{backgroundColor:'#2B4C80', color:'white', height:'38px', outline:'none', border:'1px solid #2B4C80', borderTopRightRadius:'3px', borderBottomRightRadius:'3px', fontFamily:'Roboto', fontWeight:'lighter'}} className="m-0 px-3 py-1">
                                        Redeem
                                        </button>
                                    }
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/notfound"/>
        }
    }

}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}
export default connect(MapstatetoProps,{countCart}) (Cart);
