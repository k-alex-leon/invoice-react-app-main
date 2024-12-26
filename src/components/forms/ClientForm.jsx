import { useState, useEffect, useRef } from "react";
import { notify_warning } from "../../utils/Notifications";

const ClientForm = ({ onClientChange }) => {
  const [client, setClient] = useState({});

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    onClientChange(client);
  }, [client]);

  return (
    <form>
      <div className="pb-2 px-2">
        <h4 className="my-2 font-bold w-full border-b-2">Comprador</h4>
        <div className="md:flex space-y-1 mt-1 sm:space-y-0 sm:space-x-2">
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="name"
            onChange={handleValueChange}
            placeholder="Nombre del cliente"
          />
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="document"
            type="number"
            onChange={handleValueChange}
            placeholder="N. Documento"
          />
        </div>
        <div className="md:flex space-y-1 mt-1 sm:space-y-0 sm:space-x-2">
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="address"
            onChange={handleValueChange}
            placeholder="Dirección"
          />
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="phone"
            type="number"
            onChange={handleValueChange}
            placeholder="Teléfono - Celular"
          />
        </div>

        <input
          className="border mt-1 w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
          name="email"
          type="email"
          onChange={handleValueChange}
          placeholder="Correo ( Opcional )"
        />
      </div>
    </form>
  );
};

export default ClientForm;
