import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = ({backgroundColor,color}) => {
  const date = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      // Show the footer
      setIsVisible(true);

      // Clear previous timeout
      clearTimeout(timeout);

      // Hide the footer after 3 seconds
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <footer className="Footer"
      style={{
        position: "fixed",
        bottom: isVisible ? 0 : -60, // Adjust the height to hide the footer completely
        left: 0,
        right: 0,
        padding: "10px",
        backgroundColor: backgroundColor,
        color: color,
        textAlign: "center",
        transition: "bottom 0.3s ease-in-out",
      }}
    >
      <span>
        <Link to="https://atultingre.netlify.app/" target="_blank">
          &copy; Atul Tingre {date}
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
