import React, { useState, useEffect } from "react";
import "./formVenta.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddProd, asyncAllSubCategoria, asyncEditProd } from "../../redux/slice";
import Spinner from "../../assets/Spinner/Spinner";

const AddProduct = ({ product}) => {
  const dispatch = useDispatch();
const {allProducts} = useSelector((state)=> state.alldata)
  useEffect(() => {
    dispatch(asyncAllSubCategoria());
  }, []);

  const { subCategorias } = useSelector((state) => state.alldata);
  const initialFormData = {
    data: {
      name: "",
      detail: "",
      price: null,
      price2:null ,
      price3:null ,
      txtPrecio1: "",
      txtPrecio2: "",
      txtPrecio3: "",
      publishedAt: new Date().toISOString(),
      sub_categoria: {
        id: null,
      },
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (product) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        data: {
          ...prevFormData.data,
          name: "",
          price: null,
          price2: null,
          price3: null,
          txtPrecio1: "",
          txtPrecio2: "",
          txtPrecio3: "",
          detail: "",
          sub_categoria: {
            id: null,
          },
        },
      }));
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      data: {
        ...prevFormData.data,
        [name]: value === "0" ? null : value,
      },
    }));
    console.log(formData);
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      data: {
        ...prevFormData.data,
        sub_categoria: { id: value },
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSubmit = {
      ...formData,
      data: {
        ...formData.data,
        price: formData.data.price === "0" ? null : formData.data.price,
        price2: formData.data.price2 === "0" ? null : formData.data.price2,
        price3: formData.data.price3 === "0" ? null : formData.data.price3,
      },
    };

    setIsLoading(true);

    dispatch(asyncAddProd(dataToSubmit)).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="Formix2">
      <h2>Agregar Producto</h2>
      <div className="form-group">
        <label htmlFor="name"><b className="red">*</b>Nombre del Producto<b className="red">*</b></label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="sub_categoria"><b className="red">*</b>Subcategoría<b className="red">*</b>:</label>
        <select
          id="sub_categoria"
          name="sub_categoria"
          onChange={handleSelectChange}
          required
        >
          <option value="">Seleccione una subcategoría</option>
          {subCategorias[0]?.map((sub) => {
            // Eliminar caracteres no deseados y texto entre paréntesis y corchetes
            const filteredName = sub.name.replace(/[\[\(].*?[\]\)]/g, "");
            return (
              <option key={sub.id} value={sub.id}>
                {filteredName.trim()} {/* Eliminar espacios en blanco adicionales */}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group" style={{ display: "flex" }}>
        <div>
          <label htmlFor="txtPrecio1">TextPrecio:</label>
          <input
            type="text"
            id="txtPrecio1"
            name="txtPrecio1"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price"><b className="red">*</b>Precio<b className="red">*</b>:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={FormData?.data?.price}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-group" style={{ display: "flex" }}>
        <div>
          <label htmlFor="txtPrecio2">TextPrecio2:</label>
          <input
            type="text"
            id="txtPrecio2"
            name="txtPrecio2"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price2">Precio2:</label>
          <input
            type="number"
            id="price2"
            name="price2"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group" style={{ display: "flex" }}>
        <div>
          <label htmlFor="txtPrecio3">TextPrecio3:</label>
          <input
            type="text"
            id="txtPrecio3"
            name="txtPrecio3"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price3">Precio3:</label>
          <input
            type="number"
            id="price3"
            name="price3"
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
          onChange={handleInputChange}
          style={{ width: "100%", height: "50px" }}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        Guardar Cambios
      </button>
      {isLoading && <Spinner />}
    </form>
  );
};

export default AddProduct;
