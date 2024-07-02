import React from "react";
import Nav from "../../components/Nav/Nav";
import PropertyList from "../../components/PropertyList/PropertyList";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/Search/SearchBar";
const Home = () => {
  return (
    <>
      <Nav />
      <SearchBar />
      <hr />
      <PropertyList />
      <hr />
      <Footer />
    </>
  );
};

export default Home;
