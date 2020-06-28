import React, { Component, Fragment } from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, CustomInput } from 'reactstrap';
import './manageadmin.css'
// import { FcClearFilters, FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcNumericalSorting12, FcNumericalSorting21 } from 'react-icons/fc'
import {FaFilter, FaSortAlphaDown, FaSortAlphaDownAlt, FaSortAlphaUp, FaSortNumericDown, FaSortNumericDownAlt, FaSortNumericUp } from 'react-icons/fa' //khusus buat irzza soalnya react-icons/fc ga ada jadi sementara pake fa filter
import { changetoRupiah } from '../support/changetorupiah';
import { capitalfirst, capitalize } from '../support/sentencecase'
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBNavLink } from "mdbreact";
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import querystring from 'query-string'
import { connect } from 'react-redux'
import { FilterCategory, SetCategory, ClearFilter, SortNama } from '../redux/actions'
import { Redirect, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


class ManageAdmin extends Component {
    state = {
        products: [],
        jumlahProducts: 0,
        searchProducts: [],
        sortname: null,
        sortprice: null,
        page: 0,
        isModaladdOpen: false,
        isModaleditOpen: false,
        indexedit: 0,
        indexdelete: -1,
        addimagefile: undefined,
        addimagefilename: 'pilih-foto',
        editimagefile: undefined,
        editimagefilename: 'edit-foto',
        kategori: [],
        discounts: [],
        loading: true,
        kategoriprod: '',
        activecategory: 0,
        inputmin: 0,
        inputmax: 0,
        inputnama: '',
        filterdiskon: 0,
        filterHarga: false,
        filterNama: false
    }

    componentDidMount() {
        Axios.get(`${APIURL}/product/category`)
            .then((res) => {
                console.log(res.data)
                this.setState({ kategori: res.data })
            })
            .catch((err) => {
                console.log(err)

            }).finally(() => {
                this.setState({ loading: false })
            })
        Axios.get(`${APIURL}/product/getprod`)
            .then((resallprod) => {
                console.log(resallprod.data)
                this.setState({
                    discounts: resallprod.data.discount
                    // page: parseInt(obj.page)
                })
                // this.props.SortNama(true)
                console.log(this.props.Filter)
            }).catch((errallprod) => {
                console.log(errallprod)
            }).finally(() => {
                this.setState({ loading: false })
            })
        this.getData()
    }

    getData = (min, max, nama, cat, disc, sortname, sortprice) => {
        Axios.get(min || max ? `${APIURL}/product/totalproduct?inputMin=${min}&inputMax=${max}` : nama ? `${APIURL}/product/totalproduct?inputNama=${nama}` : cat ? `${APIURL}/product/totalproduct?cat=${cat}` : disc ? `${APIURL}/product/totalproduct?disc=${disc}` : `${APIURL}/product/totalproduct`, {}
        ).then((res) => {
            this.setState({ jumlahProducts: res.data.total })
            Axios.get(
                sortname!==null || sortprice!==null ?
                    min || max ? `${APIURL}/product/getproductadmin?inputMin=${min}&inputMax=${max}&page=${this.state.page}&sortname=${sortname}&sortprice=${sortprice}` : nama ? `${APIURL}/product/getproductadmin?inputNama=${nama}&page=${this.state.page}&sortname=${sortname}&sortprice=${sortprice}` :
                        cat ? `${APIURL}/product/getproductadmin?cat=${cat}&page=${this.state.page}&sortname=${sortname}&sortprice=${sortprice}` : disc ? `${APIURL}/product/getproductadmin?disc=${disc}&page=${this.state.page}&sortname=${sortname}&sortprice=${sortprice}` :
                            `${APIURL}/product/getproductadmin?page=${this.state.page}&sortname=${sortname}&sortprice=${sortprice}`
                    :
                    min || max ? `${APIURL}/product/getproductadmin?inputMin=${min}&inputMax=${max}&page=${this.state.page}` : nama ? `${APIURL}/product/getproductadmin?inputNama=${nama}&page=${this.state.page}` :
                        cat ? `${APIURL}/product/getproductadmin?cat=${cat}&page=${this.state.page}` : disc ? `${APIURL}/product/getproductadmin?disc=${disc}&page=${this.state.page}` :
                            `${APIURL}/product/getproductadmin?page=${this.state.page}`
            ).then((res1) => {
                console.log(res1.data, 'line 92')
                this.setState({ searchProducts: res1.data, indexedit: 0 })
                this.rendercategorytoadd()
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.setState({ loading: false })
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    toggleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }
    toggleedit = () => {
        this.setState({ isModaleditOpen: !this.state.isModaleditOpen })
    }

    onClearFilterClick = () => {
        // this.min.value = ''
        // this.max.value = ''
        // this.nama.value = ''
        this.setState({
            sortname: null,
            sortprice: null,
            filterdiskon: 0,
            activecategory: 0,
            kategoriprod:'',
            inputmin: 0,
            inputmax: 0,
            inputnama: '',
            page: 0,
            filterHarga: false,
            filterNama: false
        })
        this.getData()
        this.props.ClearFilter()
    }

    onAddimagefilechange = (event) => {
        var file = event.target.files[0]
        console.log(event.target.files[0])
        if (event.target.files[0]) {
            this.setState({ addimagefile: event.target.files[0], addimagefilename: file.name })
        } else {
            this.setState({ addimagefile: undefined, addimagefilename: 'pilih-foto' })
        }
    }

    onEditimagefilechange = (event) => {
        var file = event.target.files[0]
        console.log(event.target.files[0])
        if (event.target.files[0]) {
            this.setState({
                editimagefile: event.target.files[0],
                editimagefilename: file.name
            })
        } else {
            this.setState({ editimagefile: undefined, editimagefilename: 'edit-foto' })
        }
    }

    onCategoryClick = (e) => {
        var filter = e.target.value
        this.setState({ page: 0, activecategory: filter, kategoriprod: filter })
        this.renderKategori()
        console.log(filter)
        this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, filter, null, this.state.sortname, this.state.sortprice)

    }

    onDiscountClick = () => {
        this.setState({
            filterdiskon: 1,
            activecategory: 0,
            kategoriprod:'',
            inputmin: 0,
            inputmax: 0,
            inputnama: '',
            page: 0,
            filterHarga: false,
            filterNama: false
        })
        this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, null, 1, this.state.sortname, this.state.sortprice)
    }

    onHargaClick = () => {
        this.setState({
            sortname: null,
            sortprice: null,
            filterdiskon: 0,
            activecategory: 0,
            kategoriprod:'',
            inputmin: 0,
            inputmax: 0,
            inputnama: '',
            page: 0,
            filterHarga: true,
            filterNama: false
        })
        this.getData()
    }

    onNamaClick = () => {
        this.setState({
            sortname: null,
            sortprice: null,
            filterdiskon: 0,
            activecategory: 0,
            kategoriprod:'',
            inputmin: 0,
            inputmax: 0,
            inputnama: '',
            page: 0,
            filterHarga: false,
            filterNama: true
        })
        this.getData()
    }

    onSearchClick = () => {
        // let inputMin=this.min.value
        let inputMin = parseInt(this.min.value)
        let inputMax = parseInt(this.max.value)

        // var search = {
        //     inputMin:inputMin,
        //     inputMax:inputMax
        // }
        console.log(inputMin)
        // console.log(search)
        this.setState({ inputmin: inputMin, inputmax: inputMax,page:0 })


        this.getData(inputMin, inputMax, this.state.inputnama, this.state.kategoriprod, this.state.filterdiskon, this.state.sortname, this.state.sortprice)
    }

    onSearchNamaClick = () => {
        // let inputMin=this.min.value
        let inputNama = this.nama.value

        // var search = {
        //     inputMin:inputMin,
        //     inputMax:inputMax
        // }
        console.log(inputNama)
        // console.log(search)
        this.setState({ inputnama: inputNama, page:0 })


        this.getData(this.state.inputmin, this.state.inputmax, inputNama, this.state.kategoriprod, this.state.filterdiskon, this.state.sortname, this.state.sortprice)
    }

    onSortName = () => {
        // this.setState({sortname:!this.state.sortname})
        if (!this.state.sortname) {
            this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.activecategory, this.state.filterdiskon, 1, null)
            // var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            // this.setState({searchProducts:hasilFilter})
            this.setState({ sortname: 1 })

        } else {
            this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.activecategory, this.state.filterdiskon, 0, null)

            // var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            // this.setState({searchProducts:hasilFilter})
            this.setState({ sortname: 0 })
            // this.getData (null, null, this.state.sortname, null)

        }
        // this.getData (null, null, this.state.sortname, null)
        console.log(this.state.sortname)
    }

    onSortHarga = () => {
        if (!this.state.sortprice) {
            this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.kategoriprod, this.state.filterdiskon, null, 1)
            // var hasilFilter=this.state.searchProducts.sort(this.urut)
            // this.setState({searchProducts:hasilFilter})
            this.setState({ sortprice: 1 })
            // console.log(this.state.sortprice)
        } if (this.state.sortprice) {
            this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.kategoriprod, this.state.filterdiskon, null, 0)
            // var hasilFilter=this.state.searchProducts.sort(this.urutDes)
            // this.setState({searchProducts:hasilFilter})
            this.setState({ sortprice: 0 })
            // this.getData (null, null, this.state.sortprice, null)
        }
    }


    onSaveaddDataClick = () => {
        var formdata = new FormData()
        var namaadd = this.refs.namaadd.value.toString().toLowerCase()
        var authoradd = this.refs.authoradd.value.toString().toLowerCase()
        var publishdateadd = this.refs.publishdateadd.value
        var publisheradd = this.refs.publisheradd.value.toString().toLowerCase()
        var languageadd = this.refs.languageadd.value.toString().toLowerCase()
        var totalpageadd = parseInt(this.refs.totalpageadd.value)
        var stokadd = parseInt(this.refs.stokadd.value)
        var categoryadd = parseInt(this.refs.categoryadd.value)
        var discountadd = parseInt(this.refs.discountadd.value)
        var hargaadd = parseInt(this.refs.hargaadd.value)
        var isbnadd = parseInt(this.refs.isbnadd.value)
        var skuadd = parseInt(this.refs.skuadd.value)
        var heightadd = parseFloat(this.refs.heightadd.value)
        var widthadd = parseFloat(this.refs.widthadd.value)
        var weightadd = parseFloat(this.refs.weightadd.value)
        var deskripsiadd = this.refs.deskripsiadd.value
        const obj = {
            name: namaadd,
            author: authoradd,
            publishat: publishdateadd,
            publisher: publisheradd,
            language: languageadd,
            totalpage: totalpageadd,
            stock: stokadd,
            idcategory: categoryadd,
            discount_id: discountadd,
            price: hargaadd,
            description: deskripsiadd,
            isbn: isbnadd,
            sku: skuadd,
            height: heightadd,
            width: widthadd,
            weight: weightadd,
        }
        var token = this.props.User.token
        var Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        }
        if (this.state.addimagefile && namaadd && authoradd && publishdateadd && publisheradd && languageadd && totalpageadd && stokadd && categoryadd && hargaadd && deskripsiadd && heightadd && widthadd && weightadd) {
            formdata.append('image', this.state.addimagefile)
            formdata.append('data', JSON.stringify(obj))
            // console.log(obj)
            Axios.post(`${APIURL}/product/addprod`, formdata, Headers)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ searchProducts: res.data, isModaladdOpen: false, addimagefile: undefined })
                    // setTimeout(function () { window.location.reload() }, 100)
                    this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.activecategory,this.state.filterdiskon, this.state.sortname, this.state.sortprice)
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Mohon Lengkapi Data')
        }
    }

    deleteconfirm = (index, id) => {
        MySwal.fire({
            title: `Yakin ingin hapus buku: ${capitalize(this.state.searchProducts[index].name)} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Axios.delete(`${APIURL}/product/deleteprod/${id}`)
                    .then((res) => {
                        MySwal.fire(
                            'Deleted!',
                            'Berhasil hapus buku.',
                            'success'
                        ).then((result) => {
                            if (result.value) {
                                this.setState({ searchProducts: res.data })
                                this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.activecategory,this.state.filterdiskon, this.state.sortname, this.state.sortprice)
                                // setTimeout(function () { window.location.reload() }, 100)
                            }
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

    onsaveEditClick = () => {
        var formdata = new FormData()
        var namaedit = this.refs.namaedit.value
        var authoredit = this.refs.authoredit.value
        var publishdateedit = this.refs.publishdateedit.value
        var publisheredit = this.refs.publisheredit.value
        var languageedit = this.refs.languageedit.value
        var totalpageedit = this.refs.totalpageedit.value
        var stokedit = parseInt(this.refs.stokedit.value)
        var categoryedit = parseInt(this.refs.categoryedit.value)
        var discountedit = parseInt(this.refs.discountedit.value)
        var hargaedit = parseInt(this.refs.hargaedit.value)
        var isbnedit = parseInt(this.refs.isbnedit.value)
        var skuedit = parseInt(this.refs.skuedit.value)
        var heightedit = parseFloat(this.refs.heightedit.value)
        var widthedit = parseFloat(this.refs.widthedit.value)
        var weightedit = parseFloat(this.refs.weightedit.value)
        var deskripsiedit = this.refs.deskripsiedit.value
        var obj = {
            name: namaedit,
            author: authoredit,
            publishat: publishdateedit,
            publisher: publisheredit,
            language: languageedit,
            totalpage: totalpageedit,
            stock: stokedit,
            idcategory: categoryedit,
            discount_id: discountedit,
            price: hargaedit,
            description: deskripsiedit,
            isbn: isbnedit,
            sku: skuedit,
            height: heightedit,
            width: widthedit,
            weight: weightedit,
        }
        var token = this.props.User.token
        var Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        }
        if (this.state.editimagefile && publishdateedit) {

            formdata.append('image', this.state.editimagefile)
            formdata.append('data', JSON.stringify(obj))
            var id = this.state.searchProducts[this.state.indexedit].idproduct
            console.log(obj, id)
            Axios.put(`${APIURL}/product/editprod/${id}`, formdata, Headers)
                .then((res) => {
                    this.setState({ searchProducts: res.data, isModaleditOpen: false, editimagefile: undefined })
                    this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.activecategory, this.state.filterdiskon, this.state.sortname, this.state.sortprice)
                    // setTimeout(function () { window.location.reload() }, 100)
                })
        } else {
            alert('Mohon Lengkapi Data')
        }
    }

    renderKategori = () => {
        return this.state.kategori.map((val, index) => {
            return (
                <Button className={this.state.activecategory===val.idcategory ? 'active' : null}
                    value={val.idcategory}
                    onClick={this.onCategoryClick}
                    color="warning"
                    size='sm'
                    outline
                    // active={parseInt(this.state.activecategory)===val.idcategory}
                >
                    {val.name}
                </Button>

            )
        })
    }

    rendercategorytoadd = () => {
        return this.state.kategori.map((val, index) => {
            return <option key={index} value={val.idcategory}>{val.name}</option>
        })
    }

    renderdiscounttoadd = () => {
        return this.state.discounts.map((val, index) => {
            return <option key={index} value={val.discount_id}>{val.type}</option>
        })
    }

    onEditClick = (index) => {
        this.setState({ indexedit: index, isModaleditOpen: true })
    }

    renderProducts = () => {
        const { searchProducts } = this.state
        return searchProducts.map((val, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{this.state.page > 1 ? this.state.page + index + 1 : (index + 1)}</td>
                    {/* <td scope="row">{index + 1}</td> */}
                    <td>{capitalize(val.name)}</td>
                    <td>{capitalize(val.author)}</td>
                    <td>{(new Date(val.publishat)).toLocaleDateString()}</td>
                    <td>{capitalize(val.publisher)}</td>
                    <td>{capitalize(val.language)}</td>
                    <td>{changetoRupiah(val.price)}</td>
                    <td>
                        <button className='rounded-pill btn btn-warning btn-sm' onClick={() => this.onEditClick(index)} >Edit</button>
                        <button className='rounded-pill btn btn-danger btn-sm' onClick={() => this.deleteconfirm(index, val.idproduct)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    getPage = (pagination) => {
        this.setState({ page: pagination * 8, loading: true }, function () {
            this.getData(this.state.inputmin, this.state.inputmax, this.state.inputnama, this.state.activecategory, this.state.filterdiskon, this.state.sortname, this.state.sortprice)
        })
    }

    renderPage = () => {
        if (this.state.loading) {

        } else {
            var totalpage = Math.ceil(this.state.jumlahProducts / 8)

            var pagination = []

            for (let index = 0; index < totalpage; index++) {
                pagination.push(
                    <MDBPageItem key={index} active={index === this.state.page / 8} onClick={() => this.getPage(index)}>
                        <Link to={`/manageadmin?page=${index + 1}`}>
                            <MDBPageNav >
                                <span style={{ color: ((index) === this.state.page / 8) ? 'white' : 'grey' }}>{index + 1}</span>
                            </MDBPageNav>
                        </Link>
                    </MDBPageItem>
                )
                // console.log(tesitem)
            }

            return (
                pagination
            )
            // const element = array[index];            
        }
    }

    render() {
        const { indexedit, searchProducts } = this.state
        if (this.props.User.role === 2) {
            return (
                <div className='manageadmin-container'>
                    <div className="header-table">
                        <Modal isOpen={this.state.isModaladdOpen} toggle={this.toggleadd}>
                            <ModalHeader toggle={this.toggleadd}>Tambah Buku</ModalHeader>
                            <ModalBody>
                                <input type="text" ref='namaadd' placeholder='Judul Buku' className='form-control mt-2' />
                                <input type='file' placeholder='Pilih Gambar' onChange={this.onAddimagefilechange} className='form-control mt-2' />
                                {
                                    this.state.addimagefile ?
                                        <img src={URL.createObjectURL(this.state.addimagefile)} alt="" width='150' height='200px' />
                                        :
                                        null
                                }
                                <input type="text" ref='authoradd' placeholder='Author' className='form-control mt-2' />
                                <input type="date" ref='publishdateadd' placeholder='Tanggal Terbit' className='form-control mt-2' />
                                <input type="text" ref='publisheradd' placeholder='Penerbit' className='form-control mt-2' />
                                <input type="text" ref='languageadd' placeholder='Bahasa' className='form-control mt-2' />
                                <input type="number" min="1" ref='isbnadd' placeholder='ISBN' className='form-control mt-2' />
                                <input type="number" min="1" ref='skuadd' placeholder='SKU' className='form-control mt-2' />
                                <input type="number" min="1" ref='heightadd' placeholder='Tinggi Buku (cm)' className='form-control mt-2' />
                                <input type="number" min="1" ref='widthadd' placeholder='Lebar Buku (cm)' className='form-control mt-2' />
                                <input type="number" min="0.001" ref='weightadd' placeholder='Berat Buku (kg)' className='form-control mt-2' />
                                <input type="number" min="1" ref='totalpageadd' placeholder='Jumlah Halaman' className='form-control mt-2' />
                                <input type="number" min="1" ref='stokadd' placeholder='Jumlah Stok' className='form-control mt-2' />
                                <select ref='categoryadd' className='form-control mt-2'>
                                    <option value="" hidden>Pilih category</option>
                                    {this.rendercategorytoadd()}
                                </select>
                                <input type="number" min="1" ref='hargaadd' placeholder='Harga' className='form-control mt-2' />
                                <select ref='discountadd' className='form-control mt-2'>
                                    <option value="" hidden>Pilih tipe discount</option>
                                    {this.renderdiscounttoadd()}
                                </select>
                                <textarea ref="deskripsiadd" className='form-control mt-2' placeholder='Deskripsi' cols="20" rows="5"></textarea>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.onSaveaddDataClick}>Save</Button>
                                <Button color="secondary" onClick={this.toggleadd}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {

                            this.state.searchProducts.length ?

                                <Modal isOpen={this.state.isModaleditOpen} toggle={this.toggleedit}>
                                    <ModalHeader toggle={this.toggleedit}>Edit Buku: {capitalize(searchProducts[indexedit].name)}</ModalHeader>
                                    <ModalBody>
                                        <div className='modal-label'>Judul Buku</div>
                                        <input type="text" ref='namaedit' defaultValue={searchProducts[indexedit].name} className='form-control' />
                                        <div className='modal-label'>Cover Buku</div>
                                        <td><CustomInput label={this.state.editimagefilename} id="edit-foto" type="file" onChange={this.onEditimagefilechange} /></td>
                                        {/* <input type="file" onChange={this.onEditimagefilechange} placeholder='Url Image' className='form-control' />
                                        {
                                            this.state.editimagefile ?
                                                <img src={URL.createObjectURL(this.state.editimagefile)} alt="" width='150' height='200px' />
                                                :
                                                null
                                        } */}
                                        <div className='modal-label'>Author</div>
                                        <input type="text" ref='authoredit' defaultValue={searchProducts[indexedit].author} placeholder='Author' className='form-control' />
                                        <div className='modal-label'>Tanggal Terbit</div>
                                        <input type="date" ref='publishdateedit' defaultValue={searchProducts[indexedit].publishat} placeholder='Tanggal Terbit' className='form-control' />
                                        <div className='modal-label'>Penerbit</div>
                                        <input type="text" ref='publisheredit' defaultValue={searchProducts[indexedit].publisher} placeholder='Penerbit' className='form-control' />
                                        <div className='modal-label'>Bahasa</div>
                                        <input type="text" ref='languageedit' defaultValue={searchProducts[indexedit].language} placeholder='Bahasa' className='form-control' />
                                        <div className='modal-label'>ISBN</div>
                                        <input type="number" min="1" ref='isbnedit' defaultValue={searchProducts[indexedit].isbn} placeholder='ISBN' className='form-control' />
                                        <div className='modal-label'>SKU</div>
                                        <input type="number" min="1" ref='skuedit' defaultValue={searchProducts[indexedit].sku} placeholder='SKU' className='form-control' />
                                        <div className='modal-label'>Tinggi Buku (cm)</div>
                                        <input type="number" min="1" ref='heightedit' defaultValue={searchProducts[indexedit].height} placeholder='Tinggi Buku (cm)' className='form-control' />
                                        <div className='modal-label'>Lebar Buku (cm)</div>
                                        <input type="number" min="1" ref='widthedit' defaultValue={searchProducts[indexedit].width} placeholder='Lebar Buku (cm)' className='form-control' />
                                        <div className='modal-label'>Berat Buku (kg)</div>
                                        <input type="number" min="0.001" ref='weightedit' defaultValue={searchProducts[indexedit].weight} placeholder='Berat Buku (kg)' className='form-control' />
                                        <div className='modal-label'>Jumlah Halaman</div>
                                        <input type="number" min="1" ref='totalpageedit' defaultValue={searchProducts[indexedit].totalpage} placeholder='Jumlah Halaman' className='form-control' />
                                        <div className='modal-label'>Jumlah Stok</div>
                                        <input type="number" min="1" ref='stokedit' defaultValue={searchProducts[indexedit].stock} placeholder='Jumlah Stok' className='form-control' />
                                        <div className='modal-label'>Kategori</div>
                                        <select ref='categoryedit' defaultValue={searchProducts[indexedit].idcat} className='form-control'>
                                            <option value="" hidden>Pilih category</option>
                                            {this.rendercategorytoadd()}
                                        </select>
                                        <div className='modal-label'>Harga</div>
                                        <input type="number" min="1" ref='hargaedit' defaultValue={searchProducts[indexedit].price} placeholder='Harga' className='form-control' />
                                        <div className='modal-label'>Discount</div>
                                        <select ref='discountedit' defaultValue={searchProducts[indexedit].discount_id} className='form-control'>
                                            <option value="" hidden>Pilih tipe discount</option>
                                            {this.renderdiscounttoadd()}
                                        </select>
                                        <div className='modal-label'>Deskripsi Buku</div>
                                        <textarea ref="deskripsiedit" defaultValue={searchProducts[indexedit].description} className='form-control' placeholder='Deskripsi' cols="20" rows="5"></textarea>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.onsaveEditClick}>Save</Button>
                                        <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                                :
                                null
                        }
                        <div className='d-flex flex-wrap justify-content-center'>
                            <div style={{ fontSize: 17, lineHeight: 3, color: 'black' }}>Category:</div>
                            <button className='btn btn-outline-red btn-sm' onClick={this.onClearFilterClick}><FaFilter size="15" />Clear Filter</button>
                            {this.state.filterHarga || this.state.filterNama || this.state.filterdiskon ? null : this.renderKategori()
                            }
                            
                            {this.state.filterHarga || this.state.filterNama  ? null : this.state.filterdiskon ? <button disabled className='btn btn-warning btn-sm'>Diskon</button> : <button onClick={this.onDiscountClick} className='btn btn-warning btn-sm'>Diskon</button>}
                            {/* {this.state.filterHarga ? <button className='btn btn-warning btn-sm'>Harga</button> : <button className='btn btn-warning btn-sm' onClick={this.onHargaClick}>Harga</button>}
                            {this.state.filterNama ? <button className='btn btn-warning btn-sm'>Nama Buku</button> : <button className='btn btn-warning btn-sm' onClick={this.onNamaClick}>Nama Buku</button>} */}
                            {this.state.filterHarga || this.state.filterNama || this.state.filterdiskon  ? null :
                                <Fragment>
                                    {/* <button onClick={this.onDiscountClick} className='btn btn-warning btn-sm'>Diskon</button> */}
                                    <button className='btn btn-warning btn-sm' onClick={this.onHargaClick}>Harga</button>
                                    <button className='btn btn-warning btn-sm' onClick={this.onNamaClick}>Nama Buku</button>
                                </Fragment>
                            }

                        </div>

                        <div style={{ fontSize: 17, lineHeight: 3, color: 'black' }}
                            className="d-flex flex-wrap justify-content-center">
                            {
                                this.state.filterHarga ?
                                    <form className="form-group mb-0 mx-2">
                                        <h5>Input Harga :</h5>
                                        <input onChange={this.onSearchClick}
                                            ref={(input) => { this.min = input }}
                                            className="form-control btn-light" placeholder="minimum" type="text" name="" id="" />
                                        <input onChange={this.onSearchClick}
                                            ref={(input) => { this.max = input }}
                                            className="form-control my-3 btn-light" placeholder="maximum" type="text" name="" id="" />
                                    </form>
                                    :
                                    this.state.filterNama ?
                                        <form className="form-group mb-0 mx-2">
                                            <h5>Input Nama Buku :</h5>
                                            <input onChange={this.onSearchNamaClick}
                                                ref={(input) => { this.nama = input }}
                                                className="form-control btn-light" placeholder="Nama Buku" type="text" name="" id="" />
                                        </form>
                                        :
                                        null
                            }
                        </div>
                        <div className='d-flex flex-wrap justify-content-center'>
                            <div style={{ fontSize: 17, lineHeight: 3, color: 'black' }}>Sort By:</div>
                            <button className='btn btn-outline-teal btn-sm' onClick={this.onSortName}>By Name {
                                !this.state.sortNama ? <FaSortAlphaUp size={20} /> : <FaSortAlphaDown size={20} />
                            }</button>
                            <button className='btn btn-outline-teal btn-sm' onClick={this.onSortHarga}>By Price {
                                !this.state.sortHarga ? <FaSortNumericUp size={20} /> : <FaSortNumericDown size={20} />
                            }</button>
                        </div>
                        <Table style={{ textAlign: 'center', marginTop: '10px' }} striped responsive hover>
                            <thead >
                                <tr>
                                    <th>No.</th>
                                    <th>Judul</th>
                                    <th>Author</th>
                                    <th>Tanggal Terbit</th>
                                    <th>Penerbit</th>
                                    <th>Bahasa</th>
                                    <th>Harga</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProducts()}
                            </tbody>
                            <button className='rounded-pill btn btn-primary btn-sm' onClick={this.toggleadd}>Tambah Buku</button>
                        </Table>
                        <div className='d-flex justify-content-center'>
                            <MDBPagination circle>
                                <MDBPageItem disabled={this.state.page === 0}>
                                    <MDBPageNav className="page-link" onClick={() => this.getPage(0)}>
                                        First
                                            </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem disabled={this.state.page === 0}>
                                    <MDBPageNav className="page-link" aria-label="Previous" onClick={() => this.getPage((this.state.page / 8) - 1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                                {
                                    this.renderPage()
                                }
                                <MDBPageItem disabled={(this.state.page / 8 + 1) === Math.ceil(this.state.jumlahProducts / 8)}>
                                    <MDBPageNav className="page-link" onClick={() => this.getPage((this.state.page / 8) + 1)}>
                                        &raquo;
                                            </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem disabled={this.state.page === Math.ceil(this.state.jumlahProducts / 8)}>
                                    <MDBPageNav className="page-link" onClick={() => this.getPage(Math.ceil(this.state.jumlahProducts / 8 - 1))}>
                                        Last
                                            </MDBPageNav>
                                </MDBPageItem>
                            </MDBPagination>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Redirect to='/' />
        }
    }
}

const MapstatetoProps = (state) => {
    return {
        User: state.Auth,
        Filter: state.Filter
    }
}
export default connect(MapstatetoProps, { FilterCategory, SetCategory, ClearFilter, SortNama })(ManageAdmin);