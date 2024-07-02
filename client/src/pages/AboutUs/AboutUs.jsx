import React from "react";
import AboutUsContent from "../../components/AboutUsContent/AboutUsContent";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Nav />
      <AboutUsContent />
      <hr />
      <Footer />
    </div>
  );
};

export default AboutUs;
