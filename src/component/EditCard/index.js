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

// data
import moment from 'moment';


// FIREBASE
import fb from '../../config/firebase';
import { deleteDoc, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

import { MdThumbDown, MdThumbUp, MdAccessAlarms, MdAlternateEmail, MdGrade, MdPhone, MdAccountBalance, MdCalendarMonth, MdOutlineAttachMoney, MdArticle, MdAccountBalanceWallet } from "react-icons/md";

function EditCard() {

    //--- FIREBASE
    const db = getFirestore(fb);

    const { openCloseCreateCardModal } = useContext(BoardContext);

    const { user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess } = useContext(UserContext);

    const { openCloseVendaPerdida, vendaPerdidaModal, listaColumns, nameColumn, setNameColumn } = useContext(ColumnContext);

    const { showConfetti, setShowConfetti, openCloseEditCardModal } = useContext(BoardContext);


    const {
        idCard, setIdCard,
        idColumn, setIdColumn,
        listaCards, setListaCards,
        documentCard, setDocumentCard,
        nameCard, setNameCard,
        nameObraCard, setNameObraCard,
        valorCard, setValorCard,
        cityCard, setCityCard,
        estadoCard, setEstadoCard,
        foneCard, setFoneCard,
        emailCard, setEmailCard,
        previsaoCard, setPrevisaoCard,
        meioContatoCard, setMeioContatoCard,
        date, setDate,
        etiquetaCard, setEtiquetaCard, listaEtiquetas,
        nivel, setNivel,
        motivoVendaPerdida, setMotivoVendaPerdida,
        modificationDateCard, setModificationDateCard
    } = useContext(CardContext);


    function validationForm() {
        updateCard();
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
    }

    // ------------ ATUALIZAR TAREFA ------------------
    async function updateCard() {
        const docRef = doc(db, "cards", idCard);

        try {
            await updateDoc(docRef, {
                document_card: documentCard,
                name: nameCard,
                //name_obra: nameObraCard,
                valor: valorCard,
                email: emailCard,
                name_obra: nameObraCard,
                fone: foneCard,
                city: cityCard,
                estado: estadoCard,
                previsao: previsaoCard,
                meio_contato: meioContatoCard,
                //create_by: emailUser,
                //nivel_acess: nivelAcess,
                //responsavel: responsavelUser,
                id_column: idColumn.toString(),
                //date: date,
                nivel: nivel,
                etiqueta: etiquetaCard,
                motivo_perca: motivoVendaPerdida,
                modification_date: modificationDateCard,
            });

            const idDocRef = docRef.id;
            console.log("Document written with ID: ", idDocRef);

            const listaAtualizada = {
                id: idCard,
                document_card: documentCard,
                name: nameCard,
                name_obra: nameObraCard,
                valor: valorCard,
                email: emailCard,
                fone: foneCard,
                city: cityCard,
                estado: estadoCard,
                previsao: previsaoCard,
                meio_contato: meioContatoCard,
                //create_by: emailUser,
                //nivel_acess: nivelAcess,
                //responsavel: responsavelUser,
                id_column: idColumn.toString(),
                //date: date,
                nivel: nivel,
                etiqueta: etiquetaCard,
                motivo_perca: motivoVendaPerdida,
                modification_date: modificationDateCard,
            };

            atualizarListaCardsOffline(idCard, listaAtualizada);
            if (idColumn == 2) {
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                }, 8000);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    const atualizarListaCardsOffline = (id, novosValores) => {

        console.log(id + '  -  ' + novosValores)
        setListaCards(prevLista => {
            return prevLista.map(column => {
                if (column.id === id) {
                    return { ...column, ...novosValores }; // Atualize todos os valores do item
                }
                return column;
            });
        });
        openCloseEditCardModal();
        console.log(listaCards);
    };




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


    // DELETAR CARD
    async function deletCard(id) {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir este documento?");

        if (confirmDelete) {
            // Excluir o documento do card
            const cardRef = doc(db, "cards", id);
            await deleteDoc(cardRef);

            alert('Documento e mensagens excluídos com sucesso!');
            removerCard(id);
        } else {
            return;
        }
    }

    // OFFLINE
    const removerCard = (id) => {
        const novaLista = listaCards.filter(item => item.id !== id);
        setListaCards(novaLista);
        openCloseEditCardModal();
    };


    // DEFINIÇÃO DE VENDA

    function defineProcess(id) {
        setIdColumn(id);
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        setModificationDateCard(formattedDate);

        //setModificationDateCard(new Date());
        if (id == '3') {
            vendaPerdidaModal();

        }
        if (id == '2') {
            setNivel(5);
        }
        if (id <= '2') {
            setMotivoVendaPerdida("");
        }
    }


    return (
        <div className='modal-edit-card-container'>

            <div className='edit-card-container'>
                <div className='edit-card-header'>
                    <div className='title-header-edit-card'>Oportunidade</div>

                    <div className='btn-close-container'>
                        <button className='btn-close' onClick={openCloseEditCardModal}>X</button>
                    </div>
                </div>
                <div className='edit-card-body'>

                    <label className='title'>Processo</label>


                    <div className='define-process'>
                        {
                            listaColumns
                                .map((item) =>
                                    <button
                                        style={{
                                            background: idColumn == item.id ? 'deeppink' : '',
                                            color: idColumn == item.id ? 'white' : ''
                                        }}
                                        onClick={() => defineProcess(item.id)}
                                        className='process'
                                    >
                                        {/*item.id == 2 ? <MdThumbUp className='icon-vendido' /> : <></>*/}
                                        {/*item.id == 3 ? <MdThumbDown className='icon-perdido' /> : <></>*/}
                                        {item.title}</button>
                                )
                        }
                    </div>

                    {idColumn != 3 ? (
                        <label className='title'>Etiquetas</label>
                    ) : <></>}
                    <div className='etiqueta-container'>
                        {
                            listaEtiquetas.filter((item) => item.id_column == idColumn)
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

                    {idColumn != 3 ? (
                        <label className='title'>Potencial de venda</label>
                    ) : <></>}
                    {idColumn != 3 ? (
                        <label className='card-stars-container'>
                            <MdGrade
                                className='icon-star-edit-card'
                                onClick={() => setNivel(1)}
                                style={{ color: nivel >= 1 ? '#9961FF' : 'rgba(172, 172, 172, 0.6)' }}
                            />
                            <MdGrade
                                className='icon-star-edit-card'
                                onClick={() => setNivel(2)}
                                style={{ color: nivel >= 2 ? '#777CFF' : 'rgba(172, 172, 172, 0.6)' }}
                            />
                            <MdGrade
                                className='icon-star-edit-card'
                                onClick={() => setNivel(3)}
                                style={{ color: nivel >= 3 ? '#5F8EFF' : 'rgba(172, 172, 172, 0.6)' }}
                            />
                            <MdGrade
                                className='icon-star-edit-card'
                                onClick={() => setNivel(4)}
                                style={{ color: nivel >= 4 ? '#39A9FF' : 'rgba(172, 172, 172, 0.6)' }}
                            />
                            <MdGrade
                                className='icon-star-edit-card'
                                onClick={() => setNivel(5)}
                                style={{ color: nivel >= 5 ? '#09CEFF' : 'rgba(172, 172, 172, 0.6)' }}
                            />
                        </label>
                    ) : <></>}

                    <label className='title'>Nome do cliente</label>
                    <input className='input-edit-card' type='text' value={nameCard} onChange={(e) => setNameCard(e.target.value)} placeholder={'Digite o nome do cliente...'}></input>
                    <label className='title'>Empresa</label>
                    <input className='input-edit-card' type='text' value={nameObraCard} onChange={(e) => setNameObraCard(e.target.value)} placeholder={'Digite o nome da obra...'}></input>
                    {idColumn != 0 ? (
                        <label className='title'>Número do orçamento</label>
                    ) : <></>}
                    {idColumn != 0 ? (
                        <input className='input-edit-card' type='text' value={documentCard} onChange={(e) => setDocumentCard(e.target.value)} placeholder={'Digite o número do orçamento...'}></input>
                    ) : <></>}
                    {idColumn != 0 ? (
                        <label className='title'>Valor</label>
                    ) : <></>}
                    {idColumn != 0 ? (
                        <input className='input-edit-card' type='text' value={valorCard} onChange={(e) => setValorCard(parseInt(e.target.value))} placeholder={'Valor de negócio...'}></input>
                    ) : <></>}
                    <label className='title'>Previsão de Fechamento</label>
                    <form >
                        <DatePicker
                            className='input-edit-card'
                            id="data"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={previsaoCard ? previsaoCard : 'Selecione a data...'}
                            calendarClassName='custom-calendar'
                        />
                    </form>

                    <label className='title'>Email</label>
                    <input className='input-edit-card' type='text' value={emailCard} onChange={(e) => setEmailCard(e.target.value)} placeholder={'Digite o Email...'}></input>
                    <label className='title'>Fone</label>
                    <input className='input-edit-card' type='tel' value={foneCard} onChange={(e) => setFoneCard(e.target.value)} placeholder={'Digite o fone...'}></input>
                    <label className='title'>Cidade</label>
                    <input className='input-edit-card' type='text' value={cityCard} onChange={(e) => setCityCard(e.target.value)} placeholder={'Digite a cidade...'}></input>
                    <label className='title'>Estado</label>
                    <input className='input-edit-card' type='text' value={estadoCard} onChange={(e) => setEstadoCard(e.target.value)} placeholder={'Digite o estado...'}></input>
                    <label className='title'>Meio de Contato</label>
                    <input className='edit-card-select' type='text' value={meioContatoCard || ''} onClick={openCloseSelectMeioContato} placeholder={'Selecione o meio de contato...'}></input>
                    {selectedMeioContato ? (
                        <div className='card-select'>
                            {
                                meioContato.map((item) => <li key={item.id} className='item-list-select' onClick={() => selectMeioContato(item.meio)}>{item.meio}</li>)
                            }
                        </div>
                    ) : <></>}

                </div>
                <div className='edit-card-footer'>
                    <div>
                        <button className='btn-excluir' onClick={() => deletCard(idCard)}>Excluir</button>
                    </div>
                    <div className='footer-rigth'>
                        <button className='btn-cancel' onClick={openCloseEditCardModal}>Cancelar</button>
                        <button className='btn-save' onClick={validationForm}>Salvar</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditCard;