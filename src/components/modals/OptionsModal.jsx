import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import ReactModal from 'react-modal';
import { options } from "../../data/OptionsList";

const customStyles = {
  content: {
    top: '30%',
    with : '80%',
    padding : '0',
    height : '30%',
  },
};

const OptionsModal = ({ isVisible, onClose, label, onOptionSelected }) => {

  const afterOpenModal = () => {}

  useEffect(() => {
    console.log(options[0]);
  }, [])

  return (
    <>
      <ReactModal
        isOpen={isVisible}
        onAfterOpen={afterOpenModal}
        onRequestClose={onClose}
        contentLabel={label}
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="flex flex-col mx-4">
        <button onClick={() => onClose()} className="w-4 h-4 p-2 self-end rounded-full hover:bg-slate-200">
          <GrClose />
        </button>
        <div className="flex flex-col justify-center mt-6 w-full space-y-2">
          <button onClick={() => onOptionSelected(options[0])} className="bg-teal-900 rounded shadow p-2 text-white font-bold">Vendedor</button>
          <button onClick={() => onOptionSelected(options[1])} className="bg-teal-900 rounded shadow p-2 text-white font-bold">Cliente</button>
          <button onClick={() => onOptionSelected(options[2])} className="bg-teal-900 rounded shadow p-2 text-white font-bold">Producto</button>
        </div>
        </div>

      </ReactModal>
    </>
  );
};

export default OptionsModal;
