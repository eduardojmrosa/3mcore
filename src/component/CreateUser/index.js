import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';

// STYLE
import './style.css'

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { UserContext } from '../../contexts/UserContext';


// FIREBASE
import fb from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';


function CreateUser() {

    //--- FIREBASE
    const auth = getAuth(fb);
    const db = getFirestore(fb);

    const { openCloseCreateUserModal } = useContext(BoardContext);
    const { idEmpresa, use, nivelAcess } = useContext(UserContext);


    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [senhaUser, setSenhaUser] = useState('');
    const [confirmSenhaUser, setConfirmSenhaUser] = useState('');
    const [adressUser, setAdressUser] = useState('');
    const [cityUser, setCityUser] = useState('');
    const [estadoUser, setEstadoUser] = useState('');
    const [cepUser, setCepUser] = useState('');
    const [foneUser, setFoneUser] = useState('');
    const [nameResponsavelUser, setNameResponsavelUser] = useState('Selecione o responsável...');
    const [meioContatoUser, setMeioContatoUser] = useState('Selecione o meio de contato...');
    const [nivelAcessUser, setNivelAcess] = useState('Cliente');

    const [nameEmpresa, setNameEmpresa] = useState('');

    function validationForm() {
        let isValid = true;

        if (nameUser.length < 5) {
            alert('Nome vazio ou pequeno!');
            isValid = false;
        }

        if (idEmpresa == '') {
            alert('Id Empresa Vazio!');
            //isValid = false;
        }

        if (nameResponsavelUser == 'Selecione o responsável...') {
            alert('Precisa ter um responsável!');
            isValid = false;
        }

        if ((senhaUser !== confirmSenhaUser || senhaUser.length < 5) && nivelAcessUser !== 'Cliente') {
            alert('As senhas estão diferentes!');
            isValid = false;
        }

        if (isValid) {
            createUser(emailUser, senhaUser);
        }
    }

    // CRIAR UM NOVO USUÁRIO NO AUTH
    function createUser(email, password) {

        if (nivelAcessUser !== 'Cliente') {

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    //const user = userCredential.user;
                    addUserFirestore();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        } else {
            addUserFirestore();
        }
    }


    // BUSCAR USUÁRIOS NO FIRESTORE

    useEffect(() => {
        getUserFirestore();
    }, []);


    async function getUserFirestore() {
        try {
            const usersCollectionRef = collection(db, 'users');
           // const querySnapshot = await getDocs(usersCollectionRef);

            const querySnapshot = await getDocs(query(
                usersCollectionRef,
                where('empresa', '==', idEmpresa)
              ));

            const options = querySnapshot.docs
                .filter((doc) => doc.data().nivel_acess !== 'Cliente')
                .map((doc) => {
                    const userData = doc.data();
                    return {
                        name: userData.name,
                    };
                });

            setListaUsers(options);
            getEmpresasFirestore();
            console.log(options);
        } catch (e) {
            console.error("Erro ao recuperar usuários: ", e);
        }
    }



    // BUSCAR EMPRESAS NO FIRESTORE

    const [listaEmpresas, setListaEmpresas] = useState([]);

    function setInfosEmpresa(id, name) {
        openCloseSelectEmpresa();

    }

    const [selectedEmpresa, setSelectedEmpresa] = useState(false);
    function openCloseSelectEmpresa() {
        setSelectedEmpresa(!selectedEmpresa);
    }



    async function getEmpresasFirestore() {
        try {
          const empresasCollectionRef = collection(db, 'empresas');
          const querySnapshot = await getDocs(empresasCollectionRef);
    
          const userBoards = [];
    
          querySnapshot.forEach((doc) => {
            const columnData = doc.data();
    
              const column = {
                id: doc.id,
                ...columnData,
              };
    
              userBoards.push(column);
            })

            
          setListaEmpresas(userBoards);
        } catch (e) {
          console.error("Erro ao recuperar usuários: ", e);
        }
      }
    


    // CRIAR UM NOVO USUÁRIO NO FIRESTORE
    async function addUserFirestore() {

        try {
            const usersCollectionRef = collection(db, 'users');
            const docRef = await addDoc(usersCollectionRef, {
                name: nameUser,
                email: emailUser,
                adress: adressUser,
                city: cityUser,
                estado: estadoUser,
                cep: cepUser,
                fone: foneUser,
                name_responsavel: nameResponsavelUser,
                nivel_acess: nivelAcessUser,
                meio_contato: meioContatoUser,
                empresa: idEmpresa,
            });


            //const newUserId = docRef.id;

            openCloseCreateUserModal();

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    // SELECT USER

    const [listaUsers, setListaUsers] = useState([]);

    function selectUser(name) {
        setNameResponsavelUser(name);
        openCloseSelectUser();
    }

    const [selectedUser, setSelectedUser] = useState(false);
    function openCloseSelectUser() {
        setSelectedUser(!selectedUser);
    }

    // SELECT MEIO DE CONTATO

    function selectMeioContato(name) {
        setMeioContatoUser(name);
        openCloseSelectMeioContato();
    }
    const [selectedMeioContato, setSelectedMeioContato] = useState(false);
    function openCloseSelectMeioContato() {
        setSelectedMeioContato(!selectedMeioContato);
    }

    const meioContato = [
        { meio: 'Outro' },
        { meio: 'Site' },
        { meio: 'Facebook' },
        { meio: 'Instagram' },
        { meio: 'WhatsApp' },
        { meio: 'LinkedIn' },
        { meio: 'Google' },
        { meio: 'Email' },
        { meio: 'Telefone' },
        { meio: 'Recomendação' }
    ];

    // TIPO DE USUÁRIO

    const [selectedTypeUser, setSelectedTypeUser] = useState(false);

    useEffect(() => {

        if (nivelAcessUser !== 'Cliente') {
            setSelectedTypeUser(true);
            // 
        } else {
            setSelectedTypeUser(false);
        }
    }, [nivelAcessUser])


    return (
        <div className='modal-create-user-container'>
            <div className='create-user-container'>
                <div className='create-user-header'>
                    <div className='title'>Novo Participante</div>
                    <div className='btn-close-container'>
                        <button className='btn-close' onClick={openCloseCreateUserModal}>X</button>
                    </div>
                </div>
                <div className='create-user-body'>
                    <label className='title'>Tipo</label>
                    <div className='btns-nivel-acess' >
                        {(nivelAcess === 'SuperAdmSuiteFlow')  ? (
                            <button
                                className='btn-acess'
                                onClick={() => setNivelAcess('adm')}
                                style={{ backgroundColor: nivelAcessUser === 'adm' ? 'rgb(252, 34, 118)' : 'rgb(179, 179, 179)', }}>Adm</button>
                        ) : <></>}
                        {(nivelAcess === 'SuperAdmSuiteFlow') || (nivelAcess === 'adm') ? (
                            <button
                                className='btn-acess'
                                onClick={() => setNivelAcess('Supervisor')}
                                style={{ backgroundColor: nivelAcessUser === 'Supervisor' ? 'rgb(252, 34, 118)' : 'rgb(179, 179, 179)', }}>Supervisor</button>
                        ) : <></>}
                        {(nivelAcess === 'SuperAdmSuiteFlow') || (nivelAcess === 'adm') || (nivelAcess === 'Supervisor') ? (
                            <button
                                className='btn-acess'
                                onClick={() => setNivelAcess('Parceiro')}
                                style={{ backgroundColor: nivelAcessUser === 'Parceiro' ? 'rgb(252, 34, 118)' : 'rgb(179, 179, 179)', }}>Parceiro</button>
                        ) : <></>}
                        {(nivelAcess === 'SuperAdmSuiteFlow') || (nivelAcess === 'adm') || (nivelAcess === 'Supervisor') || (nivelAcess === 'Parceiro') ? (
                            <button
                                className='btn-acess'
                                onClick={() => setNivelAcess('Cliente')}
                                style={{ backgroundColor: nivelAcessUser === 'Cliente' ? 'rgb(252, 34, 118)' : 'rgb(179, 179, 179)', }}>Cliente</button>
                        ) : <></>}
                    </div>


                    { ( nivelAcess === 'SuperAdmSuiteFlow' ) && ( nivelAcessUser != 'Cliente' )  && ( nivelAcessUser != 'Supervisor' ) && ( nivelAcessUser != 'Parceiro' )? (
                        <div>
                            <label className='title'>Empresas</label>
                            <input className='input-create-user' type='text' value={nameEmpresa || ''} onClick={openCloseSelectEmpresa} placeholder={'Selecione o responsável...'}></input>
                            {selectedEmpresa ? (
                                <div className='user-select'>
                                    {
                                        listaEmpresas.map((item) => <li key={item.id} className='item-list-select' onClick={() => setInfosEmpresa(item.id, item.name)}>{item.name}</li>)
                                    }
                                </div>
                            ) : <></>}
                        </div>
                    ) : <></>}


                    <label className='title'>Nome</label>
                    <input className='input-create-user' type='text' onChange={(e) => setNameUser(e.target.value)} placeholder={'Digite o nome...'}></input>
                    <label className='title'>Email</label>
                    <input className='input-create-user' type='email' onChange={(e) => setEmailUser(e.target.value)} placeholder={'Digite o email...'}></input>
                    {selectedTypeUser ? (
                        <div>
                            <label className='title'>Senha</label>
                            <input className='input-create-user' type='password' onChange={(e) => setSenhaUser(e.target.value)} placeholder={'Digite a senha...'}></input>
                            <label className='title'>Confirmar Senha</label>
                            <input className='input-create-user' type='password' onChange={(e) => setConfirmSenhaUser(e.target.value)} placeholder={'Confirme a senha...'}></input>
                        </div>
                    ) : <></>}
                    <label className='title'>Endereço</label>
                    <input className='input-create-user' type='text' onChange={(e) => setAdressUser(e.target.value)} placeholder={'Digite o endereço...'}></input>
                    <label className='title'>Cidade</label>
                    <input className='input-create-user' type='text' onChange={(e) => setCityUser(e.target.value)} placeholder={'Digite a cidade...'}></input>
                    <label className='title'>Estado</label>
                    <input className='input-create-user' type='text' onChange={(e) => setEstadoUser(e.target.value)} placeholder={'Digite o estado...'}></input>
                    <label className='title'>CEP</label>
                    <input className='input-create-user' type='text' onChange={(e) => setCepUser(e.target.value)} placeholder={'Digite o CEP...'}></input>
                    <label className='title'>Fone</label>
                    <input className='input-create-user' type='tel' onChange={(e) => setFoneUser(e.target.value)} placeholder={'Digite o fone...'}></input>
                    <label className='title'>Responsável</label>
                    <input className='input-create-user' type='text' value={nameResponsavelUser || ''} onClick={openCloseSelectUser} placeholder={'Selecione o responsável...'}></input>
                    {selectedUser ? (
                        <div className='user-select'>
                            {
                                listaUsers.map((item) => <li key={item.id} className='item-list-select' onClick={() => selectUser(item.name)}>{item.name}</li>)
                            }
                        </div>
                    ) : <></>}
                    <label className='title'>Meio de Contato</label>
                    <input className='input-create-user' type='text' value={meioContatoUser || ''} onClick={openCloseSelectMeioContato} placeholder={'Selecione o meio de contato...'}></input>
                    {selectedMeioContato ? (
                        <div className='user-select'>
                            {
                                meioContato.map((item) => <li key={item.id} className='item-list-select' onClick={() => selectMeioContato(item.meio)}>{item.meio}</li>)
                            }
                        </div>
                    ) : <></>}
                </div>
                <div className='create-user-footer'>
                    <button className='btn-cancel' onClick={openCloseCreateUserModal}>Cancelar</button>
                    <button className='btn-save' onClick={validationForm}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;