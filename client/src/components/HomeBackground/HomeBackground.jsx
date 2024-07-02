import React from "react";
import { Box } from "@mui/material";
import bgImg from "../../assets/homepage-hero.png";
import PropTypes from "prop-types";

const HomeBackground = ({ children, direction = "row", ...props }) => {
  const backgroundColor = "#B7D9E4";

  return (
    <Box
      {...props}
      className="home-background"
      sx={{
        display: "flex",
        flexDirection: direction,
        alignItems: "center",
        justifyContent: "center",
        height: { xs: "450px", md: "390px" },
        padding: 2,
        backgroundColor: backgroundColor,
        borderRadius: "30px",
        width: "92%",
        margin: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 500,
          height: 300,
          borderRadius: 10,
          backgroundColor: backgroundColor,
          backgroundImage: { xs: "none", md: `url(${bgImg})` }, // Hide background on mobile
          backgroundSize: "contain",
          backgroundPosition: "left -10px top 100px",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      />
      <Box
        sx={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: direction === "column" ? "center" : "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HomeBackground;

HomeBackground.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["row", "column"]),
};
