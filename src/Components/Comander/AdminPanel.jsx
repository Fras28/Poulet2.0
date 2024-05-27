import React, { useEffect, useState } from "react";

import Dashboard from "./DashBoard/DashBoard"
import ComandasComponent from "./General/Comander";
import ModalGen from "../Modal/ModalConfirmacion/Modal";
import { Editer } from "../Categorias/Editer";
import { useDispatch, useSelector } from "react-redux";
import LoginComponent from "./LogIn/LogIn";
import { asyncAllSubCategoria, asyncProductComander, asyncSubCategoria} from "../redux/slice";
import PdfGeneratos from "./PDF/pdf";
import QRCodeGenerator from "./QrGen/QrGeneratos";
import "./AdminPanel.css"
const API = process.env.REACT_APP_API_STRAPI;


export const AdminPanel = () => {
  const dispatch = useDispatch();
  const [panel, setPanel] = useState("General");
  const { usuarioComander, comercio } = useSelector((state) => state.alldata);
  useEffect(()=>{
    dispatch(asyncAllSubCategoria())
  },[usuarioComander])

  return (
    <>
      {usuarioComander?
        <div>
          <div className="admCont">
            <img    src={`${API}${comercio?.attributes?.logo?.data?.attributes?.url}`} alt=""  className="logoCel"/>
          <button className="generic buttonDash AdminBtns" onClick={() => setPanel("General")}>General</button>
          <button className="generic buttonDash AdminBtns" onClick={() => setPanel("Estadisticas")}>Estadisticas</button>
      
          <ModalGen Child={<Editer />} txtBtn="Edit Cat/SubCat"  />
          <ModalGen Child={<Editer />} txtBtn="Editar Producto"  />
          <ModalGen Child={<PdfGeneratos/>} txtBtn="PDF Carta"  />
          <ModalGen Child={<QRCodeGenerator/>} txtBtn="Generar QRS"  />
        
          </div>
          
          {/* Aquí puedes renderizar el panel según el estado "panel" */}
          {panel === "General" && <ComandasComponent />}
          {panel === "Estadisticas" && <Dashboard />}
          {panel === "Otros" && <Dashboard />}
        </div>:<LoginComponent />
      }
    </>
  );
};
