import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsEdite } from "../Cards/CardsEdit.jsx";
import { asyncAllProducts } from "../redux/slice.jsx";
import ModalGen from "../Modal/ModalConfirmacion/Modal.jsx";
import AddProduct from "../Comander/formVenta/formAddProd.jsx";
import { CardsEditSub } from "../Cards/CardsEditSub.jsx";

export const EditerSub = () => {
  const dispatch = useDispatch();
  const { subCategorias } = useSelector((state) => state.alldata);


console.log(subCategorias[0]);
  // Estado para el valor de búsqueda
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(subCategorias[0]);



  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchValue(value);

    // Si el valor de búsqueda está vacío, enviar directamente allProduct
    if (value === "") {
      setFilteredProducts(subCategorias[0]);
    } else {
      // Filtrar los productos basados en el valor de búsqueda
      const filtered = subCategorias[0].filter(product =>
        product?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="containerEdit">
        <div className="searchBar">
        <label htmlFor="">Buscar</label>
        <input
          type="search"
          name=""
          id=""
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar producto..."
        />
        </div>
      <div>
        <h2 style={{paddingTop:"2.5rem"}}>Edicion de Sub Categorias</h2>
        {/* <ModalGen Child={<AddProduct />} txtBtn="+ Producto" /> */}
        <CardsEditSub sub={filteredProducts} />
      </div>
    </div>
  );
};
