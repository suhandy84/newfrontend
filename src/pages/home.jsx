import React, { Component } from 'react';
import './home.css'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
    "mdbreact";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import { connect } from 'react-redux';
import { signOut, searchbuku } from '../redux/actions'
import { changetoRupiah } from '../support/changetorupiah';
import { capitalize } from '../support/sentencecase'
import Footer from '../component/footer';
// import {Redirect} from 'react-router-dom';


class Home extends Component {
    state = {
        bukuterpopuler: [],
        novelpalinglaris: [],
        komikpilihan: [],
        discounts: [],
        loading: true
    }

    componentDidMount() {
        Axios.get(`${APIURL}/product/getprod`)
            .then((res) => {
                console.log(res.data)
                this.setState({ discounts: res.data.discount })
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.setState({ loading: false })
            })
        this.getHomeProducts()
    }

    getHomeProducts = () => {
        Axios.get(`${APIURL}/product/producthome`)
            .then((res) => {
                console.log(res.data)
                console.log(res.data.populer)
                this.setState({ novelpalinglaris: res.data.novel, komikpilihan: res.data.komik, bukuterpopuler: res.data.populer })
            })
            .catch((err) => {
                console.log(err)

            }).finally(() => {
                this.setState({ loading: false })
            })
    }

    renderbannerdiskon = () => {
        return this.state.discounts.map((val, index) => {
            return (
                <Link to={`/diskonprod/${val.discount_id}`} >
                    < MDBCarouselItem key={index} itemId={index + 1}>
                        <MDBView>
                            <img
                                className=""
                                src={APIURL + val.image}
                                alt={val.type}
                            />
                        </MDBView>
                    </MDBCarouselItem>
                </Link>
            )
        })
    }

    renderCategory = (category) => {
        return category.map((val, index) => {
            return (
                <div key={index} className="carousel-cell">
                    <Link to={`/detailprod/${val.idproduct}`}>
                        < a className="position-rel display-block" >
                            <img className="product" src={APIURL + val.image} alt={val.name} />
                            <div className="product-name">{capitalize(val.name)}</div>
                            <div className="product-author">
                                <a>{capitalize(val.author)}</a>
                            </div>
                            <div className="price-container">
                                <div className="display-clock ribbon-image">
                                    <div className="ribbon-image-title">
                                        <span className="ribbon-image-title-text"></span>
                                    </div>
                                </div>
                                <div className="display-block ribbon-image-discount">
                                    <div className="ribbon-image-box-discount">
                                        {val.discount_rate === null ?
                                            <div className="ribbon-image-price-promobox">
                                                <p className="ribbon-image-price-normal">
                                                    {changetoRupiah(val.price)},00
                                            </p>
                                                <span className="ribbon-image-normal-percent">
                                                    {val.discount_rate}
                                                </span>
                                            </div>
                                            :
                                            <div className="ribbon-image-price-promobox">
                                                <p className="ribbon-image-price-disc">
                                                    {changetoRupiah(val.price)},00
                                            </p>
                                                <span className="ribbon-image-price-percent">
                                                    {val.discount_rate}%
                                            </span>
                                            </div>
                                        }
                                        {
                                            val.discount_rate === null ?
                                                <div className="ribbon-image-price-get-discount">
                                                    {changetoRupiah(val.price)},00
                                            </div>
                                                :
                                                <div className="ribbon-image-price-get-discount">
                                                    {changetoRupiah(val.price - (val.discount_rate * val.price / 100))},00
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            )
        })
    }

    render() {
        const { komikpilihan, novelpalinglaris, bukuterpopuler } = this.state
        return (
            <div className="home-container">
                <div className="inner-home-container">
                    <div className="home-banner">
                        <Link className="red-text" to={'/allproduct'}>
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="promo-carousel">
                        <div>
                            <MDBContainer >
                                <MDBCarousel
                                    activeItem={1}
                                    length={this.state.discounts.length}
                                    showControls={true}
                                    showIndicators={true}
                                    className="z-depth-1 banner-main"
                                >
                                    <MDBCarouselInner>
                                        {this.renderbannerdiskon()}
                                    </MDBCarouselInner>
                                </MDBCarousel>
                            </MDBContainer>
                        </div>
                        <div className="banner-small">
                            <Link to={`/diskonprod/${3}`}>
                                <div>
                                    <img src="https://cdn.gramedia.com/uploads/marketing/1._Sosmed_Online_Bookfair_bca_storefront__wauto_h164.png" alt="" />
                                </div>
                            </Link>
                            <Link to={`/diskonprod/${2}`}>
                                <div>
                                    <img src="https://cdn.gramedia.com/uploads/marketing/kgx__wauto_h164.png" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <Link to={'/allproduct'}>
                            <div className="isi-category">
                                <a>
                                    <img src="https://cdn.gramedia.com/uploads/marketing/disc_hingga_90_aX9GsbO__wauto_h336.png" />
                                </a>
                            </div>
                        </Link>
                    </div>

                    <div className="detail-category">
                        <div className="inner-category-container">
                            <div className="top">
                                <h2 className="with-banner">Buku-Buku Terpoluler</h2>
                                <Link className="red-text" to="/allproduct"><a className="with-banner">Lihat Semua</a></Link>
                            </div>
                            <div className="home-category-container">
                                <div className="banner-section">
                                    <a>
                                        <img src="https://cdn.gramedia.com/uploads/category-list/Product_List_Banner-07__w204_hauto.jpg" />
                                    </a>
                                </div>
                                <div className="items-section">
                                    <div className="item">
                                        <div className="carousel-container">
                                            <div className="viewport">
                                                {/* item render */}
                                                {this.renderCategory(bukuterpopuler)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-category">
                        <div className="inner-category-container">
                            <div className="top">
                                <h2 className="with-banner">Novel Paling Laris</h2>
                                <Link className="red-text" to="/allproduct"><a className="with-banner">Lihat Semua</a></Link>
                            </div>
                            <div className="home-category-container">
                                <div className="banner-section">
                                    <a>
                                        <img src="https://cdn.gramedia.com/uploads/category-list/Product_List_Banner-novel_paling_laris1__w204_hauto.jpg" />
                                    </a>
                                </div>
                                <div className="items-section">
                                    <div className="item">
                                        <div className="carousel-container">
                                            <div className="viewport">
                                                {/* item render */}
                                                {this.renderCategory(novelpalinglaris)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-category">
                        <div className="inner-category-container">
                            <div className="top">
                                <h2 className="with-banner">Komik-Komik Pilihan</h2>
                                <Link className="red-text" to="/allproduct"><a className="with-banner">Lihat Semua</a></Link>
                            </div>
                            <div className="home-category-container">
                                <div className="banner-section">
                                    <a>
                                        <img src="https://cdn.gramedia.com/uploads/category-list/Product_List_Banner-10__w204_hauto.jpg" />
                                    </a>
                                </div>
                                <div className="items-section">
                                    <div className="item">
                                        <div className="carousel-container">
                                            <div className="viewport">
                                                {/* item render */}
                                                {this.renderCategory(komikpilihan)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(mapStateToProps, { signOut, searchbuku })(Home);