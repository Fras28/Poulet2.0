import React from 'react';
import Logo from "../ElMundoParrilla-removebg-preview (2).png"
import './Spinner.css'; // Asegúrate de ajustar la ruta correcta
import { useSelector } from 'react-redux';
const API = process.env.REACT_APP_API_STRAPI;
const Spinner = ({ width = '200px', height = '200px' }) => {

const {comercio} = useSelector(state => state.alldata)

  return (
    <div className="spinner-overlay">
      <div className="spinner-container" style={{ width, height }}>
        <img  src={`${API}${comercio?.attributes?.logo?.data?.attributes?.url}`} alt="spinner" className="spinner-image" />
      </div>
    </div>
  );
};

export default Spinner;
