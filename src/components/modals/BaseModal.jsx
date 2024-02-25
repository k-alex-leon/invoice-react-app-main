import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { GrClose } from "react-icons/gr";
import BodyModal from "./BodyModal";

const modalStyles = {
  content: {
    top: "10%",
    with: "90%",
    padding: "0",
    minHeight: "60%",
  },
};

const BaseModal = ({ isVisible, onClose, form, onDataChange }) => {
  const afterOpenModal = () => {};
  const [thisForm, setForm] = useState({});

  useEffect(() => {
    setForm(form);
  }, [form]);

  return (
    <ReactModal
      isOpen={isVisible}
      onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div className="flex flex-col mx-4">
        <button
          onClick={() => onClose()}
          className="w-4 h-4 p-2 self-end rounded-full hover:bg-slate-200"
        >
          <GrClose />
        </button>
        <div className="flex flex-col justify-center mt-6 w-full space-y-2">
          <h1 className="text-lg font-bold text-center">
            {form && form.title}
          </h1>

          <BodyModal form={form} onDataChange={onDataChange}/>
        </div>
      </div>
    </ReactModal>
  );
};

export default BaseModal;
