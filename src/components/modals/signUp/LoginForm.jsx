import { useState } from "react";
import useAuth from "../../../auth/hooks/useAuth";
import {
  notify_error,
  notify_success,
  notify_warning,
} from "../../../utils/Notifications";

export function LoginForm({ onRegisterClick, closeModal }) {
  const [userData, setUserData] = useState({});
  const { login } = useAuth();

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (userData.email === undefined || userData.password === undefined) {
      notify_warning("Por favor llena todos los campos");
      return;
    }

    loginUser();
  };

  const loginUser = async () => {
    const { email, password } = userData;

    login(
      { email, password },
      (msg) => {
        notify_success(msg);
        closeModal();
      },
      (msg) => {
        notify_error(msg);
      }
    );
  };

  return (
    <form className="p-2" onSubmit={handleOnSubmit}>
      <div className="pb-2">
        <div className="space-y-1 mt-1">
          <input
            type="email"
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="email"
            onChange={handleValueChange}
            placeholder="Escribe tu correo"
          />
          <input
            type="password"
            className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
            name="password"
            onChange={handleValueChange}
            placeholder="Escribe tu contraseña"
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full flex space-x-2">
        <button
          type="button"
          onClick={() => onRegisterClick()}
          className="bg-blue-700 text-white p-2 rounded-lg w-1/2"
        >
          Registrarme
        </button>
        <button
          type="submit"
          className="bg-green-900 text-white p-2 rounded-lg w-1/2"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
