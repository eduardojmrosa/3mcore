import React, { useState, useContext } from 'react';
import './style.css';

import { OutTable, ExcelRenderer } from 'react-excel-renderer';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { UserContext } from '../../contexts/UserContext';
import { ColumnContext } from '../../contexts/ColumnContext';
import { CardContext } from '../../contexts/CardContext';

// FIREBASE
import fb from '../../config/firebase';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

function ImportExcel() {

    const { openCloseModalImportExcel } = useContext(BoardContext);

    const { idEmpresa, users, user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    function getCurrentDate() {
      const date = new Date();
      const diaSemana = date.getDate();
      const mes = date.getMonth() + 1;
      const ano = date.getFullYear();
      const data = diaSemana + '/' + mes + '/' + ano;
      //setDate(data);
      return data;
  }

    const handleFileUpload = (event) => {
        setLoading(true);
      
        const fileObj = event.target.files[0];
      
        // Use o ExcelRenderer para ler o arquivo Excel
        ExcelRenderer(fileObj, (err, resp) => {
          if (err) {
            console.error(err);
            setLoading(false);
            return;
          }
      
          // Acessando os dados do arquivo Excel
          const rows = resp.rows;
      
          if (rows.length <= 1) {
            console.error('Nenhuma linha encontrada no arquivo Excel.');
            setLoading(false);
            return;
          }
      
          // Remove a primeira linha (cabeçalho)
          const dataRows = rows.slice(1);
      
          //--- FIREBASE
          const db = getFirestore(fb);
      
          const addCardFirestore = (row) => {
            const [
              documento_card,
              versao,
              name,
              name_obra,
              referencia_externa_a,
              valor,
              date,
              previsao,
              endereco,
              city,
            ] = row;
      
            addDoc(collection(db, 'cards'), {
              document_card: documento_card,
              versao: versao,
              name: name,
              name_obra: name_obra ? name_obra: '', 
              valor: valor ? valor : 0, 
              email: 'Sem email',
              fone: 'Não informado',
              city: city ? city : '',
              estado: '',
              previsao: previsao ? previsao : '01/01/2051',
              meio_contato: '',
              create_by: 'Pref Web',
              nivel_acess: '', 
              responsavel: '',  // REVER COMO PEGAR O RESPONSÁVEL
              name_user: referencia_externa_a,
              id_column: '1',
              date: date ? date : getCurrentDate(),
              nivel: 2,
              etiqueta: 'PrefWeb',
              empresa: idEmpresa ? idEmpresa : '', 
              motivo_perca: '',
              modification_date: getCurrentDate() ,
              referencia_externa_a: referencia_externa_a,
              endereco: endereco ? endereco : '',
            })
              .then((docRef) => {
                console.log('Documento adicionado com ID:', docRef.id);
                openCloseModalImportExcel();
              })
              .catch((error) => {
                console.error('Erro ao adicionar documento:', error);
              });
          };
      
          // Iterar sobre as linhas de dados e criar documentos no Firestore
          for (const row of dataRows) {
            addCardFirestore(row);
          }
      
          setLoading(false);
        });
      };
      


    return (
        <div className='modal-create-card-container'>
            <div className='create-card-container'>
                <div className='create-card-header'></div>
                <div className='create-card-body'>
                    <input type='file' onChange={handleFileUpload} />
                    {loading && <p>Carregando...</p>}
                </div>
                <div className='create-card-footer'>
                <button disabled={loading} onClick={openCloseModalImportExcel}>
                        Fechar
                    </button>
                    <button disabled={loading} onClick={handleFileUpload}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImportExcel;
