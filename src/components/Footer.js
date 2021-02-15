import React from 'react';
import '../css/_footer.scss';
import {Link} from 'react-router-dom';
import Copyright from './Copyright';



function Footer() {
    return (
        <footer className="footer">
        {/* <div className="footer__container">
            <div className="footer__card" >
                <h3 className="footer__title">About</h3>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">Careers</p>
                </Link>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">Afrex</p>
                </Link>
                <Link className="footer__link" to="/"> 
                    <p className="footer__subtitle">Blog</p>
                </Link>
            </div>
            <div className="footer__card" >
                <h3 className="footer__title">Let us help you</h3>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">your account</p>
                </Link>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">refunds and returns</p>
                </Link>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">orders</p>
                </Link>
            </div>
            <div className="footer__card" >
                <h3 className="footer__title">Make Money</h3>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">Sell on Afrex</p>
                </Link>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">Advertize</p>
                </Link>
                <Link className="footer__link" to="/">
                    <p className="footer__subtitle">How to invest</p>
                </Link>
            </div>
        </div> */}
              <Copyright/>  
        </footer>
    )
}

export default Footer
