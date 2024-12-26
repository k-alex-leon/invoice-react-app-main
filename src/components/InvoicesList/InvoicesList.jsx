import React, { useEffect, useState } from "react";
import InvoiceCard from "./InvoiceCard";
import { MdNavigateNext } from "react-icons/md";
import useAuth from "../../auth/hooks/useAuth";
import useData from "../../hooks/useData";
import { use } from "react";
import { notify_error } from "../../utils/Notifications";

const InvoicesList = () => {
  const { user } = useAuth();
  const { getInvoicesByUser } = useData();
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (!invoices) {
      getInvoicesByUser(
        user.uid,
        (data) => {
          setInvoices(data);
          console.log(data);
        },
        notify_error
      );
    }
  }, [invoices, user]);
  return (
    <div className="w-full h-auto">
      <div className="relative w-full px-4 py-2 space-y-2 bg-slate-800">
        <h1 className="text-white text-2xl font-bold">Facturas anteriores</h1>
        <button className="absolute right-6 place-self-center top-0 bottom-0 hover:bg-slate-900 text-gray-600 hover:text-white p-2 rounded-full z-10">
          <MdNavigateNext scale={10} />
        </button>

        <button className="absolute left-6  place-self-center top-0 bottom-0 hover:bg-slate-900 text-gray-600 hover:text-white rotate-180 p-2 rounded-full z-10">
          <MdNavigateNext scale={10} />
        </button>
        <div className="flex gap-4 relative w-full h-60 p-4 bg-slate-200 overflow-x-auto">
          {invoices &&
            invoices.map(({ id, client, company, date }) => (
              <InvoiceCard
                key={id}
                clientName={client.name}
                sellerName={company.seller}
                date={date}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InvoicesList;
