import React, { useContext, useState, useEffect } from 'react'

// STYLE
import './style.css'

// COMPONENTS
import Card from '../Card';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { ColumnContext } from '../../contexts/ColumnContext';
import { UserContext } from '../../contexts/UserContext';
import { CardContext } from '../../contexts/CardContext';

// FIREBASE
import fb from '../../config/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { MdBuild, MdOutlineLibraryAdd, MdAdd, MdAddBox, MdLoyalty, MdShare, MdHome, MdAccountBox, MdAccessAlarms, MdAlternateEmail, MdGrade, MdPhone, MdAccountBalance, MdCalendarMonth, MdOutlineAttachMoney, MdArticle, MdAccountBalanceWallet } from "react-icons/md";

function Board(props) {

    //--- FIREBASE
    const db = getFirestore(fb);

    const { searchValue, setSearchValue, openCloseCreateCardModal } = useContext(BoardContext);
    const { editColumnModal, idColumn, setIdColumn, nameColumn, setNameColumn } = useContext(ColumnContext);

    // CONTEXT API USER
    const { user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess } = useContext(UserContext);

    const { idCard, setIdCard, listaCards, setListaCards } = useContext(CardContext);

    

    // BUSCAR INFORMAÇÕES DE CARDS



    function setColumnInfo() {
        setIdColumn(props.columnData.id);
        setNameColumn(props.columnData.title);
        openCloseCreateCardModal();
    }

    // QUANTIDADE DE CARDS NA COLUNA

    useEffect(() => {
        obterQuantidadeCards();
    }, [listaCards]);

    const [quantidadeCards, setQuantidadeCards] = useState(0);
    const [valorCards, setValorCards] = useState(0);

    // Função para obter a quantidade de cards
    const obterQuantidadeCards = () => {
        const cards = listaCards.filter((item) => item.id_column === props.columnData.id);
        const quantidade = listaCards.filter((item) => item.id_column === props.columnData.id).length;
        const somaValores = cards.reduce((acumulador, item) => {
            return acumulador + item.valor;
        }, 0);
        setValorCards(somaValores);
        setQuantidadeCards(quantidade);
    };

    function openModalEditColumn() {
        setIdColumn(props.columnData.id);
        setNameColumn(props.columnData.title);
        editColumnModal();
    }



    return (

        <div className='column-container'>


            <div className='column-header'>
                <div className='header-title-container'>
                    <label className='title'>
                        {props.columnData.title}
                    </label>
                    {props.columnData.id < 3 ? (
                        <MdAddBox className='btn-add-card' onClick={setColumnInfo} />
                    ) : <></>
                    }
                </div>
                <div className='column-infos-container'>
                    <label className='info'>{quantidadeCards} Cards</label>
                    <label className='info'>{valorCards.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>

                </div>

            </div>
            <div className='column-body'>
                {

                    listaCards
                        .filter((item) => item.id_column === props.columnData.id)
                        .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())) // Filtra por nome (ignorando maiúsculas e minúsculas)
                        .sort((a, b) => {
                            // Ordena por data
                            const dateA = new Date(
                                parseInt(a.previsao.split('/')[2]),
                                parseInt(a.previsao.split('/')[1]) - 1,
                                parseInt(a.previsao.split('/')[0])
                            );
                            const dateB = new Date(
                                parseInt(b.previsao.split('/')[2]),
                                parseInt(b.previsao.split('/')[1]) - 1,
                                parseInt(b.previsao.split('/')[0])
                            );
                            return dateA - dateB;
                        })
                        .map((item) => <Card key={item.id} cardData={item} />)






                    //listaCards
                    //.filter((item) => item.id_column === props.columnData.id)
                    //.map((item) => <Card key={item.id} cardData={item} />)
                }
            </div>
            <div className='column-footer'>
                {/*<MdBuild className='btn-edit-etiquetas' onClick={openModalEditColumn} />*/}
            </div>
        </div>

    );
}
export default Board;