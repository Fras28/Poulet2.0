import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comander.css";
import { asyncComandas, asyncGetProv } from "../../redux/slice";
import FormularioVenta from "../formVenta/formVenta";
import LoginComponent from "../LogIn/LogIn.jsx";
import SoloComandas from "./SoloComandas.jsx";
import FormularioGastos from "../formVenta/formGastos";


const ComandasComponent = () => {
  const dispatch = useDispatch();
  const { comandas, comandasTrue, comandasFalse, usuarioComander } = useSelector((state) => state.alldata);
  const [getProvEjecutado, setGetProvEjecutado] = useState(false);

  useEffect(() => {
    const obtenerComandasYProv = async () => {
      try {
        await dispatch(asyncComandas());
        // Verificar si asyncGetProv no se ha ejecutado antes
        if (!getProvEjecutado) {
          await dispatch(asyncGetProv());
          // Marcar asyncGetProv como ejecutado
          setGetProvEjecutado(true);
        }
      } catch (error) {
        console.error("Error al obtener comandas y proveedores:", error);
      }
    };
    
    // Ejecutar obtenerComandasYProv solo si usuarioComander está disponible
    if (usuarioComander) {
      obtenerComandasYProv();
    }
  }, [usuarioComander,comandasTrue, comandasFalse, getProvEjecutado]);

  return (
    <div className="comandas-container">
      {/* Mostrar el componente LoginComponent solo si el usuario no está autenticado */}
      {!usuarioComander && <LoginComponent />}
      <div className="cont1">
        <h2 className="titleEditor">Movimientos</h2>
        <FormularioVenta />
        <FormularioGastos/>
      </div>
      <div className="cont2">
        <SoloComandas/>
      </div>
    </div>
  );
};

export default ComandasComponent;
