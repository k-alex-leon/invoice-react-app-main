import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { MODAL_STYLES } from "../../../constants";
import { CreateAccountForm } from "./CreateAccountForm";
import { LoginForm } from "./LoginForm";

const SignUpModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ReactModal
      isOpen={isVisible}
      //   onAfterOpen={afterOpenModal}
      // onRequestClose={onClose}
      ariaHideApp={false}
      style={MODAL_STYLES}
    >
      <div className="w-full relative h-full flex flex-col justify-start text-center py-4">
        <h2 className="w-full top-0 h-10 bg-cyan-700 text-white text-2xl">
          Accede a la plataforma
        </h2>

        {!isLogin ? (
          <CreateAccountForm onLoginClick={() => changeForm()} closeModal={() => setIsVisible(false)} />
        ) : (
          <LoginForm onRegisterClick={() => changeForm()} closeModal={() => setIsVisible(false)} />
        )}
      </div>
    </ReactModal>
  );
};

export default SignUpModal;
