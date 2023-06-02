import React, { createContext, useState } from "react";

export const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {

  const [idColumn, setIdColumn] = useState('');
  const [nameColumn, setNameColumn] = useState('');

  const listaColumns = [
    { id: '0', title: 'Leads' },
    { id: '1', title: 'Em Negociação' },
    { id: '2', title: 'Venda Concluída' },
    { id: '3', title: 'Venda Perdida' },
  ];  

  
  const [openCloseVendaPerdida, setOpenCloseVendaPerdida] = useState(false);
  function vendaPerdidaModal(){
    setOpenCloseVendaPerdida(!openCloseVendaPerdida);
  }


  return (
    <ColumnContext.Provider value={{ openCloseVendaPerdida, vendaPerdidaModal, listaColumns, idColumn, setIdColumn, nameColumn, setNameColumn }}>
      {children}
    </ColumnContext.Provider>
  );

};