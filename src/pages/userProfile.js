import React, { Component } from "react";

//Component
// import userimg from "../";
// import Footer from "../../components/footer";

//Style
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

//Utility
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser,getDetail } from "../redux/actions";
import Axios from "axios";
import { APIURL } from "../support/ApiUrl";
import NotFound from "../pages/notfound";
import {FaPlus} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';
import Swal from 'sweetalert2'
import { capitalize, UpperCase } from "../support/sentencecase";

// import qs from 'query-string'

class Profile extends Component {
  state = {
    isloading:true,
    city:[],
    province:[],
    data:[],
    isedit:false,
    editImageFileName:"edit foto",
    editImageFile:undefined,
    iseditimage:false
  };

  componentDidMount() {
    Axios.get(`${APIURL}/profile/getregion`)
    .then((res)=>{
      console.log(res)
      this.setState({
        city:res.data.rescity,
        province:res.data.resprovince
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      this.setState({isloading:false})
    })
    this.getData()    
  }

  getData = () => {
    Axios.get(`${APIURL}/profile/getuser`,{
      headers:{
        'Authorization':`Bearer ${this.props.Auth.token}`
      }
    })
    .then((res)=>{
      console.log(res.data,'54')
      this.setState({data:res.data})
      this.props.getDetail(...res.data)
      console.log(this.state)
      console.log(this.state.data[0].email)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  renderCity = () => {
    if (!this.state.isloading) {
      return this.state.city.map((val,index)=>{
        return(
          <option value={val.id_city}>{val.name} - {val.type}</option>
        )
      })
      
    }
  }

  renderProvince = () => {
    if (!this.state.isloading) {
      return this.state.province.map((val,index)=>{
        return(
          <option value={val.id_province}>{val.name}</option>
        )
      })
      
    }
  }

  notify = () => {
    console.log("toast");
    toast.success("Data Berhasil Diubah.");
  };

  btnSimpan = () => {
    let namadepan = this.refs.namadepan.value.toString().toLowerCase();
    let namabelakang = this.refs.namabelakang.value.toString().toLowerCase();
    let kokab = parseInt(this.refs.alamatkota.value);
    let kodepos = parseInt(this.refs.kodepos.value);
    let provinsi = parseInt(this.refs.provinsi.value);


    let nomorhp = this.refs.hp.value;
    let alamat = this.refs.alamat.value.toString().toLowerCase();

    let data = { namadepan, namabelakang, kokab, kodepos, alamat, nomorhp, provinsi };

    this.props.updateUser(this.props.Auth.iduser, data);
    this.setState({isedit:false})
    // this.notify();
    // setTimeout(() => this.props.getUser(), 2500);
  };

  onUploadImageChange = (e) => {
    console.log(e.target.files[0])
    var file=e.target.files[0]
    if(file){
      this.setState({editImageFileName:file.name, editImageFile:e.target.files[0]})
    }else{
      this.setState({editImageFileName:'edit foto', editImageFile:undefined})
    }
  }

  onSaveUpload = () => {
    console.log(this.state.editImageFileName)
    var token = localStorage.getItem('token')
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
            Axios.put(`${APIURL}/profile/uploadimage`, formdata, Headers)
            .then((res)=>{
                if(res.data.status) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Success Upload!',
                      text: 'Your photo has been uploaded',
                  }).then(()=>{
                    this.getData()
                    this.setState({iseditimage:false})
                  })
                }
            })
            .catch((err)=>{
                console.log(err)
                alert(err)
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'kamu belum memilih foto',
            })
        }
  }

  render() {
    if (this.props.Auth.islogin === false) {
      return <Redirect to="/" />;
    }
    if (this.props.Auth.role !== 1) {
      return <NotFound />;
    }
    if (!this.props.userReducers.loading){
      return (
        <div style={{marginTop:'30px'}}>
          <div className="container mb-5">
            <div className="d-flex pt-5 pr-5 mb-5">
              {
                !this.props.userReducers.image
                ?
                <label for="image" style={{position:'relative', top:'120px', left:'150px', cursor:'pointer'}} onClick={()=>this.setState({iseditimage:true})}>
                    <input type="file" name="image" id="image" style={{display:"none"}} width="30px" height="30px" onChange={this.onUploadImageChange}/>
                    <div style={{borderRadius:'50%', width:'30px', height:"30px", backgroundColor:'#281e5a', color:'white', justifyContent:'center', alignItems:'center', display:'flex'}}>
                      <FaPlus />
                    </div>
                </label>
                :
                <label for="image" style={{position:'relative', top:'120px', left:'150px', cursor:'pointer'}} onClick={()=>this.setState({iseditimage:true})}>
                    <input type="file" name="image" id="image" style={{display:"none"}} width="30px" height="30px" onChange={this.onUploadImageChange}/>
                    <div style={{borderRadius:'50%', width:'30px', height:"30px", backgroundColor:'#281e5a', color:'white', justifyContent:'center', alignItems:'center', display:'flex'}}>
                      <MdEdit />
                    </div>
                </label>
              }              
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid black', borderRadius:'50%', overflow:'hidden', height: "160px", width: "160px"}}>
                <img
                  src={this.props.userReducers.image?APIURL+this.props.userReducers.image:'./image/defaultpicture.jpg'}
                  alt="userimg"
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
              <div className="p-5" style={{height:'170px'}}>
                <div className="profile-usertitle-name">
                  {capitalize(this.props.userReducers.firstname)}
                </div>
                <div className="profile-usertitle-job">
                  {capitalize(this.props.userReducers.lastname)}
                </div>
                {
                this.state.iseditimage
                ?
                <>
                <button style={{
                  backgroundColor:'#281e5a', 
                  width:'15px', 
                  height:'10px', 
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center', 
                  borderRadius:'5px',
                  position:'relative', top:'27px', left:'-10px'
                  }}
                  onClick={this.onSaveUpload}
                  >
                    save
                </button>
                <button style={{ 
                  width:'15px', 
                  height:'10px', 
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center', 
                  borderRadius:'5px',
                  position:'relative', top:'1px', left:'100px'
                  }}
                  onClick={()=>this.setState({iseditimage:false})}
                  >
                    cancel
                </button>
                </>
                :
                null
              }
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <div style={{display:'flex', flexDirection:'column'}}>
                <h2 className="kix mb-5">Profil Saya</h2>
              <Form>
                {/* NAMA LENGKAP */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2} style={{color:this.props.userReducers.erroredit?'red':'black'}}>
                    Nama Depan<span className="redstar">*</span>
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        type="text"
                        ref="namadepan"
                        defaultValue={capitalize(this.props.userReducers.firstname)}
                      />
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={capitalize(this.props.userReducers.firstname)}
                      />
                    }
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Nama Belakang
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        type="text"
                        ref="namabelakang"
                        defaultValue={capitalize(this.props.userReducers.lastname)}
                      />
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={capitalize(this.props.userReducers.lastname)}
                      />
                    }
                  </Col>
                </Form.Group>
                
  
                {/* EMAIL */}
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={this.props.Auth.email}
                    />
                  </Col>
                </Form.Group>
  
                {/* NO HP */}
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2} style={{color:this.props.userReducers.erroredit?'red':'black'}}>
                    Nomor HP<span className="redstar">*</span>
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        type="text"
                        ref="hp"
                        defaultValue={this.props.userReducers.phone}
                      />
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={this.props.userReducers.phone}
                      />
                    }
                    
                  </Col>
                </Form.Group>
  
                {/* ALAMAT */}
                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                  <Form.Label column sm={2} style={{color:this.props.userReducers.erroredit?'red':'black'}}>
                    Alamat<span className="redstar">*</span>
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        as="textarea"
                        rows="5"
                        ref="alamat"
                        defaultValue={UpperCase(this.props.userReducers.jalan)}
                      />
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={UpperCase(this.props.userReducers.jalan)}
                      />
                    }
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                  <Form.Label column sm={2} style={{color:this.props.userReducers.erroredit?'red':'black'}}>
                    Kota/Kab<span className="redstar">*</span>
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        as="select"
                        rows="5"
                        ref="alamatkota"
                        defaultValue={this.props.userReducers.kota}
                      >
                        <option value='hidden'>Pilih Kota ...</option>
                        {this.renderCity()}
                      </Form.Control>
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={this.props.userReducers.kota}
                      />
                    }
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                  <Form.Label column sm={2} style={{color:this.props.userReducers.erroredit?'red':'black'}}>
                    Provinsi<span className="redstar">*</span>
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        as="select"
                        rows="5"
                        ref="provinsi"
                        defaultValue={this.props.userReducers.provinsi}
                      >
                        <option value='hidden'>Pilih Provinsi ...</option>
                        {this.renderProvince()}
                      </Form.Control>
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={this.props.userReducers.provinsi}
                      />
                    }
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                  <Form.Label column sm={2} style={{color:this.props.userReducers.erroredit?'red':'black'}}>
                    Kodepos<span className="redstar">*</span>
                  </Form.Label>
                  <Col sm={10}>
                    {
                      this.state.isedit
                      ?
                      <Form.Control
                        type="text"
                        rows="5"
                        ref="kodepos"
                        defaultValue={this.props.userReducers.kodepos}
                      />
                      :
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={this.props.userReducers.kodepos}
                      />
                    }
                  </Col>
                </Form.Group>
  
                {/* BUTTON SIMPAN */}
                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }}>
                    {
                      this.state.isedit
                      ?
                      null
                      :
                      <Button type="button" onClick={()=>this.setState({isedit:true})} disabled={this.state.isedit} size="lg">
                        Edit Biodata
                      </Button>
                    }
                    {
                      this.state.isedit
                      ?
                      <>
                      <Button type="button" onClick={this.btnSimpan} size="lg" disabled={!this.state.isedit}>
                        Simpan
                      </Button>
                      <Button type="button" classname='danger' onClick={()=>this.setState({isedit:false})} size="lg" disabled={!this.state.isedit}>
                        Cancel
                      </Button>
                      </>
                      :
                      null
                    }
                    <Link to={`/changepassword/${this.props.Auth.iduser}`}>
                      <Button variant="warning" className="ml-3" size="lg">
                        Ubah Password
                      </Button>
                    </Link>
                  </Col>{console.log(this.state.isedit)}
                </Form.Group>
              </Form>
              <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover={false}
              />
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      );
    }else {
      return(
        <div>
          loading ...
        </div>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return {
      Auth:state.Auth,
      userReducers:state.userReducers
  }
}

// const mapStateToProps = (state) => {
//   return {
//     islogin: state.auth.islogin,
//     email: state.auth.email,
//     nama: state.auth.nama,
//     role: state.auth.role,
//     id: state.auth.id,
//     /////
//     alamat: state.user.alamat,
//     nomorhp: state.user.nomorhp,
//     loading: state.user.loading
//   };
// };

export default connect(mapStateToProps, {updateUser,getDetail}) (Profile);

// Belum ada Proteksi jika ada yang kosong