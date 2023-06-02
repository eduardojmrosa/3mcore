import React, { createContext, useState } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {

  const [createCardModal, setCreateCardModal] = useState(false);
  function openCloseCreateCardModal() {
    setCreateCardModal(!createCardModal);
  }

  const [createUserModal, setCreateUserModal] = useState(false);
  function openCloseCreateUserModal() {
    setCreateUserModal(!createUserModal);
  }

  const [editCardModal, setEditCardModal] = useState(false);
  function openCloseEditCardModal() {
    setEditCardModal(!editCardModal);
  }

  const [modalImprtExcel, setModalImportExcel] = useState(false);
  function openCloseModalImportExcel (){
      setModalImportExcel(!modalImprtExcel);
  }



const listaColumns = [
  { id: '0', title: 'Leads' },
  { id: '1', title: 'Em Negociação' },
  { id: '2', title: 'Venda Concluída' },
  { id: '3', title: 'Venda Perdida' },
];


// ESCOLHA DE PERÍODO 
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);


const [searchValue, setSearchValue] = useState('');

const [showConfetti, setShowConfetti] = useState(false);




  return (
    <BoardContext.Provider value={{ modalImprtExcel, openCloseModalImportExcel, showConfetti, setShowConfetti, startDate, setStartDate, endDate, setEndDate, searchValue, setSearchValue, listaColumns, createCardModal, openCloseCreateCardModal, createUserModal, openCloseCreateUserModal, editCardModal, openCloseEditCardModal }}>
      {children}
    </BoardContext.Provider>
  );

};