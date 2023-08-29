import React from "react";
import Header from "./Header";
import Footer from "./Footer.jsx";

//import "../Assets/Styles/Layout.scss";

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
