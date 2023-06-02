import React, { createContext, useState, useEffect } from "react";

// FIREBASE
import fb from '../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  //--- FIREBASE
  const auth = getAuth(fb);
  const db = getFirestore(fb);

  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [adressUser, setAdressUser] = useState('');
  const [cityUser, setCityUser] = useState('');
  const [estadoUser, setEstadoUser] = useState('');
  const [cepUser, setCepUser] = useState('');
  const [foneUser, setFoneUser] = useState('');
  const [responsavelUser, setResponsavelUser] = useState('');
  const [meioContatoUser, setMeioContatoUser] = useState('');
  const [nivelAcess, setNivelAcess] = useState('');
  const [idEmpresa, setIdEmpresa] = useState('');
  const [referenciaExternaA, setReferenciaExternaA] = useState('');
  const [user, setUser] = useState({ id: '', email: '', });

  const updateUser = (id, email) => {
    setUser({ id, email });
    getUserFirestore(email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUser(user.uid, user.email);
      } else {
        updateUser(null, null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // BUSCAR USUÁRIOS NO FIRESTORE
  const [users, setUsers] = useState([]);

  useEffect(() => {
    users.forEach((doc) => {
      setNameUser(doc.name);
      setEmailUser(doc.email);
      setAdressUser(doc.adress);
      setEstadoUser(doc.estado);
      setCityUser(doc.city);
      setCepUser(doc.cep);
      setFoneUser(doc.fone);
      setResponsavelUser(doc.name_responsavel);
      setMeioContatoUser(doc.meio_contato);
      setNivelAcess(doc.nivel_acess);
      setIdEmpresa(doc.empresa);
      setReferenciaExternaA(doc.referencia_externa_a);
    })
  }, [users]);

  async function getUserFirestore(email) {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);

      const userBoards = [];

      querySnapshot.forEach((doc) => {
        const columnData = doc.data();

        if (columnData.email === email ) {
          const column = {
            id: doc.id,
            ...columnData,
          };

          userBoards.push(column);
        }
      });
      setUsers(userBoards);
    } catch (e) {
      console.error("Erro ao recuperar usuários: ", e);
    }
  }

  return (
    <UserContext.Provider value={{ referenciaExternaA, idEmpresa, users, user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess }}>
      {children}
    </UserContext.Provider>
  );
};
