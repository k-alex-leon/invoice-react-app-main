import CompanyForm from "./forms/CompanyForm";

const CompanyView = ({ onCompanyChange }) => {

  return (
    <div className="shadow bg-zinc-100 h-1/3">
      <h1 className="font-bold px-4 py-2 text-2xl text-white bg-slate-800">
        Datos del vendedor
      </h1>
      <CompanyForm onCompanyChange={onCompanyChange} />
    </div>
  );
};

export default CompanyView;
