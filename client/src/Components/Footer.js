import React, { useEffect } from 'react';
import './Footer.css'; 


function Footer() {
  return (
    <div>
      <center>
      <footer>
        <div id="footer">
          <div id="f-title">Makao</div>
          <div id="f-desc">
            <div className="f-contacts">
              <p className="f-p">Connect</p>
              <a href="">Instagram</a><br /><br />
              <a href="">Facebook</a><br /><br />
              <a href="">Pinterest</a><br /><br />
              <a href="">YouTube</a><br /><br />
            </div>
            <div className="f-contacts">
              <p className="f-p">Resources</p>
              <a href="">FAQs</a><br /><br />
              <a href="">Privacy Policy</a><br /><br />
              <a href="">Talent Login</a><br /><br />
            </div>
            <div className="f-contacts">
              <p className="f-p">About</p>
              <a href="">Our Story</a><br /><br />
              <a href="">Careers</a><br /><br />
              <a href="">Press</a><br /><br />
            </div>
          </div>
        </div>
        <p className="f-p">
          All rights reserved.<br />
          All trademarks, logos and brand names are the property of their respective owners.<br />
          MakaoLLC&copy;2024
        </p>
      </footer>
      </center>
    </div>
  );
}

export default Footer;
