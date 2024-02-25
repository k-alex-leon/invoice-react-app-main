import { useState, useRef } from "react";
import { notify_warning } from "../../utils/Notifications";

const ItemForm = ({ onItemChange }) => {
  const [item, setItem] = useState({});

  const productRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveItem = (e) => {
    if (Object.keys(item).length !== 0) {
      if (Object.keys(item).length < 3) {
        notify_warning("Falta informacion del producto!");
      } else {
        e.preventDefault();
        onItemChange(item);
        // clean all
        setItem({});
        productRef.current.value = "";
        quantityRef.current.value = "";
        priceRef.current.value = "";
      }
    } else {
      notify_warning("Debes ingresar un producto primero!");
    }
  };

  return (
    <>
      <form>
        <div className="space-y-1 mt-4 sm:space-y-0 px-4">
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="name"
            ref={productRef}
            onChange={handleValueChange}
            placeholder="Nombre del producto"
            required
          />
          <div className="md:flex pt-1 space-y-2 md:space-y-0 sm:space-x-2">
            <input
              className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
              name="quantity"
              type="number"
              ref={quantityRef}
              onChange={handleValueChange}
              placeholder="Cantidad"
              required
            />

            <input
              className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
              name="price"
              type="number"
              ref={priceRef}
              onChange={handleValueChange}
              placeholder="Precio por unidad"
              required
            />
          </div>
        </div>
      </form>
      <button
        onClick={saveItem}
        className="bg-slate-700 md:ml-4 rounded-lg p-2 shadow text-white m-2 px-2"
      >
        Agregar
      </button>
    </>
  );
};

export default ItemForm;
