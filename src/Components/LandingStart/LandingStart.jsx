import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AlertDialogSlide from "../BtnNavidad/BtnNavidad";
import "./LandingStart.css";
import { useDispatch, useSelector } from "react-redux";
import morton from "../assets/dog face.png"
import Carousel from "../assets/Carousel/Carousel";
import Morton from "../assets/PlaceHolder.jpg";
import Stella from "../assets/stellaArtois.png"
import CasDoCafe from "../assets/CasaDoCafe.png"
const API = process.env.REACT_APP_API_STRAPI;
export const Inicio = (url) => {
  const dispatch = useDispatch();
  const { comercio } = useSelector((state) => state.alldata);
  const [animateOut, setAnimateOut] = useState(false);

  // </svg>

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  toTop();

  const handleButtonClick = () => {
    // Realiza la lógica necesaria antes de la redirección
    setAnimateOut(true);

    // Espera un tiempo suficiente para que la animación ocurra antes de redirigir
    setTimeout(() => {
      url.history.push(`${url.location.pathname}/Landing`);
    }, 500); // Ajusta este tiempo según la duración de la animación
  };

  if (url.location.pathname === "/") {
    url.location.pathname = "/sinMesa";
    console.log(url.location.pathname);
  }

  
  const Logos = [Stella, CasDoCafe, Morton, Morton, Morton, Morton, Morton];

  return (
    <div
      className={`LandingBack ${
        animateOut ? "animate__animated animate__slideOutUp" : ""
      }`}
    >
      <div className="landingStart">
        <div>
          {" "}
          <p
            className="titleSectionStart"
            style={{
              justifyContent: "center",
              outline: "solid white 2px",
              border: "none",
              backgroundColor: `${comercio?.attributes?.rgb}`,
            }}
          >
            {comercio?.attributes?.msjInicio ||
              "Marisquería • jueves viernes y sábado"}
          </p>
        </div>
        <div className="BottomLanding">
      
          <img
            src={`${API}${comercio?.attributes?.logo?.data?.attributes?.url}`}
            alt=""
            style={{
              maxWidth: "80%",
              margin: "auto",
              paddingTop: "2rem",
              height: "200px",
            }}
          />
          {comercio?.attributes?.presentacion != null ? (
            <div className="contAlerStart">
              <AlertDialogSlide />
            </div>
          ) : null}

          <div className="btnEnter" onClick={handleButtonClick}>
            {/* <ButtonEnter titulo="Ver Catalogo" /> */}
            <button className="Btn2" style={{ fontSize: "20px" }}>
              Ver Carta
            </button>
          </div>

          {/* <Carousel logos={Logos} maxWidth="80%" /> */}

          <div className="btnEnter2">
            <b style={{marginBottom:"2px"}}>{comercio?.attributes?.direccion}</b>
          <iframe
            className="IFrame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.1707835738916!2d-62.239068!3d-38.73684300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95eda31f7de95949%3A0x2ac651f8f50efc9a!2sCaseros%202306%2C%20B8000%20Bah%C3%ADa%20Blanca%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1716907208491!5m2!1ses-419!2sar"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
        </div>
        <Link to="/Comander" className="buttonComander">
         <img src={morton} alt="" width="50px" backgroundColo="white"/>
        </Link>
      </div>
    </div>
  );
};
