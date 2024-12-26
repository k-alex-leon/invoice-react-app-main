import React from "react";
import { timestampToDate } from "../../utils/Validations";

const InvoiceCard = ({ clientName, sellerName, date }) => {
  return (
    <div className="shadow border bg-white p-4 hover:border-slate-800 hover:cursor-pointer flex flex-col gap-4 justify-around">
      <h1 className="text-xl font-bold text-center">{timestampToDate(date)}</h1>
      <div className="w-full text-xs">
        <p>Cliente:</p>
        <p className="w-full"><b>{clientName}</b></p>
        <p>Vendedor:</p>
        <p className="w-full"><b>{sellerName}</b></p>
      </div>
    </div>
  );
};

export default InvoiceCard;
