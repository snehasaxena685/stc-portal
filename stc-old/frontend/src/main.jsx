import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
<<<<<<< HEAD
import "./styles/global.css";
=======
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34

AOS.init({
  duration: 800,
  offset: 80,
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
