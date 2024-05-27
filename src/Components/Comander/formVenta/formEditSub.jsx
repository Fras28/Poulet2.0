import React, { useState, useEffect } from "react";
import "./formVenta.css";
import { useDispatch } from "react-redux";
import { asyncEditProd, asyncEditSub } from "../../redux/slice";
import Spinner from "../../assets/Spinner/Spinner";
import ModalGen from "../../Modal/ModalConfirmacion/Modal";
import AddProduct from "./formAddProd";

const EditSub = ({ product }) => {
  const dispatch = useDispatch();

  // Estado inicial del formulario
  const initialFormData = {
    data: {
      name: product.name,
    },
  };

  // Estado del formulario
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para actualizar el estado del formulario cuando cambia el producto
  useEffect(() => {
    if (product) {
      setFormData({
        data: {
          name: product.name,
        },
      });
    } else {
      // Reiniciar el estado del formulario si no hay ningún producto
      setFormData(initialFormData);
    }
  }, [product]);

  // Manejador para cambios en el formulario
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      data: {
        ...prevFormData.data,
        [name]: value === "0" ? null : value,
      },
    }));
  };

  // Manejador para envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSubmit = {
      ...formData,
      data: {
        ...formData.data,
        name: formData.data.name === "0" ? null : formData.data.name,
      },
    };

    setIsLoading(true);

    dispatch(asyncEditSub(dataToSubmit, product.id)).then(() => {
      setIsLoading(false);
    });
  };
  return (
    <form onSubmit={handleSubmit} className="Formix2">
      <h2>Editar Producto</h2>
      <b style={{ color: "orange" }}>
        no eliminar el valor dentro de corchetes
      </b>
      <div className="form-group">
        <label className="labelform" htmlFor="name">
          Nombre del Producto: id {product.id}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={formData.data.name}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        Guardar Cambios
      </button>
      {isLoading && <Spinner />}
    </form>
  );
};

export default EditSub;
