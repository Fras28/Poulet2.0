import React, { useState } from "react";
import "./formVenta.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncEditProd } from "../../redux/slice";

const EditProduct = ({ product, id }) => {
  const dispatch = useDispatch();
  const { categorias, subCategorias } = useSelector((state) => state.alldata);

  const [formData, setFormData] = useState({
    data: {
      name: product?.name,
      price: product?.price || null,
      price2: product?.price2 || null,
      price3: product?.price3 || null,
      txtPrecio1:product.txtPrecio1,
      txtPrecio2:product.txtPrecio2,
      txtPrecio3:product.txtPrecio3,
      detail: product?.detail,
    },
  });

  // Verificar los valores iniciales
  console.log("Valores iniciales:", formData);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        data: {
          ...prevFormData.data,
          [name]: value === "0" ? null : value,
        },
      };
      // Verificar la actualización del estado
      console.log("Cambio en el input:", name, value, newFormData);
      return newFormData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convertir precios de 0 a null
    const dataToSubmit = {
      ...formData,
      data: {
        ...formData.data,
        price: formData.data.price === "0" ? null : formData.data.price,
        price2: formData.data.price2 === "0" ? null : formData.data.price2,
        price3: formData.data.price3 === "0" ? null : formData.data.price3,
      },
    };

    // Verificar los valores en el envío
    console.log("Datos del formulario a enviar:", dataToSubmit, id);
    dispatch(asyncEditProd(dataToSubmit, id)); // Pasar el id aquí
  };

  return (
    <form onSubmit={handleSubmit} className="Formix2">
      <h2>Editar Producto</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre del Producto: id {id}</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={formData.data.name}
        />
      </div>
      <div className="form-group" style={{display:"flex"}}>
        <div> <label htmlFor="txtPrecio1">TextPrecio:</label>
        <input
            type="text"
            id="txtPrecio1"
            name="txtPrecio1"
            value={formData?.data?.txtPrecio1 }
            onChange={handleInputChange}
          />
          </div>
        <div>
  
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.data.price === null ? "" : formData.data.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group" style={{display:"flex"}}>
        <div> <label htmlFor="txtPrecio1">TextPrecio2:</label>
        <input
            type="text"
            id="txtPrecio2"
            name="txtPrecio2"
            value={formData?.data?.txtPrecio2 }
            onChange={handleInputChange}
          />
          </div>
        <div>
  
          <label htmlFor="price">Precio2:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.data.price2 === null ? "" : formData.data.price2}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group" style={{display:"flex"}}>
        <div> <label htmlFor="txtPrecio1">TextPrecio3:</label>
        <input
            type="text"
            id="txtPrecio3"
            name="txtPrecio3"
            value={formData?.data?.txtPrecio3 }
            onChange={handleInputChange}
          />
          </div>
        <div>
  
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.data.price3 === null ? "" : formData.data.price3}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="detail">Detalle:</label>
        <textarea
          type="text"
          id="detail"
          name="detail"
          value={formData.data.detail}
          onChange={handleInputChange}
          style={{width:"100%", height:"50px"}}
        />
      </div>

      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditProduct;
