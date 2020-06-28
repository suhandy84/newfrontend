import React, { Component } from "react";

import { Container, Jumbotron } from "react-bootstrap";
//Import Icon
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import './footer.css'

class Footer extends Component {
  state = {};
  render() {
    return (
      <Jumbotron fluid className="foooter">
        <Container>
          <div className="row">
            <div className="col-lg-2">
              <div className="footer-left">
                {/* <div className="footer-logo kix">
                  K <span style={{ color: "#393e46" }}>I</span> X
                </div> */}
                <h5>BELANJA</h5>
                <ul>
                  <li>
                  <a href="/">Berbelanja</a>
                  </li>
                  <li>
                  <a href="/">Pembayaran</a>
                  </li>
                  <li>
                  <a href="/">Pengiriman</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h5>TENTANG GRAMEDIA</h5>
                <ul>
                  <li>
                    <a href="/">Tentang Kami</a>
                  </li>
                  <li>
                    <a href="/">Toko Kami</a>
                  </li>
                  <li>
                    <a href="/">Kerjasama</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="footer-widget">
                <h5>LAINNYA</h5>
                <ul>
                  <li>
                    <a href="/">Syarat dan Ketentuan</a>
                  </li>
                  <li>
                    <a href="/">Kebijakan dan Privasi</a>
                  </li>
                  <li>
                    <a href="/">Bantuan</a>
                  </li>
                  <li>
                    <a href="/">Hubungi Kami</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="footer-widget">
                <h5>PEMBAYARAN</h5>
                <ul>
                  <li>
                    <a href="/">Kartu Kredit</a>
                  </li>
                  </ul>
                  <h6>PENGIRIMAN</h6>
                  <ul>
                  <li>
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="newslatter-item">
                <h5>DAPATKAN APPS KAMI</h5>
                <div className="footer-social">
                  <a href="http://facebook.com">
                    <FaFacebookF />
                  </a>
                  <a href="http://instagram.com">
                    <FaInstagram />
                  </a>
                  <a href="http://twitter.com">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Jumbotron>
    );
  }
}

export default Footer;