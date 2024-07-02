import React from "react";
import "./AboutUsContent.css";
import resp from "../../assets/resp.jpeg";

const AboutUsContent = () => {
  return (
    <>
      <section className="content-wrapper">
        <div className="vision-block">
          <div className="responsible-travel-cropper">
            <img src={resp} className="responsible-travel-img" />
          </div>
          <div className="text-wrapper">
            <h1 className="belief-header">
              We believe in a more responsible way to go on holidays
            </h1>
            <p className="belief-text">
              Travel should not happen at the expense of the local community, it
              should be about connecting with people, & sharing is the most
              responsible way to use resources.
              <br />
              We promote slower, more conscious travel that encourages authentic
              encounters.
            </p>
          </div>
        </div>
        <div className="culture-block">
          <div className="culture-text-wrapper">
            <p>
              HomeSwap is the most authentic, humane, & responsible way to
              discover new places, new cultures, & new people. We discourage
              mass tourism & gentrification.
            </p>
          </div>
          <div className="badge-wrapper">
            <img
              src="https://a.storyblok.com/f/51678/801x801/594ebeb566/responsible-travel2.png"
              className="responsible-travel-badge"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsContent;
