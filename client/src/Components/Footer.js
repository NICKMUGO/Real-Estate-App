import React from 'react';
import './Footer.css'; 


function Footer() {
  return (
    <div>
      <center>
        <footer>
          <div id="footer">
            <div id="f-title">
              <img id="logo" src={'logo.jpg'} alt="Logo" />
            </div>
            <div id="f-desc">
              <div className="f-contacts">
                <p className="f-p">Resources</p>
                <a href="/homepage">FAQs</a><br /><br />
                <a href="/homepage">Privacy Policy</a><br /><br />
                <a href="/homepage">Talent Login</a><br /><br />
              </div>
              <div className="f-contacts">
                <p className="f-p">About</p>
                <a href="/homepage">Our Story</a><br /><br />
                <a href="/homepage">Careers</a><br /><br />
                <a href="/homepage">Press</a><br /><br />
              </div>
            </div>
            <div className="f-contacts" id="contacts">
              <p className="f-p">Connect</p>
              
              <div>
                <a className="social" href="https://twitter.com">
                  <img className="Contact" src={'/twitter.png'} width="288" alt="Twitter" />
                </a>
              </div>
              <div>
                <a className="social" id="fb" href="https://www.facebook.com">
                  <img className="Contact" src={'/facebook.png'} width="288" alt="Facebook" />
                </a>
              </div>
              <div>
                <a className="social" href="https://www.instagram.com">
                  <img className="Contact" src={'/instagram.png'} width="288" alt="Instagram" />
                </a>
              </div>
              <div>
                <a className="social" href="https://www.pinterest.com">
                  <img className="Contact" src={'/pinterest.png'} width="288" alt="Pinterest" />
                </a>
              </div>
            </div>
          </div>
          <p className="f-p" id='f-copy'>
            All rights reserved.<br />
            All trademarks, logos, and brand names are the property of their respective owners.<br />
            MakaoLLC&copy;2024
          </p>
        </footer>
      </center>
    </div>
  );
}

export default Footer;
