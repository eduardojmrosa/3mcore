import React, { useContext, useEffect, useState } from 'react'

// STYLE
import './style.css'

// COMPONENTS
import CreateUser from '../../component/CreateUser';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';

// FIREBASE
import fb from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';


function Users() {

    //--- FIREBASE
    const db = getFirestore(fb);

    const { createUserModal, openCloseCreateUserModal } = useContext(BoardContext);

    const [users, setUsers] = useState([]);

    // BUSCAR USUÁRIOS NO FIRESTORE

    useEffect(() => {
        getUserFirestore();
    }, []);


    async function getUserFirestore() {
        try {
            const usersCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollectionRef);

            const options = querySnapshot.docs
                //.filter((doc) => doc.data().nivel_acess === 'Cliente')
                .map((doc) => {
                    const userData = doc.data();
                    return {
                        nivel_acess: userData.nivel_acess,
                        name: userData.name,
                        email: userData.email,
                        adress: userData.adress,
                        city: userData.city,
                        estado: userData.estado,
                        cep: userData.cep,
                        fone: userData.fone,
                        responsavel: userData.responsavel,
                        meio_contato: userData.meio_contato,
                    };
                });

            setUsers(options);
            console.log(options);
        } catch (e) {
            console.error("Erro ao recuperar usuários: ", e);
        }
    }

    return (
        <div className='users-container'>
            <div className='users-header'>
                <label className='title'>Participantes</label>
                <button className='btn-create-user' onClick={openCloseCreateUserModal}>Adicionar</button>
            </div>
            <div className='users-body'>
                <div className='lista-users-container'>
                    <div className='lista-users'>
                        <h2 className='header-lista'>ID</h2>
                        {
                            users.map((item, index) =>
                                <li key={index} className='item-user'> {item.id} </li>,
                            )
                        }
                    </div>

                    <div className='lista-users'>
                        <h2 className='header-lista'>Nome</h2>
                        {
                            users.map((item, index) =>
                                <li key={index} className='item-user'> {item.name} </li>,
                            )
                        }
                    </div>

                    <div className='lista-users'>
                        <h2 className='header-lista'>Email</h2>
                        {
                            users.map((item, index) =>
                                <li key={index} className='item-user'> {item.email} </li>,
                            )
                        }
                    </div>

                    <div className='lista-users'>
                        <h2 className='header-lista'>Responsável</h2>
                        {
                            users.map((item, index) =>
                                <li key={index} className='item-user'> {item.responsavel} </li>,
                            )
                        }
                    </div>

                    <div className='lista-users'>
                        <h2 className='header-lista'>Tipo</h2>
                        {
                            users.map((item, index) =>
                                <li key={index} className='item-user'> {item.nivel_acess} </li>,
                            )
                        }
                    </div>

                </div>
            </div>
            {createUserModal ? (<CreateUser />) : <></>}
        </div>
    );
}
export default Users;