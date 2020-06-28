import React, { Component } from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, CustomInput} from 'reactstrap';
import './manageadmin.css'
// import { FcClearFilters, FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcNumericalSorting12, FcNumericalSorting21 } from 'react-icons/fc'
//import {FaFilter} from 'react-icons/fa' //khusus buat irzza soalnya react-icons/fc ga ada jadi sementara pake fa filter
import {FaFilter, FaSortAlphaDown, FaSortAlphaDownAlt, FaSortAlphaUp, FaSortNumericDown, FaSortNumericDownAlt, FaSortNumericUp } from 'react-icons/fa' //khusus buat irzza soalnya react-icons/fc ga ada jadi sementara pake fa filter
import { MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
import Axios from 'axios';
import { changetoRupiah } from '../support/changetorupiah';
import { capitalfirst, capitalize } from '../support/sentencecase'
import { APIURL } from '../support/ApiUrl';
import querystring from 'query-string'
import { connect } from 'react-redux'
import { FilterCategory, SetCategory, ClearFilter } from '../redux/actions'
import { Redirect, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


class FilterProduct extends Component {
    state = {
        products: [],
        searchProducts: [],
        sortNama: 0,
        sortHarga: 0,
        page: 1,
        isModaladdOpen: false,
        isModaleditOpen: false,
        sortNama: 0,
        sortHarga: 0,
        indexedit: 0,
        indexdelete: -1,
        addimagefile: undefined,
        addimagefilename: 'pilih-foto',
        editimagefile: undefined,
        editimagefilename: 'edit-foto',
        categories: [],
        discounts:[],
        loading: true
    }

    async componentDidMount() {
        try {
            var obj = querystring.parse(this.props.location.search)
            console.log(obj.page)
            console.log(this.props.match.params.idfilter)

            var res = await Axios.get(`${APIURL}/product/filterprodpage/${this.props.match.params.idfilter}?page=${obj.page}`)
            this.props.FilterCategory(this.props.match.params.idfilter)
            this.props.SetCategory(this.props.match.params.idfilter)
            this.setState({ products: res.data.product, categories: res.data.category, searchProducts: res.data.result, discounts: res.data.discount, page: parseInt(obj.page)})
            console.log(this.state.searchProducts)
            console.log(res.data)
            console.log(this.state.products)
            console.log(this.props.Filter)
        } catch (error) {
            console.log(error)
        }
    }

    async filterOnClick(id) {
        try {
            var res = await Axios.get(`${APIURL}/product/filterprod/${id}`)
            this.props.FilterCategory(id)
            this.props.SetCategory(id)
            this.setState({ products: res.data.product, categories: res.data.category, searchProducts: res.data.product, discounts: res.data.discount, indexedit: 0 })
            setTimeout(function () { window.location.reload() }, 100)
        } catch (error) {
            console.log(error)
        }
    }


    toggleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }
    toggleedit = () => {
        this.setState({ isModaleditOpen: !this.state.isModaleditOpen })
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

    urut = (a, b) => {
        return a.price - b.price
    }
    urutDes = (a, b) => {
        return b.price - a.price
    }

    urutHuruf = (a, b) => {

        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }
    urutHurufDes = (a, b) => {

        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }

    onSortName = () => {
        if (!this.state.sortNama) {
            var hasilFilter = this.state.searchProducts.sort(this.urutHuruf)
            this.setState({ searchProducts: hasilFilter })
            this.setState({ sortNama: 1 })
        } if (this.state.sortNama) {
            var hasilFilter = this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({ searchProducts: hasilFilter })
            this.setState({ sortNama: 0 })
        }
    }

    onSortHarga = () => {
        if (!this.state.sortHarga) {
            var hasilFilter = this.state.searchProducts.sort(this.urut)
            this.setState({ searchProducts: hasilFilter })
            this.setState({ sortHarga: 1 })
        } if (this.state.sortHarga) {
            var hasilFilter = this.state.searchProducts.sort(this.urutDes)
            this.setState({ searchProducts: hasilFilter })
            this.setState({ sortHarga: 0 })
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
        if (this.state.addimagefile && namaadd && authoradd && publishdateadd && publisheradd && languageadd && totalpageadd && stokadd && categoryadd && hargaadd && deskripsiadd && heightadd && widthadd && weightadd &&discountadd) {
            formdata.append('image', this.state.addimagefile)
            formdata.append('data', JSON.stringify(obj))
            Axios.post(`${APIURL}/product/addprod`, formdata, Headers)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ searchProducts: res.data, isModaladdOpen: false, addimagefile: undefined })
                    setTimeout(function () { window.location.reload() }, 100)
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
                            'Buku berhasil dihapus.',
                            'success'
                        ).then((result) => {
                            if (result.value) {
                                if (this.props.Filter.isfilter) {
                                    this.filterOnClick(this.props.Filter.idcategory)
                                    console.log(this.props.Filter)
                                }
                                this.setState({ products: res.data })
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
        if (this.state.editimagefile && publishdateedit && discountedit) {
            formdata.append('image', this.state.editimagefile)
            formdata.append('data', JSON.stringify(obj))
            var id = this.state.searchProducts[this.state.indexedit].idproduct
            console.log(obj, id)
            Axios.put(`${APIURL}/product/editprod/${id}`, formdata, Headers)
                .then((res) => {
                    if (this.props.Filter.isfilter) {
                        this.filterOnClick(this.props.Filter.idcategory)
                        console.log(this.props.Filter)
                    }
                    this.setState({ searchProducts: res.data, isModaleditOpen: false, editimagefile: undefined })
                })
        } else {
            alert('Mohon Lengkapi Data')
        }
    }

    rendercategorytoadd = () => {
        return this.state.categories.map((val, index) => {
            return <option key={index} value={val.idcategory}>{val.name}</option>
        })
    }

    renderdiscounttoadd = () => {
        return this.state.discounts.map((val, index) => {
            return <option key={index} value={val.discount_id}>{val.type}</option>
        })
    }

    onEditClick = (index) => {
        this.setState({ page: this.state.page, indexedit: index, isModaleditOpen: true })
    }

    renderProducts = () => {
        const { searchProducts } = this.state
        return searchProducts.map((val, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{this.state.page > 1 ? (8 * (this.state.page - 1)) + (index + 1) : (index + 1)}</td>
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

    renderPage = () => {
        var a = Math.ceil(this.state.products.length / 8)
        var tesitem = []
        for (let index = 0; index < a; index++) {
            tesitem.push(
                <MDBPageItem key={index} active={(index + 1) === this.state.page} onClick={() => this.setState({ page: index + 1 })}>
                    <MDBPageNav href={`http://localhost:3000/filterprod/${this.props.match.params.idfilter}?page=${index + 1}`} >

                        <span style={{ color: ((index + 1) === this.state.page) ? 'white' : 'grey' }}>{index + 1}</span>

                    </MDBPageNav>
                </MDBPageItem>
            )
        }
        return (
            tesitem
        )
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
                                <input type="number" ref='isbnadd' placeholder='ISBN' className='form-control mt-2' />
                                <input type="number" ref='skuadd' placeholder='SKU' className='form-control mt-2' />
                                <input type="number" ref='heightadd' placeholder='Tinggi Buku (cm)' className='form-control mt-2' />
                                <input type="number" ref='widthadd' placeholder='Lebar Buku (cm)' className='form-control mt-2' />
                                <input type="number" ref='weightadd' placeholder='Berat Buku (kg)' className='form-control mt-2' />
                                <input type="number" ref='totalpageadd' placeholder='Jumlah Halaman' className='form-control mt-2' />
                                <input type="number" ref='stokadd' placeholder='Jumlah Stok' className='form-control mt-2' />
                                <select ref='categoryadd' className='form-control mt-2'>
                                    <option value="" hidden>Pilih category</option>
                                    {this.rendercategorytoadd()}
                                </select>
                                <input type="number" ref='hargaadd' placeholder='Harga' className='form-control mt-2' />
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

                            this.state.products.length ?

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
                                        <input type="number" ref='isbnedit' defaultValue={searchProducts[indexedit].isbn} placeholder='ISBN' className='form-control' />
                                        <div className='modal-label'>SKU</div>
                                        <input type="number" ref='skuedit' defaultValue={searchProducts[indexedit].sku} placeholder='SKU' className='form-control' />
                                        <div className='modal-label'>Tinggi Buku (cm)</div>
                                        <input type="number" ref='heightedit' defaultValue={searchProducts[indexedit].height} placeholder='Tinggi Buku (cm)' className='form-control' />
                                        <div className='modal-label'>Lebar Buku (cm)</div>
                                        <input type="number" ref='widthedit' defaultValue={searchProducts[indexedit].width} placeholder='Lebar Buku (cm)' className='form-control' />
                                        <div className='modal-label'>Berat Buku (kg)</div>
                                        <input type="number" ref='weightedit' defaultValue={searchProducts[indexedit].weight} placeholder='Berat Buku (kg)' className='form-control' />
                                        <div className='modal-label'>Jumlah Halaman</div>
                                        <input type="number" ref='totalpageedit' defaultValue={searchProducts[indexedit].totalpage} placeholder='Jumlah Halaman' className='form-control' />
                                        <div className='modal-label'>Jumlah Stok</div>
                                        <input type="number" ref='stokedit' defaultValue={searchProducts[indexedit].stock} placeholder='Jumlah Stok' className='form-control' />
                                        <div className='modal-label'>Kategori</div>
                                        <select ref='categoryedit' defaultValue={searchProducts[indexedit].idcat} className='form-control'>
                                            <option value="" hidden>Pilih category</option>
                                            {this.rendercategorytoadd()}
                                        </select>
                                        <div className='modal-label'>Harga</div>
                                        <input type="number" ref='hargaedit' defaultValue={searchProducts[indexedit].price} placeholder='Harga' className='form-control' />
                                        <div className='modal-label'>Discount</div>
                                        <select ref='discountedit' defaultValue={searchProducts[indexedit].discount_id} className='form-control'>
                                            <option value="" hidden>Pilih category</option>
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
                            <Link to={'/manageadmin?page=1'}><button className='btn btn-outline-red btn-sm'> <FaFilter size="15" />Clear Filter</button></Link>
                            <Link to={'/filterprod/1?page=1'}><button className={`btn ${this.props.Filter.iskomik ? 'btn-teal' : 'btn-outline-teal'} btn-sm`} onClick={() => this.filterOnClick('1')}>Komik</button></Link>
                            <Link to={'/filterprod/2?page=1'}><button className={`btn ${this.props.Filter.isnovel ? 'btn-primary' : 'btn-outline-primary'} btn-sm`} onClick={() => this.filterOnClick('2')}>Novel</button></Link>
                            <Link to={'/filterprod/3?page=1'}><button className={`btn ${this.props.Filter.isedukasi ? 'btn-danger' : 'btn-outline-danger'} btn-sm`} onClick={() => this.filterOnClick('3')}>Edukasi</button></Link>
                            <Link to={'/filterprod/4?page=1'}><button className={`btn ${this.props.Filter.isanak ? 'btn-secondary' : 'btn-outline-secondary'} btn-sm`} onClick={() => this.filterOnClick('4')}>Anak-Anak</button></Link>
                            <Link to={'/filterprod/5?page=1'}><button className={`btn ${this.props.Filter.isimport ? 'btn-orange' : 'btn-outline-orange'} btn-sm`} onClick={() => this.filterOnClick('5')}>Import</button></Link>
                            <Link to={'/filterdiscprod?page=1'}><button className={`btn ${this.props.Filter.isdiskon ? 'btn-pink' : 'btn-outline-pink'} btn-sm`} onClick={this.filterDiscount}>Diskon</button></Link>
                        </div>
                        <div className='d-flex flex-wrap justify-content-center'>
                            <div style={{ fontSize: 17, lineHeight: 3, color: 'black' }}>Sort By:</div>
                            <button className='btn btn-outline-teal btn-sm' onClick={this.onSortName}>By Name {
                                this.state.sortNama ? <FaSortAlphaDown size={20} /> : <FaSortAlphaUp size={20} />
                            }</button>
                            <button className='btn btn-outline-teal btn-sm' onClick={this.onSortHarga}>By Price {
                                this.state.sortHarga ? <FaSortAlphaUp size={20} /> : <FaSortNumericUp size={20} />
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
                                <MDBPageItem disabled={this.state.page === 1}>
                                    <MDBPageNav className="page-link" href={`http://localhost:3000/filterprod/${this.props.match.params.idfilter}?page=${1}`}>
                                        First
                                            </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem disabled={this.state.page === 1}>
                                    <MDBPageNav className="page-link" aria-label="Previous" href={`http://localhost:3000/filterprod/${this.props.match.params.idfilter}?page=${this.state.page - 1}`}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                                {
                                    this.renderPage()
                                }
                                <MDBPageItem disabled={this.state.page === Math.ceil(this.state.products.length / 8)}>
                                    <MDBPageNav className="page-link" href={`http://localhost:3000/filterprod/${this.props.match.params.idfilter}?page=${this.state.page + 1}`}>
                                        &raquo;
                                            </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem disabled={this.state.page === Math.ceil(this.state.products.length / 8)}>
                                    <MDBPageNav className="page-link" href={`http://localhost:3000/filterprod/${this.props.match.params.idfilter}?page=${Math.ceil(this.state.products.length / 8)}`}>
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
export default connect(MapstatetoProps, { FilterCategory, SetCategory, ClearFilter })(FilterProduct);