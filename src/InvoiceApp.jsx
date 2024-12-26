import React, { useEffect, useState } from "react";
import ItemView from "./components/ItemView";
import InvoiceView from "./components/InvoiceView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpModal from "./components/modals/signUp/SignUpModal";
import useAuth from "./auth/hooks/useAuth";
import Loading from "./components/Loading";
import { notify_error, notify_success } from "./utils/Notifications";
import useData from "./hooks/useData";
import InvoiceSection from "./components/InvoiceSection";
import InvoicesList from "./components/InvoicesList/InvoicesList";

export default function InvoiceApp() {
  const { user, loading } = useAuth();
  const { addProduct } = useData();

  const handleItem = (item) => {
    addProduct(
      item,
      (msg) => {
        notify_success(msg);
      },
      (msg) => {
        notify_error(msg);
      }
    );
  };

  return (
    <div className="w-full h-full py-2">
      {!user && <SignUpModal/>}
      {/* {loading && <Loading />} */}
      <div className="gap-4 h-full grid grid-cols-2 grid-rows-1 justify-center items-center p-4 ">
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 md:block">
          <InvoicesList />
          <InvoiceSection />
          {/* <ClientView onClientChange={handleClient} /> */}

          <ItemView onItemChange={handleItem} />
        </div>

        <InvoiceView />
      </div>
      <ToastContainer />
    </div>
  );
}
