function Footer(){
    return(
        <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                  <div className="footer_logo">
                    <a href="#">
                      <img src="img/logo.png" alt="" />
                    </a>
                  </div>
                  <p>
                    smartseekr@support.com <br/>
                      +1 222 222 2222 <br/>
                        Kitchener, ON
                      </p>

                    </div>
                </div>
                <div className="col-xl-4">
                  
                </div>
                <div className="col-xl-4 col-md-6 col-lg-4">
                  <div className="footer_widget wow fadeInUp" data-wow-duration="1.3s" data-wow-delay=".6s">
                    <h3 className="footer_title">
                      Subscribe
                    </h3>
                    <form action="#" className="newsletter_form">
                      <input type="text" placeholder="Enter your mail"/>
                        <button type="submit">Subscribe</button>
                    </form>
                    <p className="newsletter_text">Esteem spirit temper too say adieus who direct esteem esteems
                      luckily.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copy-right_text wow fadeInUp" data-wow-duration="1.4s" data-wow-delay=".3s">
            <div className="container">
              <div className="footer_border"></div>
              <div className="row">
                <div className="col-xl-12">
                  <p className="copy_right text-center">
                    {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
      </footer>
    )
}

export default Footer;