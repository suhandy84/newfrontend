import React, { Component } from 'react';
import './header.css'
import { GoSearch } from 'react-icons/go'
import { AiOutlineShopping } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {signOut} from '../redux/actions'


class Header extends Component {
    state = {}

    onlogout = () => {
        localStorage.removeItem('token')
        this.props.signOut()
    } 
    render() {
        return (
            <div className='menu-navbar'>
                <div className='inner-container-navbar'>
                    <div>
                        <Link to='/'>
                            <h1>
                                <img src="https://www.gramedia.com/assets/gramedia-icon.svg" />
                            </h1>
                        </Link>
                    </div>
                    <div className='search-area'>
                        <div className='category-selector'></div>
                        <div className='nav-category'>Cari</div>
                        <div className='search-box'>
                            <div className='form-search'>
                                <div className="input-search">
                                    <form>
                                        <div className="form-label-group">
                                            <input type="search" className="form-control" placeholder="Cari Buku, Novel, Komik" />
                                            <GoSearch className='search-icon' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='navigation-area' >
                            {
                                this.props.Auth.islogin
                                ?
                                <a href='/'>
                                    <div className="login-button" onClick={this.onlogout}>Keluar</div>
                                </a>
                                :                             
                                <Link to='/login'>
                                    <div className="login-button">Masuk</div>
                                </Link>
                            }
                        <AiOutlineShopping className="cart-button"/>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        Auth:state.Auth
    }
}

export default connect(mapStateToProps,{signOut}) (Header);