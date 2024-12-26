import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import CompanyForm from "./forms/CompanyForm";
import { useEffect, useRef, useState } from "react";
import ClientForm from "./Forms/ClientForm";
import useData from "../hooks/useData";
import { validateInvoice } from "../utils/Validations";
import useAuth from "../auth/hooks/useAuth";
import { notify_error, notify_success } from "../utils/Notifications";
import { Timestamp } from "firebase/firestore";

const InvoiceSection = () => {
  const { user } = useAuth();
  const butonRef = useRef(null);
  const [isDisplayed, setIsDisplayed] = useState(true);
  const buttonSaveRef = useRef();
  const [thisCompany, setCompany] = useState(null);
  const [thisClient, setClient] = useState(null);
  const { createInvoice } = useData();

  // creates a first version with some basic data
  const initInvoice = () => {
    if (!thisCompany || !thisClient) return;

    // instance the date of the invoice
    let date = new Date();
    const timestamp = Timestamp.fromDate(date);

    createInvoice(
      {
        date: timestamp,
        company: thisCompany,
        client: thisClient,
        makerId: user.uid,
      },
      (msg) => {
        notify_success(msg);
      },
      (msg) => {
        notify_error(msg);
      }
    );
  };

  const onSaveClick = () => {
    if (!validateInvoice(thisCompany, thisClient)) return;

    initInvoice();
    buttonSaveRef.current.style.backgroundColor = "green";
    buttonSaveRef.current.disabled = true;
    buttonSaveRef.current.textContent = "Guardado";
  };

  // waits for the company and client to be set

  const handleContract = () => {
    setIsDisplayed(!isDisplayed);
    butonRef.current.style.transform = `rotate(${
      isDisplayed ? "180" : "0"
    }deg)`;
  };

  return (
    <div className="shadow relative bg-zinc-100">
      <h1 className="font-bold px-4 py-2 text-2xl text-white bg-slate-800">
        Datos de compra
      </h1>
      <button
        ref={butonRef}
        onClick={() => handleContract()}
        className="absolute right-4 top-4 text-white"
      >
        <FaArrowCircleUp />
      </button>

      <div className={`${isDisplayed ? "h-auto block" : "h-0 hidden"} p-4`}>
        <CompanyForm
          onCompanyChange={(data) => setCompany(data)}
          hide={isDisplayed}
        />
        <ClientForm
          onClientChange={(data) => setClient(data)}
          hide={isDisplayed}
        />

        <button
          type="button"
          ref={buttonSaveRef}
          onClick={onSaveClick}
          className="w-full mt-2 bg-slate-800 text-white p-2 rounded-lg"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default InvoiceSection;
