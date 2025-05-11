import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Đảm bảo Link được import từ react-router-dom

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer class="section-footer bg-secondary">
        <div class="container">
          <section class="footer-top padding-y-lg text-white">
            <div class="row">
              <aside class="col-md col-6">
                <h6 class="title">Brands</h6>
                <ul class="list-unstyled">
                  <li> <Link to="#">Adidas</Link></li>
                  <li> <Link to="#">Puma</Link></li>
                  <li> <Link to="#">Reebok</Link></li>
                  <li> <Link to="#">Nike</Link></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Company</h6>
                <ul class="list-unstyled">
                  <li> <Link to="#">About us</Link></li>
                  <li> <Link to="#">Career</Link></li>
                  <li> <Link to="#">Find a store</Link></li>
                  <li> <Link to="#">Rules and terms</Link></li>
                  <li> <Link to="#">Sitemap</Link></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Help</h6>
                <ul class="list-unstyled">
                  <li> <Link to="#">Contact us</Link></li>
                  <li> <Link to="#">Money refund</Link></li>
                  <li> <Link to="#">Order status</Link></li>
                  <li> <Link to="#">Shipping info</Link></li>
                  <li> <Link to="#">Open dispute</Link></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Account</h6>
                <ul class="list-unstyled">
                  <li> <Link to="#">User Login</Link></li>
                  <li> <Link to="#">User register</Link></li>
                  <li> <Link to="#">Account Setting</Link></li>
                  <li> <Link to="#">My Orders</Link></li>
                </ul>
              </aside>
              <aside class="col-md">
                <h6 class="title">Social</h6>
                <ul class="list-unstyled">
                  <li><Link to="#"> <i class="fab fa-facebook"></i> Facebook </Link></li>
                  <li><Link to="#"> <i class="fab fa-twitter"></i> Twitter </Link></li>
                  <li><Link to="#"> <i class="fab fa-instagram"></i> Instagram </Link></li>
                  <li><Link to="#"> <i class="fab fa-youtube"></i> Youtube </Link></li>
                </ul>
              </aside>
            </div>
          </section>  

          <section class="footer-bottom text-center">
            <p class="text-white">Privacy Policy - Terms of Use - User Information Legal Enquiry Guide</p>
            <p class="text-muted"> &copy; 2019 Company name, All rights reserved </p>
            <br />
          </section>
        </div>
      </footer>
    );
  }
}

export default Footer;
