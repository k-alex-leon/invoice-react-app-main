import React from "react";
import { timestampToDate } from "../../utils/Validations";
import useData from "../../hooks/useData";

const InvoiceCard = ({ client, company, date, id }) => {
  const { setCurrentInvoiceData, setCurrentInvoiceId } = useData();

  const handleOnClick = (e) => {
    e.preventDefault();
    setCurrentInvoiceData({
      id,
      client,
      company,
      date,
    });

    // send a new id to current invoice to change the products
    setCurrentInvoiceId(id);
  };

  return (
    <div
      onClick={handleOnClick}
      className="shadow border bg-white p-4 hover:border-slate-800 hover:cursor-pointer flex flex-col gap-4 justify-around"
    >
      <h1 className="text-xl font-bold text-center">{timestampToDate(date)}</h1>
      <div className="w-full text-xs">
        <p>Cliente:</p>
        <p className="w-full">
          <b>{client.name}</b>
        </p>
        <p>Vendedor:</p>
        <p className="w-full">
          <b>{company.name}</b>
        </p>
      </div>
    </div>
  );
};

export default InvoiceCard;
