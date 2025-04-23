import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qiratLogoImg from "./assets/qiratLogo.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [fadeOutLogo, setFadeOutLogo] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOutLogo(true); // Start fading out the logo
    }, 1500);

    setTimeout(() => {
      setShowLoader(true); // Show loader after logo fades out
    }, 2000);

    setTimeout(() => {
      navigate("/login"); // Navigate after 3 seconds
    }, 3000);
  }, [navigate]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {!showLoader ? (
        <img
          src={qiratLogoImg}
          alt="Qirat Logo"
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
            opacity: fadeOutLogo ? 0 : 1, // Fade out logo
            transition: "opacity 0.8s ease-in-out",
          }}
        />
      ) : (
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "5px solid transparent",
            borderTop: "5px solid #59d88f", // Use the specified color
            borderRadius: "50%",
            opacity: showLoader ? 1 : 0, // Fade in loader
            transition: "opacity 0.8s ease-in-out",
            animation: "spin 1s linear infinite",
          }}
        />
      )}

      {/* Inline keyframes for animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
