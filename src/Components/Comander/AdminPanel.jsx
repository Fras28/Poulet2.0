import React, { useEffect, useState } from "react";

import Dashboard from "./DashBoard/DashBoard"
import ComandasComponent from "./General/Comander";
import ModalGen from "../Modal/ModalConfirmacion/Modal";
import { Editer } from "../Categorias/Editer";
import { useDispatch, useSelector } from "react-redux";
import LoginComponent from "./LogIn/LogIn";
import { asyncProductComander, asyncSubCategoria} from "../redux/slice";
import PdfGeneratos from "./PDF/pdf";
import QRCodeGenerator from "./QrGen/QrGeneratos";
import "./AdminPanel.css"



export const AdminPanel = () => {
  const dispatch = useDispatch();
  const [panel, setPanel] = useState("General");
  const { usuarioComander } = useSelector((state) => state.alldata);
  useEffect(()=>{
    dispatch(asyncProductComander())
  },[usuarioComander])

  return (
    <>
      {usuarioComander?
        <div>
          <div className="admCont">
          <button className="buttonDash" onClick={() => setPanel("General")}>General</button>
          <button className="buttonDash" onClick={() => setPanel("Estadisticas")}>Estadisticas</button>
          <button className="buttonDash" onClick={() => setPanel("Otros")}>Otros</button>
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
