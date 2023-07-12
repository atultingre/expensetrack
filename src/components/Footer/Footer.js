import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <footer style={{}}>
        <span ><Link to="https://atultingre.netlify.app/" target="_blank">&copy; Atul Tingre {date}</Link></span>
    </footer>
  );
};

export default Footer;
