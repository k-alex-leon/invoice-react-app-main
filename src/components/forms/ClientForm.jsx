import { useState, useEffect } from "react";

const ClientForm = ({ onClientChange, hide }) => {
  const [client, setClient] = useState({});

  useEffect(() => {
    onClientChange(client);
  }, [client]);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className={`${!hide ? "h-0" : "h-auto"} p-2`}>
      <div className={`${!hide ? "hidden" : "block"} pb-2 px-2`}>
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
