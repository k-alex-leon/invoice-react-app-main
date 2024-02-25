import ClientForm from "./Forms/ClientForm";

const ClientView = ({ onClientChange }) => {
  

  return (
    <div className="shadow bg-zinc-100 h-1/3">
      <h1 className="font-bold px-4 py-2 text-2xl text-white bg-slate-800">
        Datos del cliente
      </h1>
      <ClientForm onClientChange={onClientChange} />
    </div>
  );
};

export default ClientView;
