function SideBar() {
    return(
        <div className="slider_area">
        <div className="single_slider  d-flex align-items-center slider_bg_1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-6">
                <div className="slider_text">
                  <h5 className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".2s">4536+ Jobs listed</h5>
                  <h3 className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".3s">Find your Dream Job</h3>
                  <p className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".4s">We provide online instant cash loans with quick approval that suit your term length</p>
                  <div className="sldier_btn wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".5s">
                    <a href="#" className="boxed-btn3">Upload your Resume</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ilstration_img wow fadeInRight d-none d-lg-block text-right" data-wow-duration="1s" data-wow-delay=".2s">
          <img src="img/banner/illustration.png" alt="" />
        </div>
      </div>
    )
}

export default SideBar;