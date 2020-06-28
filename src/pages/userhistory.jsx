import React, { Component } from 'react';
import {Table, Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
// import {MDBBtn} from 'mdbreact';
import Axios from 'axios';
// import { API_url } from '../supports/APIurl';
import { connect } from 'react-redux';
// import {shallowEqual} from 'react-redux'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {changetoRupiah} from '../support/changetorupiah';
import {capitalfirst, capitalize} from '../support/sentencecase'
import {dateFormat} from '../support/date'
// import { Redirect } from 'react-router-dom';
// import {today} from '../supports/date'
import { APIURL } from '../support/ApiUrl';
// import {changetoRupiah} from '../supports/changetorupiah'
const MySwal = withReactContent(Swal)


class History extends Component{
    state = {
        products:[],
        isModalOpen:false,
        isModalEdit:false,
        cartdetail:[],
        totalharga:0,
        totalqty:0,
        isLoading:true,
        // indexdelete:-1,
        indexedit:-1,
        // category:[]
    }

    componentDidMount() {
        Axios.get(`${APIURL}/transactions/history/${this.props.User.iduser}`)
        .then((res)=>{
            console.log(res)
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            // this.setState({isLoading:false})
        })
    }

    renderProduct=()=>{
        const {products} = this.state
        return products.map((val, index)=>{
                return (
                    <tr key={index}>
                        <td scope="row">{index+1}</td>
                        <td>{dateFormat(val.orderdate)}</td>
                        {
                            val.completedate? 
                            <td>{dateFormat(val.completedate)}</td>
                            :
                            <td> - </td>
                        }
                        {/* <td> */}
                        {
                            val.no_resi? 
                            <td>{val.no_resi}</td>
                            :
                            <td> waiting </td>
                        }
                            {/* {val.no_resi} */}
                        {/* </td> */}
                        {/* <td>{val.method}</td> */}
                        <td>{capitalfirst(val.status)}</td>
                        <td style={{alignSelf:'center'}}>
                            <button className="buttondetails" onClick={()=>this.detailCartClick(index, val.idtransaction)} >Details</button>
                            {/* <button className="btn delete rounded-pill" onClick={()=>this.deleteConfirm(index,val.id)} style={{width:"120px"}}>Delete</button> */}
                        </td>
                    </tr>
                )
        })
    }

    toggleadd=()=> {
        this.setState({isModalOpen:!this.state.isModalOpen})
        // console.log(this.state.products)
    }

    detailCartClick = (index, id) =>{
        Axios.get(`${APIURL}/transactions/transdetail/${id}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({cartdetail:res.data})
                this.setState({indexedit:index})
                this.toggleadd()
                console.log(this.state.indexedit)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            this.setState({isLoading:false})
          })
    }

    renderIsiData=()=>{
        return this.state.cartdetail.map((val, index)=>{
            return(
                <tr key={index} style={{verticalAlign:"middle"}}>
                    <td >{index+1}</td>
                    <td >{capitalize(val.name)}</td>
                    <td >
                        <div className="rounded" style={{height:"221px", width:"152px"}}>
                            <img src={APIURL+val.image} height="100%" width="100%" alt=""/>
                        </div>
                    </td>
                    <td >{val.qty}</td>
                    <td >{changetoRupiah(val.qty*val.price)}</td>
                </tr>
            )
        })
    }

    renderTotal=()=>{
        if(!this.state.isLoading){
            let total=0
            this.state.cartdetail.forEach((val)=>{
                total+=val.qty*val.price
            })
            return(
                <tr style={{verticalAlign:"middle"}}>
                    <td colSpan="2" style={{verticalAlign:"middle", fontSize:20, fontWeight:"bolder"}}>Total</td>
                    <td ></td>
                    <td colSpan="2" style={{fontWeight:"bolder", fontSize:19}}>{changetoRupiah(total)}</td>
                </tr>
            )
        }
    }

    // onConfirmDelivered=(index)=>{
    //     // console.log(index)
    //     MySwal.fire({
    //         title: `Are you sure ${this.state.products[index].tr} is finished ?`,
    //         text: "Make Sure the Package is Safely Arrived!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Confirm it!'
    //         }).then((result) => {
    //             console.log(this.state.products[index])
    //             if (result.value) {
    //             Axios.patch(`${APIURL}/transactions/${this.state.products[index].id}`,{
    //                 status:"delivered",
    //                 date2:today()
    //             })
    //             .then((res)=>{
    //                 MySwal.fire(
    //                     'Confirmed!',
    //                     'Your Transaction is finished.',
    //                     'success'
    //                 ).then((result)=>{
    //                     if(result.value){
    //                         this.componentDidMount()
    //                         this.toggleadd()
    //                         // this.props.countCart(this.props.User.id)
    //                         //   console.log(this.props.User.id)
    //                     }
    //                 })
    //             }).catch((err)=>{
    //                 console.log(err)
    //             }) 
    //             }
    //         })
    // }

    render() {
        // if(this.props.User.role===1){
            // if(!this.state.isLoading){
                return(
                    <div style={{marginTop:"5%"}}>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleadd}>
                            <ModalHeader toggle={this.toggleadd}>Modal title</ModalHeader>
                                <ModalBody>
                                    <Table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                            <th>Foto</th>
                                            <th>qty</th>
                                            <th>Price</th>
                                            {/* <th>Hapus</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            this.renderIsiData()
                                        }
                                    </tbody>
                                    <tfoot>
                                        {
                                            this.renderTotal()
                                        }
                                    </tfoot>
                                    </Table>
                                </ModalBody>
                                {/* <ModalFooter>
                                    {
                                        (this.state.indexedit===-1 || this.state.products[this.state.indexedit].status==='delivered') ?
                                        null
                                        :
                                        <Button className="rounded-pill" color="danger" onClick={() => this.onConfirmDelivered(this.state.indexedit)}>Delivered</Button>
                                    }
                                    <Button className="rounded-pill" color="#81d4fa light-blue lighten-3" style={{color: 'white'}} onClick={this.toggleadd}>Cancel</Button>{' '}
                                </ModalFooter> */}
                        </Modal>
        
                        <Table striped className="mt-4">
                            <thead  align="center">
                                <tr>
                                    <th style={{fontSize:20}}>No</th>
                                    <th style={{fontSize:20}}>Order Date</th>
                                    <th style={{fontSize:20}}>Complete Date</th>
                                    <th style={{fontSize:20}}>No Resi</th>
                                    {/* <th style={{fontSize:20}}>Method</th> */}
                                    <th style={{fontSize:20}}>Status</th>
                                    <th style={{fontSize:20}}>Action</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                {
                                    this.renderProduct()
                                }
                            </tbody>
                        </Table>
                    </div>
                )
        //     } else {
        //         return(
        //             <div>
        //                 loading ....
        //             </div>
        //         )
        //     }
        // }else{
        //    return <Redirect to="/notfound"/>
        // }
        
    }
}
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}
export default connect(MapstatetoProps) (History)