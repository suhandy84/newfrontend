import React,{ useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import ReactImageMagnify from 'react-image-magnify';
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import Axios from 'axios';
import {APIURL} from '../support/ApiUrl';
import {Redirect} from 'react-router-dom';
import {changetoRupiah} from '../support/changetorupiah';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
// import {countCart} from './../redux/actions'
import {capitalize, capitalfirst} from '../support/sentencecase';
import {dateFormat} from '../support/date'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
// import '../App.css'




const ProductGramed = (props) => {

    const [activeItem, setactiveItem] = useState('1')
    const [data, setdata]=useState({})
    const [qty, setqty]=useState(1)
    const [modalopen, setmodalopen]=useState(false)
    const [redirectlog, setredirectlog]=useState(false)
    const [loading, setloading]=useState(true)
    // const [price, setprice] = useState(0)

    const {name, image, seen, stock, price, description, author}=data

    useEffect(()=>{
        console.log(props.match.params.idprod)
        console.log(props.User.role)

        Axios.get(`${APIURL}/product/getdetailprod/${props.match.params.idprod}`)
        .then((res)=>{
            console.log(res.data)
            setdata(res.data[0])
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloading(false)
        })
    },[])

    const qtychange=(e)=>{
        console.log(e.target.value)
        if(e.target.value===''){//kalau inputnya kosong maka qtynya mulai dari 0
            setqty(0)
        }
        if(Number(e.target.value)){//inputnya cuma bisa number
            if(qty===0){
                setqty(e.target.value[1])
            }else{
                if(e.target.value>stock){//jika valuenya lebih besar maka qtynya akan maksimal
                    setqty(stock)
                }else if(e.target.value<1){//jika valuenya lebih kecil maka qtynya akan 1
                    setqty(1)
                }else{
                    setqty(e.target.value)
                }
            }
        }
    }

    const sendtoCart=()=>{
        if(props.User.islogin&&props.User.role===1){
            var objecttransaction={
                status:'oncart',
                iduser:props.User.iduser,
                idproduct:data.idproduct,
                qty:qty
            }
            console.log(props.User.iduser)
            Axios.post(`${APIURL}/transactions/addtrans`, objecttransaction)
            .then((res1)=>{
                if(res1.data.status){
                    console.log(res1.data.status)
                        MySwal.fire({
                            icon:'success',
                            title:'Berhasil Masuk Cart'
                        }).then((res)=>{
                            // props.countCart(props.User.id)
                        })
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                }
            })
            // setid(this.props.User.id)        
        }else{
            setmodalopen(true)
        }
    }

    const sendtoWishlists=()=>{
        if(props.User.islogin&&props.User.role===1){
            var objecttransaction={
                status:'wishlists',
                iduser:props.User.iduser,
                idproduct:data.idproduct,
                // qty:qty
            }
            console.log(props.User.iduser)
            Axios.post(`${APIURL}/transactions/addwishlists`, objecttransaction)
            .then((res1)=>{
                if(res1.data.status){
                    console.log(res1.data.status)
                        MySwal.fire({
                            icon:'success',
                            title:'Berhasil Masuk Wishlist'
                        }).then((res)=>{
                            // props.countCart(props.User.id)
                        })
                } else {
                    MySwal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: 'Bukunya sudah ada di wishlist kamu!'
                    })
                }
            })
            // setid(this.props.User.id)        
        }else{
            setmodalopen(true)
        }
    }

    const toggle = tab => e => {
      if (activeItem !== tab) {
        setactiveItem(tab)
      }
    };

    const onToLoginClick=()=>{
        if(props.User.role===1){
            setmodalopen(false)
        }else{
            setmodalopen(false)
            setredirectlog(true)
        }
    }

    if(redirectlog){
        return <Redirect to='/login' />
    }

    if(!loading){
        return(
            <div className="containers" >
                <Modal centered toggle={()=>setmodalopen(false)} isOpen={modalopen}>
                    <ModalBody>
                        {
                            props.User.role===2?
                            'maaf and admin'
                            :
                            'Maaf anda harus login dahulu'
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={onToLoginClick}>Ok</button>
                    </ModalFooter>
                </Modal>
                <div className="inner-container" >
                    <div className="top-inner" >
                        <div className="left-top-inner">
                            <div className="cards" >
                                <div className="cards-image" >
                                <ReactImageMagnify style={{cursor:'zoom-in'}} {...{
                                        smallImage: {
                                            alt: name,
                                            isFluidWidth: true,
                                            src: APIURL+image
                                        },
                                        largeImage: {
                                            src: APIURL+image,
                                            width: 800,
                                            height: 1400
                                        },
                                        enlargedImageContainerDimensions: {
                                            width: '200%',
                                            height: '100%'
                                        },
                                        enlargedImagePortalId: 'portal'
                                    }} /> 
                                    {/* <img src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" width="100%" height="100%" alt="kimetsu" /> */}
                                </div>
                                <div className="cards-body" >
                                    <div className=" d-flex py-2" style={{alignItems:"center"}}>
                                        <button className="btn p-0" style={{color:'white', width:"60px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a'}} disabled={qty<=1?true:false} onClick={()=>setqty(qty-1)} >-</button>
                                        <div className="rounded" style={{border:'1px solid black'}}>
                                            <input
                                                type="text"
                                                style={{width:'90px', height:'40px', textAlign:'center', backgroundColor:'transparent', border:'0px'}}
                                                value={qty}
                                                onChange={qtychange} 
                                            />
                                        </div>
                                        <button className="btn p-0 " style={{color:'white', width:"60px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a'}} disabled={qty>=stock?true:false} onClick={()=>setqty(parseInt(qty)+1)} >+</button>
                                    </div>
                                    <div>
                                    <div className=" d-flex pt-3" style={{alignItems:"center", justifyContent:'center'}}>
                                        <p style={{fontSize:'18px', fontWeight:'bold'}}>
                                            {changetoRupiah(price*qty)},00
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="middle-top-inner" style={{flex:1, paddingLeft:'20px'}}>
                            <div className="book-title" >
                                <h1>{capitalize(name)}</h1>
                                <h3>{capitalize(author)}</h3>
                                <p> 4.50 (6,691 rating Goodreads)</p>
                                <div id='portal'>
    
                                </div>
                            </div>
                        </div>
                        <div className="right-top-inner">
                            <div className="transaction" >
                                <div className='inner-transaction'>
                                    <div className="transaction-info">
                                        <div className="box-info" >
                                            <div style={{display:'flex', width:'100%'}}>
                                                <div style={{flex:2, verticalAlign:'middle'}}>
                                                    <p style={{color:'#281e5a', fontSize:'16px', fontWeight:'bolder'}}>Soft Cover</p>
                                                </div>
                                                <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}><FaInfoCircle/></div>
                                            </div>
                                            <div>
                                                <p>20%</p>
                                            </div>
                                            <div>
                                                <p>{changetoRupiah(price*qty)},00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-button" >
                                        <div>
                                            <button className="buttoncart" onClick={sendtoCart} >Tambah Keranjang</button>
                                            {/* onClick={sendtoCart} */}
                                        </div>
                                        <div>
                                            <button className="buttonwish" onClick={sendtoWishlists} >Tambah Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-inner">
                        <MDBNav className="nav-tabs">
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "1"} onClick={toggle("1")} role="tab" >
                                Deskripsi
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "2"} onClick={toggle("2")} role="tab" >
                                Detail
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "3"} onClick={toggle("3")} role="tab" >
                                Ulasan
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={activeItem} >
                            <MDBTabPane tabId="1" role="tabpanel">
                                <p className="mt-2">
                                {description}
                                </p>
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel">
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Jumlah Halaman</div>
                                    <div style={{float:'right', width:'200px'}}>: {data.totalpage}</div>
                                    {/* <td>Jumlah Halaman</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.totalpage}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr >
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Tanggal Terbit</div>
                                    <div style={{float:'right', width:'200px'}}>: {dateFormat(data.publishat)}</div>
                                    {/* <td align='left' style={{alignSelf:'left'}}>Tanggal Terbit</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.publishat}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>ISBN</div>
                                    <div style={{float:'right', width:'200px'}}>: {data.isbn}</div>
                                    {/* <td>ISBN</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.isbn}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Bahasa</div>
                                    <div style={{float:'right', width:'200px'}}>: {capitalize(data.language)}</div>
                                    {/* <td>Bahasa</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.language}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Penerbit</div>
                                    <div style={{float:'right', width:'200px'}}>: {capitalize(data.publisher)}</div>
                                    {/* <td>Penerbit</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.publisher}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Berat Buku</div>
                                    <div style={{float:'right', width:'200px'}}>: {data.weight} kg</div>
                                    {/* <td>Berat Buku</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.weight}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Tinggi Buku</div>
                                    <div style={{float:'right', width:'200px'}}>: {data.height} cm</div>
                                    {/* <td>Tinggi Buku</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.height}
                                        </p>
                                    </td> */}
                                </tr>
                                <tr style={{width:'200px'}}>
                                    <div style={{float:'left', width:'200px', fontWeight:'bold'}}>Lebar Buku</div>
                                    <div style={{float:'right', width:'200px'}}>: {data.width} cm</div>
                                    {/* <td>Lebar Buku</td>
                                    <td>
                                        <p className="mt-2">
                                            {data.width}
                                        </p>
                                    </td> */}
                                </tr>                                
                            </MDBTabPane>
                            <MDBTabPane tabId="3" role="tabpanel">
                                <p className="mt-2">
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                                <p>
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                            </MDBTabPane>
                        </MDBTabContent>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div>
                Loading....
            </div>
        )
    }
}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}

export default connect(MapstatetoProps,{}) (ProductGramed)