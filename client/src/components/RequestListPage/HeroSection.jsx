import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import bgImg from "../../assets/homepage-hero.png";
import PropTypes from "prop-types";

const HomeBackground = ({ children, direction = "row", ...props }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isHidden = useMediaQuery("(max-width:1500px)");

  const backgroundColor = "#B7D9E4";

  if (isHidden) return null;

  return (
    <Box
      {...props}
      className="home-background"
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : direction,
        alignItems: "center",
        justifyContent: "center",
        height: "360px",
        padding: 2,
        backgroundColor: backgroundColor,
        borderRadius: "30px",
        width: "92%",
        margin: "auto",
        position: "relative",
        overflow: "hidden",
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
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "contain",
          backgroundPosition: "left -10px top 100px",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: 300,
            marginBottom: 5,
            backgroundPosition: "center",
          },
        }}
      />
      <Box
        sx={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
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
