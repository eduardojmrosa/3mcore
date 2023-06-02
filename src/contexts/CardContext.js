import React, { createContext, useState, useContext, useEffect } from "react";


// FIREBASE
import fb from '../config/firebase';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// CONTEXT API
import { UserContext } from './UserContext';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {

  //--- FIREBASE
  const db = getFirestore(fb);

  // CONTEXT API USER
  const { referenciaExternaA, idEmpresa, user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess } = useContext(UserContext);

  const [idCard, setIdCard] = useState('');
  const [idColumn, setIdColumn] = useState('');
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
  const [etiquetaCard, setEtiquetaCard] = useState('');
  const [listaCards, setListaCards] = useState([]);
  const [modificationDateCard, setModificationDateCard] = useState([]);


  useEffect(() => {
    //getCardsFirestore();
    getCards();

  }, [nivelAcess, responsavelUser, user]);

  // BUSCAR CARDS FIRESTORE
  const getCards = async () => {
    try {
      const cardCollectionRef = collection(db, 'cards'); // Obtém a referência para a coleção 'cards' no banco de dados
      //const querySnapshot = await getDocs(cardCollectionRef); // Executa a consulta para obter todos os documentos na coleção 'cards'

      const querySnapshot = await getDocs(query(
        cardCollectionRef,
        where('empresa', '==', idEmpresa)
      ));
      const userCards = []; // Array para armazenar os cards do usuário

      querySnapshot.forEach((doc) => {
        const cardData = doc.data(); // Obtém os dados do documento

        //alert(referenciaExternaA);

        //alert(cardData.referencia_externa_a);

        if ((cardData.create_by === user.email) || (nivelAcess === 'adm') || (cardData.responsavel === nameUser) || ( ( cardData.referencia_externa_a === referenciaExternaA ) && ( cardData.referencia_externa_a) && ( cardData.referencia_externa_a !== '')) ) {
          const card = {
            id: doc.id, // Inclui o campo 'id' com o ID do documento
            ...cardData, // Copia os demais campos do documento
          };

          userCards.push(card); // Adiciona o card ao array de cards do usuário
        }
      });

      setListaCards(userCards); // Atualiza a lista de cards do contexto
    } catch (error) {
      console.error('Erro ao buscar os cards do usuário:', error);
    }
  };

  const [ listaEtiquetas, setListaEtiquetas ] = useState([

    {id: '0', name: 'Solicitação de orçamento', id_column: 0 },
    {id: '1', name: 'Cliente sem contato', id_column: 0 },
    {id: '2', name: 'Cliente entrou em Contato', id_column: 0 },

    {id: '6', name: 'Orçamento Enviado', id_column: 1 },
    {id: '7', name: 'Aguardando Resposta', id_column: 1 },
    {id: '8', name: 'Em revisão', id_column: 1 },


    {id: '9', name: 'Contrato Enviado', id_column: 2 },
    {id: '10', name: 'Aguardando Assinatura', id_column: 2 },
    {id: '11', name: 'Negociação Finalizada', id_column: 2 },

]);


const [ motivoVendaPerdida, setMotivoVendaPerdida ] = useState('');

  return (
    <CardContext.Provider value={{
      modificationDateCard, setModificationDateCard,
      motivoVendaPerdida, setMotivoVendaPerdida,
      listaEtiquetas, setListaEtiquetas,
      etiquetaCard, setEtiquetaCard,
      listaEtiquetas, setListaEtiquetas,
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
      nivel, setNivel,
    }}>
      {children}
    </CardContext.Provider>
  );

};