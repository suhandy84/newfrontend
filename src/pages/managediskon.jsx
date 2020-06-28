import React, { Component } from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, CustomInput } from 'reactstrap';
import './manageadmin.css'
// import { FcClearFilters, FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcNumericalSorting12, FcNumericalSorting21 } from 'react-icons/fc'
//import {FaFilter} from 'react-icons/fa' //khusus buat irzza soalnya react-icons/fc ga ada jadi sementara pake fa filter
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
        diskon: [],
        jumlahProducts: 0,
        searchProducts: [],
        sortNama: 0,
        sortHarga: 0,
        page: 0,
        isModaladdOpen: false,
        isModaleditOpen: false,
        // sortNama: false,
        // sortHarga: 0,
        indexedit: 0,
        indexdelete: -1,
        addimagefile: undefined,
        addimagefilename: 'pilih-foto',
        editimagefile: undefined,
        editimagefilename: 'edit-foto',
        categories: [],
        loading: true
    }

    async componentDidMount() {
        try {
            var res = await Axios.get(`${APIURL}/discount/getdiscount`)
            console.log(res.data)
            this.setState({ diskon: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    // componentDidMount(sortname) {
    //     // var obj = querystring.parse(this.props.location.search)
    //     // console.log(obj.page)
    //     // console.log(obj.sortname)
    //     // this.props.ClearFilter()
    //     console.log(this.props.Filter)
    //     Axios.get(`${APIURL}/product/gettotalproduct`, {}
    //     ).then((resjumlah) => {
    //         this.setState({ jumlahProducts: resjumlah.data.total })
    //         Axios.get(`${APIURL}/product/getproduct?sortname=${sortname}&page=${this.state.page}`)
    //             .then((res) => {
    //                 console.log(res.data)
    //                 Axios.get(`${APIURL}/product/getprod`)
    //                     .then((resallprod) => {
    //                         console.log(resallprod.data)
    //                         this.setState({
    //                             categories: resallprod.data.category, products: resallprod.data.product,
    //                             searchProducts: res.data,
    //                             // page: parseInt(obj.page)
    //                         })
    //                         // this.props.SortNama(true)
    //                         console.log(this.props.Filter)
    //                     }).catch((errallprod) => {
    //                         console.log(errallprod)
    //                     }).finally(() => {
    //                         this.setState({ loading: false })
    //                     })
    //             }).catch((err) => {
    //                 console.log(err)
    //             }).finally(() => {
    //                 this.setState({ loading: false })
    //             })
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    toggleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }
    toggleedit = () => {
        this.setState({ isModaleditOpen: !this.state.isModaleditOpen })
    }

    // onClearFilterClick = () => {
    //     this.componentDidMount()
    //     this.props.ClearFilter()
    // }

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

    // urut = (a, b) => {
    //     return a.price - b.price
    // }
    // urutDes = (a, b) => {
    //     return b.price - a.price
    // }


    // onSortName = () => {
    //     if (!this.state.sortNama) {
    //         this.componentDidMount(1)
    //         // this.props.SortNama(true)
    //         // this.setState({ searchProducts: this.componentDidMount(2), indexedit:0 })
    //         this.setState({ sortNama: 1 })
    //     } if (this.state.sortNama) {
    //         this.componentDidMount(2)
    //         // this.props.SortNama(false)
    //         // this.setState({ searchProducts: this.componentDidMount(1), indexedit:0 })

    //         // this.props.SortNama(true)
    //         // this.setState({ searchProducts: this.componentDidMount(2), indexedit:0 })
    //         this.setState({ sortNama: 0 })
    //     }
    // }

    // onSortHarga = () => {
    //     if (!this.state.sortHarga) {
    //         var hasilFilter = this.state.searchProducts.sort(this.urut)
    //         this.setState({ searchProducts: hasilFilter })
    //         this.setState({ sortHarga: 1 })
    //     } if (this.state.sortHarga) {
    //         var hasilFilter = this.state.searchProducts.sort(this.urutDes)
    //         this.setState({ searchProducts: hasilFilter })
    //         this.setState({ sortHarga: 0 })
    //     }
    // }

    onSaveaddDataClick = () => {
        var formdata = new FormData()
        var typeadd = this.refs.typeadd.value.toString().toLowerCase()
        var discountrateadd = parseInt(this.refs.discountrateadd.value)
        var startdateadd = this.refs.startdateadd.value
        var expireddateadd = this.refs.expireddateadd.value
        const obj = {
            type: typeadd,
            discount_rate: discountrateadd,
            start_date: startdateadd,
            expired_date: expireddateadd
        }
        var token = this.props.User.token
        var Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        }
        if (this.state.addimagefile && typeadd && discountrateadd && startdateadd && expireddateadd) {
            formdata.append('image', this.state.addimagefile)
            formdata.append('data', JSON.stringify(obj))
            // console.log(obj)
            Axios.post(`${APIURL}/discount/adddiscount`, formdata, Headers)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ diskon: res.data, isModaladdOpen: false, addimagefile: undefined })
                    // setTimeout(function () { window.location.reload() }, 100)
                    // this.componentDidMount(this.state.sortNama)
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Mohon Lengkapi Data')
        }
    }

    deleteconfirm = (index, id) => {
        MySwal.fire({
            title: `Yakin ingin hapus tipe diskon: ${capitalize(this.state.diskon[index].type)} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Axios.delete(`${APIURL}/discount/deletediscount/${id}`)
                    .then((res) => {
                        MySwal.fire(
                            'Deleted!',
                            'Berhasil hapus tipe diskon.',
                            'success'
                        ).then((result) => {
                            if (result.value) {
                                this.setState({ diskon: res.data })
                                // this.componentDidMount(this.state.sortNama)
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
        var typeedit = this.refs.typeedit.value.toString().toLowerCase()
        var discountrateedit = parseInt(this.refs.discountrateedit.value)
        var startdateedit = this.refs.startdateedit.value
        var expireddateedit = this.refs.expireddateedit.value
        var obj = {
            type: typeedit,
            discount_rate: discountrateedit,
            start_date: startdateedit,
            expired_date: expireddateedit
        }
        var token = this.props.User.token
        var Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        }
        if (this.state.editimagefile && startdateedit && expireddateedit) {
            formdata.append('image', this.state.editimagefile)
            formdata.append('data', JSON.stringify(obj))
            var id = this.state.diskon[this.state.indexedit].discount_id
            console.log(obj, id)
            Axios.put(`${APIURL}/discount/editdiscount/${id}`, formdata, Headers)
                .then((res) => {
                    this.setState({ diskon: res.data, isModaleditOpen: false, editimagefile: undefined })
                    // this.componentDidMount(this.state.sortNama)
                    // setTimeout(function () { window.location.reload() }, 100)
                })
        } else {
            alert('Mohon Lengkapi Data')
        }
    }

    // rendercategorytoadd = () => {
    //     return this.state.categories.map((val, index) => {
    //         return <option key={index} value={val.idcategory}>{val.name}</option>
    //     })
    // }

    onEditClick = (index) => {
        this.setState({ indexedit: index, isModaleditOpen: true })
    }

    renderDiscounts = () => {
        const { diskon } = this.state
        return diskon.map((val, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{this.state.page > 1 ? this.state.page + index + 1 : (index + 1)}</td>
                    {/* <td scope="row">{index + 1}</td> */}
                    <td>{capitalize(val.type)}</td>
                    <td>{val.discount_rate}</td>
                    <td>{(new Date(val.start_date)).toLocaleDateString()}</td>
                    <td>{(new Date(val.expired_date)).toLocaleDateString()}</td>
                    <td>
                        <button className='rounded-pill btn btn-warning btn-sm' onClick={() => this.onEditClick(index)} >Edit</button>
                        <button className='rounded-pill btn btn-danger btn-sm' onClick={() => this.deleteconfirm(index, val.discount_id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    // renderPage = () => {
    //     if (this.state.loading) {

    //     } else {
    //         if (this.props.Filter.sortnama) {
    //             var a = Math.ceil(this.state.products.length / 8)
    //         var tesitem = []
    //         console.log(this.props.Filter.sortnama)
    //         for (let index = 0; index < a; index++) {
    //             tesitem.push(
    //                 <MDBPageItem key={index} active={(index + 1) === this.state.page} onClick={() => this.setState({ page: index + 1 })}>
    //                     <MDBPageNav href={`http://localhost:3000/manageadmin?page=${index + 1}&sortname=${1}`} >

    //                         <span style={{ color: ((index + 1) === this.state.page) ? 'white' : 'grey' }}>{index + 1}</span>

    //                     </MDBPageNav>
    //                 </MDBPageItem>
    //             )
    //         }
    //         } else {

    //             var a = Math.ceil(this.state.products.length / 8)
    //             var tesitem = []
    //             // console.log(this.state.page)
    //             for (let index = 0; index < a; index++) {
    //                 tesitem.push(
    //                     <MDBPageItem key={index} active={(index + 1) === this.state.page} onClick={() => this.setState({ page: index + 1 })}>
    //                         <MDBPageNav href={`http://localhost:3000/manageadmin?page=${index + 1}`} >

    //                             <span style={{ color: ((index + 1) === this.state.page) ? 'white' : 'grey' }}>{index + 1}</span>

    //                         </MDBPageNav>
    //                     </MDBPageItem>
    //                 )
    //             }
    //         }
    //     }
    //     return (
    //         tesitem
    //     )
    // }

    // getPage = (pagination) => {
    //     this.setState({ page: pagination * 8, loading: true }, function () {
    //         this.componentDidMount(this.state.sortNama)
    //     })
    // }

    // renderPage = () => {
    //     if (this.state.loading) {

    //     } else {
    //         var totalpage = Math.ceil(this.state.jumlahProducts / 8)

    //         var pagination = []

    //         for (let index = 0; index < totalpage; index++) {
    //             pagination.push(
    //                 <MDBPageItem key={index} active={index === this.state.page / 8} onClick={() => this.getPage(index)}>
    //                     <Link to={`/manageadmin?page=${index + 1}`}>
    //                         <MDBPageNav >
    //                             <span style={{ color: ((index) === this.state.page / 8) ? 'white' : 'grey' }}>{index + 1}</span>
    //                         </MDBPageNav>
    //                     </Link>
    //                 </MDBPageItem>
    //             )
    //             // console.log(tesitem)
    //         }

    //         return (
    //             pagination
    //         )
    //         // const element = array[index];            
    //     }
    // }

    render() {
        const { indexedit, diskon } = this.state
        if (this.props.User.role === 2) {
            return (
                <div className='manageadmin-container'>
                    <div className="header-table">
                        <Modal isOpen={this.state.isModaladdOpen} toggle={this.toggleadd}>
                            <ModalHeader toggle={this.toggleadd}>Tambah Diskon</ModalHeader>
                            <ModalBody>
                                <input type="text" ref='typeadd' placeholder='Type' className='form-control mt-2' />
                                <input type='file' placeholder='Pilih Gambar' onChange={this.onAddimagefilechange} className='form-control mt-2' />
                                {
                                    this.state.addimagefile ?
                                        <img src={URL.createObjectURL(this.state.addimagefile)} alt="" width='480px' height='164px' />
                                        :
                                        null
                                }                                
                                <input type="number" min="1" ref='discountrateadd' placeholder='Discount Rate' className='form-control mt-2' />
                                <input type="date" ref='startdateadd' placeholder='Tanggal Mulai' className='form-control mt-2' />                              
                                <input type="date" ref='expireddateadd' placeholder='Tanggal Berakhir' className='form-control mt-2' />                              
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.onSaveaddDataClick}>Save</Button>
                                <Button color="secondary" onClick={this.toggleadd}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {

                            this.state.diskon.length ?

                                <Modal isOpen={this.state.isModaleditOpen} toggle={this.toggleedit}>
                                    <ModalHeader toggle={this.toggleedit}>Edit Buku: {capitalize(diskon[indexedit].type)}</ModalHeader>
                                    <ModalBody>
                                        <div className='modal-label'>Type Diskon</div>
                                        <input type="text" ref='typeedit' defaultValue={diskon[indexedit].type} className='form-control' />
                                        <div className='modal-label'>Diskon Banner</div>
                                        <td><CustomInput label={this.state.editimagefilename} id="edit-foto" type="file" onChange={this.onEditimagefilechange} /></td>
                                        {/* <input type="file" onChange={this.onEditimagefilechange} placeholder='Url Image' className='form-control' />
                                        {
                                            this.state.editimagefile ?
                                                <img src={URL.createObjectURL(this.state.editimagefile)} alt="" width='150' height='200px' />
                                                :
                                                null
                                        } */}
                                        <div className='modal-label'>Discount Rate</div>
                                        <input type="number" min="1" ref='discountrateedit' defaultValue={diskon[indexedit].discount_rate} placeholder='Discount Rate' className='form-control' />
                                        <div className='modal-label'>Tanggal Mulai</div>
                                        <input type="date" ref='startdateedit' defaultValue={diskon[indexedit].start_date} placeholder='Tanggal Mulai' className='form-control' />
                                        <div className='modal-label'>Tanggal Berakhir</div>
                                        <input type="date" ref='expireddateedit' defaultValue={diskon[indexedit].expired_date} placeholder='Tanggal Berakhir' className='form-control' />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.onsaveEditClick}>Save</Button>
                                        <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                                :
                                null
                        }
                        {/* <div className='d-flex flex-wrap justify-content-center'>
                            <div style={{ fontSize: 17, lineHeight: 3, color: 'black' }}>Category:</div>
                            <Link to={'/manageadmin?page=1'}><button className='btn btn-outline-red btn-sm' onClick={this.onClearFilterClick}><FcClearFilters size="15" />Clear Filter</button></Link>
                            <Link to={'/filterprod/1?page=1'}><button className='btn btn-outline-teal btn-sm'>Komik</button></Link>
                            <Link to={'/filterprod/2?page=1'}><button className='btn btn-outline-primary btn-sm'>Novel</button></Link>
                            <Link to={'/filterprod/3?page=1'}><button className='btn btn-outline-danger btn-sm'>Edukasi</button> </Link>
                            <Link to={'/filterprod/4?page=1'}><button className='btn btn-outline-secondary btn-sm'>Anak-Anak</button></Link>
                            <Link to={'/filterprod/5?page=1'}><button className='btn btn-outline-orange btn-sm'>Import</button></Link>
                            <Link to={'/filterprod/6?page=1'}><button className='btn btn-outline-pink btn-sm'>Diskon</button></Link>
                        </div> */}
                        {/* <div className='d-flex flex-wrap justify-content-center'>
                            <div style={{ fontSize: 17, lineHeight: 3, color: 'black' }}>Sort By:</div>
                            <button className='btn btn-outline-teal btn-sm' onClick={this.onSortName}>By Name {
                                !this.state.sortNama ? <FcAlphabeticalSortingAz size={20} /> : <FcAlphabeticalSortingZa size={20} />
                            }</button>
                            <button className='btn btn-outline-teal btn-sm' onClick={this.onSortHarga}>By Price {
                                !this.props.Filter.sortnama ? <FcNumericalSorting12 size={20} /> : <FcNumericalSorting21 size={20} />
                            }</button>
                        </div> */}
                        <Table style={{ textAlign: 'center', marginTop: '10px' }} striped responsive hover>
                            <thead >
                                <tr>
                                    <th>No.</th>
                                    <th>Tipe Diskon</th>
                                    <th>Rate Diskon</th>
                                    <th>Tanggal Mulai</th>
                                    <th>Tanggal Berakhir</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDiscounts()}
                            </tbody>
                            <button className='rounded-pill btn btn-primary btn-sm' onClick={this.toggleadd}>Tambah Diskon</button>
                        </Table>
                        {/* <div className='d-flex justify-content-center'>
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
                                <MDBPageItem disabled={(this.state.page / 8 + 1) === Math.ceil(this.state.jumlahProducts/ 8)}>
                                    <MDBPageNav className="page-link" onClick={() => this.getPage((this.state.page / 8) + 1)}>
                                        &raquo;
                                            </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem disabled={this.state.page === Math.ceil(this.state.jumlahProducts/ 8)}>
                                    <MDBPageNav className="page-link" onClick={() => this.getPage(Math.ceil(this.state.jumlahProducts/ 8 - 1))}>
                                        Last
                                            </MDBPageNav>
                                </MDBPageItem>
                            </MDBPagination>
                        </div> */}
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