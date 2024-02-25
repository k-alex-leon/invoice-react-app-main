import { useEffect, useState } from "react";


const CompanyForm = ({onCompanyChange}) => {
  const [company, setCompany] = useState({});

  useEffect(() => {
    onCompanyChange(company);
  }, [company]);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className="mt-4 pb-2 px-2">
        <div className="sm:flex space-y-1 sm:space-x-2 sm:space-y-0 mt-1">
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="name"
            onChange={handleValueChange}
            placeholder="Nombre de la empresa"
          />
          <input
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="seller"
            onChange={handleValueChange}
            placeholder="Nombre del vendedor"
          />
        </div>
        <div className="sm:flex space-y-1 sm:space-x-2 sm:space-y-0 mt-1">
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
          className="border w-full mt-1 rounded-lg border-slate-200 hover:border-slate-500 p-2"
          name="email"
          type="email"
          onChange={handleValueChange}
          placeholder="Correo ( Opcional )"
        />
      </div>
    </form>
  );
};

export default CompanyForm;
