import { useRef, useState } from "react";
import ClientForm from "./Forms/ClientForm";
import { FaArrowCircleUp } from "react-icons/fa";

const ClientView = ({ onClientChange }) => {
  const butonRef = useRef(null);
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleContract = () => {
    setIsDisplayed(!isDisplayed);
    butonRef.current.style.transform = `rotate(${
      isDisplayed ? "180" : "0"
    }deg)`;
  };

  return (
    <div className="shadow relative bg-zinc-100 h-auto">
      <h1 className="font-bold px-4 py-2 text-2xl text-white bg-slate-800">
        Datos del cliente
      </h1>
      <button
        ref={butonRef}
        onClick={() => handleContract()}
        className="absolute right-4 top-4 text-white"
      >
        <FaArrowCircleUp />
      </button>
      <ClientForm onClientChange={onClientChange} hide={isDisplayed}/>
    </div>
  );
};

export default ClientView;
