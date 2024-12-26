import React, { useEffect, useRef, useState } from "react";
import InvoiceCard from "./InvoiceCard";
import { MdNavigateNext } from "react-icons/md";
import useAuth from "../../auth/hooks/useAuth";
import useData from "../../hooks/useData";
import { use } from "react";
import { notify_error } from "../../utils/Notifications";
import { FaArrowCircleUp } from "react-icons/fa";

const InvoicesList = () => {
  const { user } = useAuth();
  const { getInvoicesByUser } = useData();
  const [invoices, setInvoices] = useState(null);
  const [isDisplayed, setIsDisplayed] = useState(true);
  const butonRef = useRef();

  useEffect(() => {
    if (!user) return;
    if (!invoices) {
      getInvoicesByUser(
        user.uid,
        (data) => {
          setInvoices(data);
        },
        notify_error
      );
    }
  }, [invoices, user]);

  const handleContract = () => {
    setIsDisplayed(!isDisplayed);
    butonRef.current.style.transform = `rotate(${
      isDisplayed ? "180" : "0"
    }deg)`;
  };
  return (
    <div className="w-full h-auto">
      <div className="relative w-full px-4 py-2 space-y-2 bg-slate-800">
        <h1 className="text-white text-2xl font-bold">Facturas anteriores</h1>

        <button
          ref={butonRef}
          onClick={() => handleContract()}
          className="absolute right-4 top-2 text-white"
        >
          <FaArrowCircleUp />
        </button>

        <div
          className={`flex gap-4 relative w-full h-60 p-4 bg-slate-200 overflow-x-auto ${
            isDisplayed ? "h-auto block" : "h-0 hidden"
          }`}
        >
          {invoices ? (
            invoices.map(({ id, client, company, date }) => (
              <InvoiceCard
                key={id}
                id={id}
                client={client}
                company={company}
                date={date}
              />
            ))
          ) : (
            <h4 className="absolute text-lg text-center left-0 w-full">
              No tienes facturas
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesList;
