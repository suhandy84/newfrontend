import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import Numeral from 'numeral'
import Axios from 'axios'
import {APIURL} from './../support/ApiUrl'
import {FaArrowAltCircleRight} from 'react-icons/fa'
import {BukanHome,IniHome} from './../redux/actions/HeaderAction'
import {FaCartPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ProductItem from "./ProductItem"

class Home extends Component {
    state = {
        products:[],
        searchProducts:[],
        sortNama:0,
        sortHarga:0,
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${APIURL}/products?_expand=kategori&_limit=20`)
        .then((res)=>{
            this.setState({products:res.data, searchProducts:res.data})
        }).catch(()=>{
        })
    }


    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
            return (
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                        <div style={{height:300,width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>
                            <div className='kotakhitam'>
                                <Link to={`/productdetail/${val.id}`} className='tombolebuynow'>
                                    <button className='tomboldalam'><FaCartPlus/></button>
                                </Link>
                            </div>  
                        </div>
                        <CardBody style={{height:150}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.kategori.nama}</button>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }


    onSearchClick=()=>{
        let inputMin=parseInt(this.min.value)
        let inputMax=parseInt(this.max.value)



        let hasilFilterHarga=this.state.products.filter((product)=>{
            
                if (!inputMax && !inputMin){
                    return this.state.products.filter
                } if (inputMax && inputMin) {
                    return (product.harga>=inputMin && product.harga<=inputMax)
                } if (inputMax && !inputMin){
                    return (product.harga<=inputMax)
                } if (!inputMax && inputMin){
                    return (product.harga>=inputMin)
                }
        })

        this.setState({searchProducts:hasilFilterHarga})
    }

    // onResetClick=()=>{
    //     this.min.value=''
    //     this.max.value=''
    //     this.setState((prevState)=>{
    //         return{
    //             searchProducts: prevState.products
    //         }
    //     })
    // }

    urut=(a,b)=>{
        return a.harga-b.harga
    }
    urutDes=(a,b)=>{
        return b.harga-a.harga
    }
      
    urutHuruf=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }   
    urutHurufDes=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }   

    onSortName=()=>{
        if (!this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:1})
        } if (this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:0})
        }
    }

    // onSortCategory=()=>{
    //     if (!this.state.sortkat){
    //         var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
    //         this.setState({searchProducts:hasilFilter})
    //         this.setState({sortkat:1})
    //     } if (this.state.sortkat){
    //         var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
    //         this.setState({searchProducts:hasilFilter})
    //         this.setState({sortkat:0})
    //     }
    // }

    // onSortHarga=()=>{
    //     if (!this.state.sortHarga){
    //         var hasilFilter=this.state.searchProducts.sort(this.urut)
    //         this.setState({searchProducts:hasilFilter})
    //         this.setState({sortHarga:1})
    //     } if (this.state.sortHarga){
    //         var hasilFilter=this.state.searchProducts.sort(this.urutDes)
    //         this.setState({searchProducts:hasilFilter})
    //         this.setState({sortHarga:0})
    //     }
    // }

    renderList=()=>{
        return this.state.searchProducts.map((product)=>{
            return(
                <ProductItem barang={product} key={product.id}/>
            )
            
        })  
    }


    render() {
        return (
            <div>
                <div className="col-md-3" style={{marginTop:"7%"}}></div>
              <div className="container">
                    <div className="row">
                        {/* div untuk search  */}
                            <div className="col-3">
                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-white">
                                        <h3 className="d-inline">Produk Filter</h3>
                                    </div>
                                    <form className="form-group mb-0 mx-2">
                                        {/* <h5>Name :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.name=input}} 
                                        className="form-control my-3 btn-light" placeholder="product" type="text" name="" id=""/> */}
        
                                        {/* <h5>Category :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.kat=input}} 
                                        className="form-control my-3 btn-light" placeholder="category" type="text" name="" kat=""/> */}
        

                                        <h5>Harga :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.min=input}} 
                                        className="form-control btn-light" placeholder="minimum" type="text" name="" id=""/>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.max=input}} 
                                        className="form-control my-3 btn-light" placeholder="maximum" type="text" name="" id=""/>
                                    </form>
                                    {/* <div className="d-inline-block align-bottom text-right">
                                        <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
                                    </div> */}
                                </div>
                                <div className="card mt-2 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-white">
                                        <h3 className="d-inline">Sort by</h3>
                                    </div>
                                    <div className="mx-2">
                                        <button onClick={this.onSortName} className="btn btn-sm btn-block btn-warning">Product Name</button>
                                        {/* <button onClick={this.onSortCategory} className="btn btn-sm btn-block btn-warning">Product Category</button>
                                        <button onClick={this.onSortHarga} className="btn btn-sm btn-block btn-warning">Product Price</button> */}
                                    </div>
                                </div>
                            </div>
        
                        {/* div untuk list */}
                            <div className="col-9 row mt-5 p-0" style={{height:"30px"}}>
                                <div className="col-12 display-10 text-left mb-2 shadow-sm p-2 card ">Produk ke ... dari ...</div>
                                    {this.renderList()}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{BukanHome,IniHome}) (Home);