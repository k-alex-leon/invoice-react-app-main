import { createContext, useCallback, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase.config";

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged = useCallback((firebaseUser) => {
    if (firebaseUser) setUser(firebaseUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChanged);
    return unsubscribe;
  }, [onAuthStateChanged]);

  const signIn = async (newUser, successCallback, errorCallback) => {
    setLoading(true);

    try {
      let res = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      if (res.user) {
        setUser(res.user);
        return successCallback("Inicio de sesión exitoso");
      }

      return errorCallback("Crendeiales incorrectas");
    } catch (error) {
      return errorCallback("Error al iniciar sesión");
    }
  };

  const login = async (newUser, successCallback, errorCallback) => {
    setLoading(true);

    try {
      let res = await signInWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      if (res.user) {
        setUser(res.user);
        return successCallback("Inicio de sesión exitoso");
      }

      return errorCallback("Crendeiales incorrectas");
    } catch (error) {
      return errorCallback("Error al iniciar sesión");
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
