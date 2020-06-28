import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {APIURL} from '../support/ApiUrl'
import {Table} from 'reactstrap'
import Swal from 'sweetalert2'
// import {changetoRupiah} from '../supports/changetoRupiah'
// import SquareButton  from '../components/button'
// import {Getdata} from './../redux/actions'
import {getDetail} from '../redux/actions'
import {capitalize, UpperCase} from '../support/sentencecase'
import {changetoRupiah} from '../support/changetorupiah'
import qs from 'query-string'
import { MDBInputGroup } from 'mdbreact';
import { Link } from 'react-router-dom';



class Cart extends Component {
    state = { 
        isicart:[],
        isPayment:'',
        ccnumber:'',
        isloading:true,
        couriername:'',
        courierservice:[],
        totalweight:0,
        shippingfee:0,
        totalpay:0,
        isUploadPay:false,
        minutes:0,
        seconds:30,
        editImageFileName:'masukkan foto',
        editImageFile:undefined
    }

    // async componentDidMount() {
    //     const [firstcourier, secondcourier] = await Promise.all([
    //         Axios.post(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost`,qs.stringify({
    //                 origin: '152',
    //                 destination: `501`,
    //                 weight: 2000,
    //                 courier: 'jne'
    //             }), {
    //             headers: {
    //                 key :'b314f4819091829566fcb93bb2c4fa3a',
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         }),
    //         Axios.post(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost`,qs.stringify({
    //                 origin: '152',
    //                 destination: `501`,
    //                 weight: 2000,
    //                 courier: 'tiki'
    //             }), {
    //             headers: {
    //                 key :'b314f4819091829566fcb93bb2c4fa3a',
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         })
    //     ])
    //     this.setState({
    //         couriername:firstcourier.data,
    //         courierservice:secondcourier.data
    //     })
    //     console.log(firstcourier.data.rajaongkir.results[0].name)
    //     console.log(secondcourier.data.rajaongkir.results[0].name)

    // }
    
    componentDidMount(){
        // Axios.get(`${APIURL}/transactions/totalweight/${this.props.User.iduser}`)
        // .then((totalweight)=>{
        //     console.log(parseFloat(totalweight.data[0].totalweigth*1000))
        //     this.setState({totalweight:parseFloat(totalweight.data[0].totalweigth*1000) })
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
        // Axios.get(`${APIURL}/profile/getuser`,{
        //     headers:{
        //       'Authorization':`Bearer ${this.props.User.token}`
        //     }
        //   })
        //   .then((res)=>{
        //     console.log(res.data,'36')
        //     // this.setState({data:res.data})
        //     this.props.getDetail(...res.data)
        //     Axios.post(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost`,qs.stringify({
        //             origin: '152',
        //             destination: `${res.data[0].id_city}`,
        //             weight: this.state.totalweight,
        //             courier: 'jne'
        //         }), {
        //         headers: {
        //             key :'b314f4819091829566fcb93bb2c4fa3a',
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     })
        //     .then((resongkir)=>{
        //         this.setState({
        //             couriername:resongkir.data.rajaongkir.results[0].name,
        //             courierservice:resongkir.data.rajaongkir.results[0].costs
        //         })
        //         console.log(resongkir.data.rajaongkir.results[0].name,'36')
        //         console.log(resongkir.data.rajaongkir.results[0].costs,'36')
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        //     // console.log(this.state)
        //     // console.log(this.state.data[0].email)
        //   })
        //   .catch((err)=>{
        //     console.log(err)
        //   })
        //   .finally(()=>{
        //       this.setState({isloading:false})
        //   })
        this.getdata()
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
        Axios.get(`${APIURL}/transactions/totalweight/${this.props.User.iduser}`)
        .then((totalweight)=>{
            console.log(parseFloat(totalweight.data[0].totalweigth*1000))
            this.setState({totalweight:parseFloat(totalweight.data[0].totalweigth*1000) })
        })
        .catch((err)=>{
            console.log(err)
        })
        Axios.get(`${APIURL}/profile/getuser`,{
            headers:{
              'Authorization':`Bearer ${this.props.User.token}`
            }
          })
          .then((res)=>{
            console.log(res.data,'36')
            // this.setState({data:res.data})
            this.props.getDetail(...res.data)
            Axios.post(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost`,qs.stringify({
                    origin: '152',
                    destination: `${res.data[0].id_city}`,
                    weight: this.state.totalweight,
                    courier: 'jne'
                }), {
                headers: {
                    key :'b314f4819091829566fcb93bb2c4fa3a',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((resongkir)=>{
                this.setState({
                    couriername:resongkir.data.rajaongkir.results[0].name,
                    courierservice:resongkir.data.rajaongkir.results[0].costs
                })
                console.log(resongkir.data.rajaongkir.results[0].name,'36')
                console.log(resongkir.data.rajaongkir.results[0].costs,'36')
            })
            .catch((err)=>{
                console.log(err)
            })
            // console.log(this.state)
            // console.log(this.state.data[0].email)
          })
          .catch((err)=>{
            console.log(err)
          })
          .finally(()=>{
              this.setState({isloading:false})
          })
    }

    //  ===================== SHIPPING AND PAYMENT INFO ===================== //

    renderaddress=()=>{
        if(this.props.User.address!==''){
            return this.props.User.address.map((val,index)=>{
                return(
                    <div key={index}>
                        <div>{val.name}</div>
                        <div>{val.phone}</div>
                        <div>{val.street}</div>
                        <div>{val.city} {val.state} {val.zip}</div>
                    </div>
                )
            })
        }else{
            return(
                <div>You don't have address yet</div>
            )
        }
    }

    renderCourier=()=>{
        if(this.state.courierservice.length!==0){
            return this.state.courierservice.map((val,index)=>{
                return(
                    <option value={val.cost[0].value}>{val.description} / {val.service} / {val.cost[0].etd} hari / {changetoRupiah(val.cost[0].value)},00</option>
                    // <div key={index}>
                    //     <div>{val.name}</div>
                    //     <div>{val.phone}</div>
                    //     <div>{val.street}</div>
                    //     <div>{val.city} {val.state} {val.zip}</div>
                    // </div>
                )
            })
        }else{
            return(
                <div>You don't have address yet</div>
            )
        }
    }
    
    onSelectCC=(e)=>{
        var selected= e.target.value
        if(!selected){
            this.setState({isPayment:''})
        }else{
            this.setState({isPayment:selected})
        }
        console.log(selected)
    }

    onSelectCost =(e)=>{
        var selected= e.target.value
        if(!selected) {
            this.setState({shippingfee:0})
        }else{
            this.setState({shippingfee:parseInt(selected)})
        }
        
        console.log(selected)
    }
    
    dataOnChange=(e)=>{
        var ccnumber=e.target.value
        this.setState({ccnumber})
        console.log(this.state.ccnumber)
    }
    
    //  ===================== CART INFO ===================== //
    
    renderisidata=()=>{
        return this.state.isicart.map((val,index)=>{
            return (
                <tr key={index} style={index === this.state.isicart.length-1?{borderBottom:'1px #DEE2E6 solid'}:{}}>
                    <td>{capitalize(val.name)}</td>
                    {/* <td className='text-center'><img src={APIURL+val.image} height='100' alt=''></img></td> */}
                    <td className='text-center' >{capitalize(val.author)}</td>
                    <td className='text-center' style={{width:'50%'}}>{changetoRupiah(val.price)}</td>
                    <td>{val.qty}</td>
                    <td className='text-center' style={{width:'50%'}}>{changetoRupiah(val.price*val.qty)}</td>
                </tr>
            )
        })
    }

    renderTotalpay = () => {
        var total=0
        this.state.isicart.forEach((val)=>{
            var output= val.price*val.qty
            total+=output
        })
        return(
            total+this.state.shippingfee
        ) 
    }

    rendertotalcart =()=>{
        var total=0
        this.state.isicart.forEach((val)=>{
            var output= val.price*val.qty
            total+=output
        })
        console.log(total)
        // this.setState({})
        
        return (
            <div className='text-right mb-3 col-md-8 float-right'>
                <div className="row m-0 p-0 justify-content-end">
                    <div className="col-md-5 p-0">Total Product</div>
                    <div className="col-md-5 p-0">{changetoRupiah(total)}</div>
                </div>
                <div className="row m-0 p-0 justify-content-end">
                    <div className="col-md-5 p-0">Shipping fee</div>
                    <div className="col-md-5 p-0">{this.state.shippingfee}</div>
                </div> 
                <div className="row m-0 p-0 justify-content-end red-text">
                    <div className="col-md-5 p-0">Discount</div>
                    <div className="col-md-5 p-0">-0</div>
                </div>
                <div className="row m-0 p-0 justify-content-end">
                    <div className="col-md-5 p-0">Total Payment</div>
                    <div className="col-md-5 p-0">{changetoRupiah(total+this.state.shippingfee)}</div>
                </div> 
            </div>
        )
    }

    timer = () => {
        var token = localStorage.getItem('trans')
        this.interval = setInterval(() => {
            const {minutes,seconds} = this.state
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        Axios.get(`${APIURL}/transactions/failedupload`,{
                            headers:{
                                'Authorization':`Bearer ${token}`
                            }
                        })
                        .then(()=>{
                            this.setState({isUploadPay:false,minutes:0, seconds:30})
                            clearInterval(this.interval)
                            this.getdata()
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    } else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                } 
            }, 1000)
    }

    confirmUpload = () => {
        var token = localStorage.getItem('trans')
        if(this.state.editImageFile) {
            var formdata=new FormData()
    
            var Headers={
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Bearer ${token}`
                }
            }
    
            formdata.append('image', this.state.editImageFile) //'image' harus sama dengan yang di backend photocontrollers
            formdata.append('data', JSON.stringify())  //ngaruh ke req.body.data di backend
            Axios.put(`${APIURL}/transactions/uploadtransfer`, formdata, Headers)
            .then((res)=>{
                if(res.data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Transfer Has Been Uploaded',
                        text: 'Please wait for verification process',
                    }).then(()=>{
                        clearInterval(this.interval)
                        this.setState({minutes:0, seconds:30, isUploadPay:false})
                        // window.location.href='/'
                    })
                }
                // setdata(res.data)
            })
            .catch((err)=>{
                console.log(err)
                alert(err)
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please upload your transfer bill',
            })
        }
        
        // uploadtransfer
    }

    onUploadImageChange=(e)=>{
        console.log(e.target.files[0])
        var file=e.target.files[0]
        if(file){
          this.setState({editImageFileName:file.name, editImageFile:e.target.files[0]})
        }else{
          this.setState({editImageFileName:'edit foto', editImageFile:undefined})
        }
      }

    confirmorder=()=>{
        
        if(this.state.isPayment && this.state.couriername){
            var data={
                ccnumber:this.state.ccnumber,
                isPayment:this.state.isPayment,
                // ccnumber:this.state.ccnumber,
                couriername:this.state.couriername,
                totalpay:this.renderTotalpay(),
                iduser:this.props.User.iduser
            }
            Axios.put(`${APIURL}/transactions/checkout/${this.state.isicart[0].idtransaction}`,data)
            .then((res)=>{
                if(res.data.status) {
                    localStorage.setItem('trans',res.data.token)
                    // this.props.Getdata()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success confirm payment!',
                        text: 'Your payment is being verified, please upload your transfer bill max 1x24 hour',
                    }).then(()=>{
                        this.getdata()
                        this.setState({isUploadPay:true, isPayment:'', ccnumber:'', couriername:'', courierservice:[], shippingfee:0, isPayment:''})
                        this.timer() 
                    })
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please complete the fills blank',
            })
        }
        console.log('confirm')
    }

    
    render() { 
        if (this.state.isloading) {
            return(
                <div>loading....</div>
            )
        }
        return ( 
            <div>
                <div className="mt-5 mx-5 pt-5 px-5 row ">

                    {/* ===================== SHIPPING AND PAYMENT INFO =====================*/}

                    <div className="col-md-5 my-5 mr-5">
                        <div>
                            Ship to:
                            <div className="row mt-3">
                                <div className="col-md-10">
                                    <div>{capitalize(this.props.User.username)}</div>
                                    <div>{capitalize(this.props.Profile.phone)}</div>
                                    <div>{UpperCase(this.props.Profile.jalan)}</div>
                                    <div>{UpperCase(this.props.Profile.kota)}</div>
                                    <div>{UpperCase(this.props.Profile.provinsi)} - {this.props.Profile.kodepos}</div>
                                </div>
                                <div className="col-md-2 m-0 p-0">
                                    <div className="btn btn-link m-0 p-0 blue-text text-capitalize">
                                        <Link to='profile' >
                                            edit    
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-5">
                            <form className="was-validated">
                                <div>Please select payment method:</div>
                                <div className="form-group">
                                    <select className="custom-select" required onChange={this.onSelectCC}>
                                    <option value={this.state.isPayment}>Open this select menu</option>
                                    <option value="cc">Credit Card</option>
                                    <option value="bank">Transfer</option>
                                    </select>
                                    <div className="invalid-feedback">Select payment method</div>
                                </div>
                                <div>
                                <div>
                                    {
                                        this.state.isPayment==='cc'
                                        ?
                                        <input type="number" className="form-control" placeholder="Input card number" onChange={this.dataOnChange} required/>
                                        :
                                        null
                                    }
                                    {
                                        this.state.isPayment==='bank'
                                        ?
                                        <div style={{width:'500px', height:'120px', padding:'20px', border:'1px solid black', display:"flex", alignItems:'center', borderRadius:'10px', marginBottom:'20px'}}>
                                            <div>
                                                <img src="./image/BCA.jpg" alt="" width='200px' height='100px'/>
                                            </div>
                                            <div style={{marginLeft:"10px"}}>
                                                <div>
                                                    No Rekening:
                                                </div>
                                                <div>
                                                    123456
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                </div>
                                <div>Please select courier available:</div>
                                <div className="form-group">
                                    <select className="custom-select" required onChange={this.onSelectCost}>
                                    <option value="">{this.state.couriername}</option>
                                    {
                                        this.renderCourier()
                                    }
                                    </select>
                                    <div className="invalid-feedback">Select payment method</div>
                                </div>
                            </form>
                                <div>
                                    <div className="box-info3" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <MDBInputGroup
                                            hint="insert your code here..."
                                            containerClassName=""
                                            append={
                                                <button style={{backgroundColor:'#2B4C80', color:'white', height:'38px', outline:'none', border:'1px solid #2B4C80', borderTopRightRadius:'3px', borderBottomRightRadius:'3px', fontFamily:'Roboto', fontWeight:'lighter'}} className="m-0 px-3 py-1">
                                                Redeem
                                                </button>
                                            }
                                        />
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* ===================== CART INFO =====================*/}

                    <div className="col-md-5 my-5 ml-5" >
                        <div> 
                            <h5 className="text-center text-uppercase"> Product </h5>
                        </div>
                        <Table striped>
                            <thead>
                                <th>Name</th>
                                <th className='text-center'>Author</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Qty</th>
                                <th className='text-center'>Total</th>
                                <th className='text-center'></th>
                            </thead>
                            <tbody> 
                                {this.renderisidata()}
                            </tbody>
                        </Table>
                            {this.rendertotalcart()}
                            <div className="text-right p-3" >
                                <button onClick={this.confirmorder} disabled={this.state.isUploadPay} style={{borderRadius:"10px", backgroundColor:this.state.isUploadPay?"grey":""}}>
                                    Pay
                                </button>
                                {
                                    this.state.isUploadPay
                                    ?
                                    <div className="mt-5">
                                        <input type="file" className="form-control" label="Upload Bukti Transfer" required onChange={this.onUploadImageChange}/>
                                        <h3 className="mb-3">Time Remaining: {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h3>
                                        <button onClick={this.confirmUpload} style={{borderRadius:"10px"}}>
                                            Upload Transfer
                                        </button>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                    </div>
                </div>
            </div>
         );
    }
}

const MapstatetoProps=(state)=>{
    return{
      User:state.Auth,
      Profile:state.userReducers
    }
  }
 
export default connect(MapstatetoProps, {getDetail}) (Cart);