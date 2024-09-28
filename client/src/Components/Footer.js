import React from 'react';
import './Footer.css'; 
import logo from './logo.jpg';
import pint from './pinterest.png';
import insta from './instagram.png';
import fb from './facebook.png';
import twitt from './twitter.png';

function Footer() {
  return (
    <div>
      <center>
      <footer>
        <div id="footer">
          <div id="f-title">
            <img id="logo" src={logo}></img>
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
                <a class="social" href="https://twitter.com">
                    <img class="Contact" src={twitt} width="288" ></img></a>
        </div>
        <div >
                <a class="social" id="fb" href="https://www.facebook.com"  >
                    <img class="Contact" src={fb} width="288" ></img></a>
        </div>
        <div >
                    <a class="social" href="https://www.instagram.com" >
                    <img class="Contact" src={insta} width="288"></img></a>
        </div>
        <div >
                    <a class="social" href="https://www.pinterest.com" >
                    <img class="Contact" src={pint} width="288"></img></a>
        </div>
            </div>
        </div>
        <p className="f-p" id='f-copy'>
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
