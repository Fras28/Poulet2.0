import React, { useState, useEffect } from "react";
import Dashboard from "./DashBoard/DashBoard";
import ComandasComponent from "./General/Comander";
import ModalGen from "../Modal/ModalConfirmacion/Modal";
import { Editer } from "../Categorias/Editer";
import { useDispatch, useSelector } from "react-redux";
import LoginComponent from "./LogIn/LogIn";
import { asyncAllProducts, asyncAllSubCategoria } from "../redux/slice";
import PdfGeneratos from "./PDF/pdf";
import QRCodeGenerator from "./QrGen/QrGeneratos";
import "./AdminPanel.css";
import { EditerSub } from "../Categorias/EditerSub";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const API = process.env.REACT_APP_API_STRAPI;

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const [panel, setPanel] = useState("General");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { usuarioComander, comercio,subCategorias, allProduct } = useSelector((state) => state.alldata);

  useEffect(() => {
    dispatch(asyncAllSubCategoria());
    dispatch(asyncAllProducts());
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {usuarioComander ? (
        <div>
          <div className="admCont">
          <NavLink to={`/`}>
            <img
              src={`${API}${comercio?.attributes?.logo?.data?.attributes?.url}`}
              alt=""
              className="logoCel"
            />
          </NavLink>
            <button
              className="generic buttonDash AdminBtns"
              onClick={() => setPanel("General")}
            >
              General
            </button>
            <button
              className="generic buttonDash AdminBtns"
              /*onClick={() => setPanel("Estadisticas")}*/
            >
              Estadisticas
            </button>
            <div className="dropdown">
              <button
                className="generic buttonDash AdminBtns"
                onClick={toggleDropdown}
              >
                Editar
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <ModalGen Child={<Editer />} txtBtn="Edit Articulos" />
                  <ModalGen Child={<EditerSub />} txtBtn="Editar Sub Categorias" />
                  {/* <ModalGen Child={<Editer />} txtBtn="Editar Categorias" /> */}
                </div>
              )}
            </div>
            <ModalGen Child={<PdfGeneratos />} txtBtn="PDF Carta" />
            <ModalGen Child={<QRCodeGenerator />} txtBtn="Generar QRS" />
          </div>

          {/* Aquí puedes renderizar el panel según el estado "panel" */}
          {panel === "General" && <ComandasComponent />}
          {panel === "Estadisticas" && <Dashboard />}
          {panel === "Otros" && <Dashboard />}
        </div>
      ) : (
        <LoginComponent />
      )}
    </>
  );
};
