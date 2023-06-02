import React, { useContext, useEffect, useState } from 'react'
import './style.css'

// DATA
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { UserContext } from '../../contexts/UserContext';
import { ColumnContext } from '../../contexts/ColumnContext';
import { CardContext } from '../../contexts/CardContext';

// FIREBASE
import fb from '../../config/firebase';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

import { MdAccessAlarms, MdAlternateEmail, MdGrade, MdPhone, MdAccountBalance, MdCalendarMonth, MdOutlineAttachMoney, MdArticle, MdAccountBalanceWallet } from "react-icons/md";

function CreateCard() {

    //--- FIREBASE
    const db = getFirestore(fb);

    const { openCloseCreateCardModal } = useContext(BoardContext);

    const { idEmpresa, user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess } = useContext(UserContext);

    const { idColumn, setIdColumn, nameColumn, setNameColumn } = useContext(ColumnContext);

    const [documentCard, setDocumentCard] = useState('');
    const [nameCard, setNameCard] = useState('');
    const [nameObraCard, setNameObraCard] = useState('');
    const [valorCard, setValorCard] = useState(0);
    const [cityCard, setCityCard] = useState('');
    const [estadoCard, setEstadoCard] = useState('');
    const [foneCard, setFoneCard] = useState('');
    const [emailCard, setEmailCard] = useState('');
    const [previsaoCard, setPrevisaoCard] = useState('');
    const [meioContatoCard, setMeioContatoCard] = useState('Selecione o meio de contato...');
    const [date, setDate] = useState('');
    const [nivel, setNivel] = useState(1);
    const [etiquetaCard, setEtiquetaCard] = useState('Outro');

    const { listaCards, setListaCards, listaEtiquetas } = useContext(CardContext);


    function validationForm() {
        addCardFirestore();
    }

    useEffect(() => {
        getCurrentDate();
    }, [])

    function getCurrentDate() {
        const date = new Date();
        const diaSemana = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();
        const data = diaSemana + '/' + mes + '/' + ano;
        setDate(data);
        return data;
    }

    // CRIAR UM NOVO USUÁRIO NO FIRESTORE
    async function addCardFirestore() {
        // alert(idEmpresa);

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;


        try {
            const cardsCollectionRef = collection(db, 'cards');
            const docRef = await addDoc(cardsCollectionRef, {
                document_card: documentCard,
                name: nameCard,
                name_obra: nameObraCard,
                valor: valorCard,
                email: emailCard,
                fone: foneCard,
                city: cityCard,
                estado: estadoCard,
                previsao: previsaoCard ? previsaoCard : getCurrentDate(),
                meio_contato: meioContatoCard,
                create_by: emailUser,
                nivel_acess: nivelAcess,
                responsavel: responsavelUser,
                name_user: nameUser,
                id_column: idColumn,
                date: date,
                nivel: nivel,
                etiqueta: etiquetaCard,
                empresa: idEmpresa,
                motivo_perca: '',
                modification_date: formattedDate,
            });

            const idCard = docRef.id;

            const novoItem = {
                id: idCard,
                document_card: documentCard,
                name: nameCard,
                name_obra: nameObraCard,
                valor: valorCard,
                email: emailCard,
                fone: foneCard,
                city: cityCard,
                estado: estadoCard,
                previsao: previsaoCard ? previsaoCard : getCurrentDate(),
                meio_contato: meioContatoCard,
                create_by: emailUser,
                nivel_acess: nivelAcess,
                responsavel: responsavelUser,
                name_user: nameUser,
                id_column: idColumn,
                date: date,
                nivel: nivel,
                etiqueta: etiquetaCard,
                empresa: idEmpresa,
                motivo_perca: '',
                modification_date: formattedDate,
            };

            const listaCardsAtualizada = [...listaCards, novoItem];
            setListaCards(listaCardsAtualizada);

            openCloseCreateCardModal();

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    // SELECT MEIO DE CONTATO

    function selectMeioContato(name) {
        setMeioContatoCard(name);
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


    // ----- date ----
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPrevisaoCard(format(date, 'dd/MM/yyyy'));
    };



    return (
        <div className='modal-create-card-container'>
            <div className='create-card-container'>
                <div className='create-card-header'>
                    <div className='title'>Novo Card</div>
                    <div className='btn-close-container'>
                        <button className='btn-close' onClick={openCloseCreateCardModal}>X</button>
                    </div>
                </div>
                <div className='create-card-body'>
                    <label className='title'>Etiquetas</label>
                    <div className='etiqueta-container'>
                        {
                            listaEtiquetas
                                .filter((item) => item.id_column == idColumn)
                                .map((item) =>
                                    <button
                                        style={{
                                            background: etiquetaCard == item.name ? '#32AEFF' : '',
                                            color: etiquetaCard == item.name ? 'white' : ''
                                        }}
                                        key={item.id}
                                        className='btn-etiqueta'
                                        onClick={() => setEtiquetaCard(item.name)}
                                    >{item.name}</button>
                                )
                        }
                    </div>

                    <label className='title'>Potencial de venda</label>
                    <label className='card-stars-container'>
                        <MdGrade
                            className='icon-star-create-card'
                            onClick={() => setNivel(1)}
                            style={{ color: nivel >= 1 ? '#9961FF' : 'rgba(172, 172, 172, 0.6)' }}
                        />
                        <MdGrade
                            className='icon-star-create-card'
                            onClick={() => setNivel(2)}
                            style={{ color: nivel >= 2 ? '#777CFF' : 'rgba(172, 172, 172, 0.6)' }}
                        />
                        <MdGrade
                            className='icon-star-create-card'
                            onClick={() => setNivel(3)}
                            style={{ color: nivel >= 3 ? '#5F8EFF' : 'rgba(172, 172, 172, 0.6)' }}
                        />
                        <MdGrade
                            className='icon-star-create-card'
                            onClick={() => setNivel(4)}
                            style={{ color: nivel >= 4 ? '#39A9FF' : 'rgba(172, 172, 172, 0.6)' }}
                        />
                        <MdGrade
                            className='icon-star-create-card'
                            onClick={() => setNivel(5)}
                            style={{ color: nivel >= 5 ? '#09CEFF' : 'rgba(172, 172, 172, 0.6)' }}
                        />
                    </label>
                    <label className='title'>Nome do cliente</label>
                    <input className='input-create-card' type='text' onChange={(e) => setNameCard(e.target.value)} placeholder={'Digite o nome do cliente...'}></input>
                    <label className='title'>Empresa</label>
                    <input className='input-create-card' type='text' onChange={(e) => setNameObraCard(e.target.value)} placeholder={'Digite o nome da obra...'}></input>
                    {idColumn != 0 ? (
                        <label className='title'>Número do orçamento</label>
                    ) : <></>}
                    {idColumn != 0 ? (
                        <input className='input-create-card' type='text' onChange={(e) => setDocumentCard(e.target.value)} placeholder={'Digite o número do orçamento...'}></input>
                    ) : <></>}
                    {idColumn != 0 ? (
                        <label className='title'>Valor negociado</label>
                    ) : <></>}
                    {idColumn != 0 ? (
                        <input className='input-create-card' type='number' onChange={(e) => setValorCard(parseInt(e.target.value))} placeholder={'Valor de negócio...'}></input>
                    ) : <></>}
                    <label className='title'>Previsão de Fechamento</label>
                    <form >
                        <DatePicker
                            className='input-create-card'
                            id="data"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={previsaoCard ? previsaoCard : 'Selecione a data...'}
                        />
                    </form>

                    <label className='title'>Email</label>
                    <input className='input-create-card' type='text' onChange={(e) => setEmailCard(e.target.value)} placeholder={'Digite o Email...'}></input>
                    <label className='title'>Fone</label>
                    <input className='input-create-card' type='tel' onChange={(e) => setFoneCard(e.target.value)} placeholder={'Digite o fone...'}></input>
                    <label className='title'>Cidade</label>
                    <input className='input-create-card' type='text' onChange={(e) => setCityCard(e.target.value)} placeholder={'Digite a cidade...'}></input>
                    <label className='title'>Estado</label>
                    <input className='input-create-card' type='text' onChange={(e) => setEstadoCard(e.target.value)} placeholder={'Digite o estado...'}></input>
                    <label className='title'>Meio de Contato</label>
                    <input className='create-card-select' type='text' value={meioContatoCard || ''} onClick={openCloseSelectMeioContato} placeholder={'Selecione o meio de contato...'}></input>
                    {selectedMeioContato ? (
                        <div className='card-select'>
                            {
                                meioContato.map((item) => <li key={item.id} className='item-list-select' onClick={() => selectMeioContato(item.meio)}>{item.meio}</li>)
                            }
                        </div>
                    ) : <></>}

                </div>
                <div className='create-card-footer'>
                    <button className='btn-cancel' onClick={openCloseCreateCardModal}>Cancelar</button>
                    <button className='btn-save' onClick={validationForm}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default CreateCard;