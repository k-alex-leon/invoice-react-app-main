import { useState } from "react";
import useAuth from "../../../auth/hooks/useAuth";
import { notify_error, notify_success, notify_warning } from "../../../utils/Notifications";

export function CreateAccountForm({ onLoginClick, closeModal }) {
    const [userData, setUserData] = useState({});
    const { signIn } = useAuth();
  
    const handleValueChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (userData.password !== userData.confirmPassword) {
        notify_error("Las contraseñas no coinciden");
        return;
      }
  
      if (userData.password && userData.password.length < 6) {
        notify_warning("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (userData.email === undefined || userData.password === undefined) {
        notify_warning("Por favor llena todos los campos");
        return;
      }
  
      signUser();
    };
  
    const signUser = async () => {
      const { email, password } = userData;
  
      signIn(
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
              placeholder="Escoge una contraseña"
            />
            <input
              type="password"
              className="border w-full rounded-lg border-slate-200 hover:border-slate-500 p-2"
              name="confirmPassword"
              onChange={handleValueChange}
              placeholder="Repite tu contraseña"
            />
          </div>
        </div>
  
        <div className="absolute w-full bottom-0 grid md:grid-cols-2 grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => onLoginClick()}
            className="bg-cyan-900 text-white p-2 rounded-lg w-full"
          >
            Ya tengo cuenta
          </button>
          <button
            type="submit"
            className="bg-green-900 text-white p-2 rounded-lg w-full"
          >
            Crear
          </button>
        </div>
      </form>
    );
  }