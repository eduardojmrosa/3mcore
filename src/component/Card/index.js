import React, { useEffect, useState, useContext } from 'react'

// STYLE
import './style.css'


// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { CardContext } from '../../contexts/CardContext';

import { MdThumbDown, MdAddCard, MdNotifications, MdLoyalty, MdShare, MdHome, MdAccountBox, MdAccessAlarms, MdAlternateEmail, MdGrade, MdPhone, MdAccountBalance, MdCalendarMonth, MdOutlineAttachMoney, MdArticle, MdAccountBalanceWallet } from "react-icons/md";

function Card(props) {

  const [star, setStar] = useState();

  const {  openCloseEditCardModal } = useContext(BoardContext);


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
    nivel, setNivel,
    etiquetaCard, setEtiquetaCard,
    modificationDateCard, setModificationDateCard,
  } = useContext(CardContext);

  function getIdCard() {
    setIdCard(props.cardData.id);
    setIdColumn(props.cardData.id_column);
    setDocumentCard(props.cardData.document_card);
    setNameCard(props.cardData.name);
    setNameObraCard(props.cardData.name_obra);
    setValorCard(props.cardData.valor);
    setCityCard(props.cardData.city);
    setEstadoCard(props.cardData.estado);
    setFoneCard(props.cardData.fone);
    setEmailCard(props.cardData.email);
    setPrevisaoCard(props.cardData.previsao);
    setMeioContatoCard(props.cardData.meio_contato);
    setDate(props.cardData.date);
    setNivel(props.cardData.nivel);
    setEtiquetaCard(props.cardData.etiqueta);
    setModificationDateCard(props.cardData.modification_date);
    openCloseEditCardModal();
  }

  useEffect(() => {
    setStar(props.cardData.nivel);
  }, [listaCards])


  function colorCard() {
    let color = '';
    if (props.cardData.id_column == 0) {
      color = '#32AEFF';
    }
    if (props.cardData.id_column == 1) {
      color = 'deeppink';
    }
    if (props.cardData.id_column == 2) {
      color = 'rgb(67, 219, 67)';
    }
    if (props.cardData.id_column == 3) {
      color = 'rgb(155, 154, 154)';
    }

    return color;
  }


  return (
    <div className='card-container' onClick={getIdCard}>



      <div className='card-header'>
        <label className='title'>
          {props.cardData.name}
        </label>
      </div>
      <div className='card-body'>

        {props.cardData.id_column == 3 ? (
          <div className='card-name'>
            <MdLoyalty className='icon' />
            <label className='etiqueta' style={{ background: colorCard() }}>{props.cardData.motivo_perca}</label>
          </div>
        ) : <></>}

        {props.cardData.id_column != 3 ? (
          <div className='card-name'>
            <MdLoyalty className='icon' />
            <label className='etiqueta' style={{ background: colorCard() }}>{props.cardData.etiqueta}</label>
          </div>
        ) : <></>}

        {props.cardData.id_column != 0 ? (
          <label
            className='card-name'
          //style={{ display: props.cardData.id_column < 1 ? 'none' : '' }}
          >
            <MdArticle className='icon' />{props.cardData.document_card}</label>
        ) : <></>}
        <label className='card-name'>
          <MdAccountBalance className='icon' />{props.cardData.name_obra}
        </label>
        <label className='card-name'>
          <MdAccessAlarms className='icon' />{props.cardData.previsao}
        </label>
        {props.cardData.id_column == 0 ? (
          <label className='card-name'>
            <MdAlternateEmail className='icon' />{props.cardData.email}
          </label>
        ) : <></>}
        <label style={{ display: 'none' }} className='card-name'>
          <MdPhone className='icon' />{props.cardData.fone}
        </label>
        <label className='card-name'>
          <MdAccountBox className='icon' />{props.cardData.name_user}
        </label>
        <label className='card-name'>
          <MdHome className='icon' /><div> {props.cardData.city + '/' + props.cardData.estado} </div>
        </label>
        {props.cardData.id_column == 0 ? (
          <label className='card-name'>
            <MdShare className='icon' />{props.cardData.meio_contato}
          </label>
        ) : <></>}
        <label style={{ display: 'none' }} className='card-name'>
          <MdLoyalty className='icon' />{props.cardData.id}
        </label>
        {props.cardData.id_column != 0 ? (
          <label className='card-name'>
            <MdAddCard className='icon' /><label className='valor-card'>{props.cardData.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
          </label>
        ) : <></>}
      </div>
      <div className='card-footer'>
        <label className='current-date-card'>{props.cardData.date}</label>

        {props.cardData.id_column != 3 ? (
          <label className='card-name'>
            <MdGrade
              className='icon-star'
              /*onClick={() => setStar(1)}*/
              style={{ color: star >= 1 ? '#9961FF' : 'rgba(172, 172, 172, 0.6)' }}
            />
            <MdGrade
              className='icon-star'
              /*onClick={() => setStar(2)}*/
              style={{ color: star >= 2 ? '#777CFF' : 'rgba(172, 172, 172, 0.6)' }}
            />
            <MdGrade
              className='icon-star'
              /*onClick={() => setStar(3)}*/
              style={{ color: star >= 3 ? '#5F8EFF' : 'rgba(172, 172, 172, 0.6)' }}
            />
            <MdGrade
              className='icon-star'
              /*onClick={() => setStar(4)}*/
              style={{ color: star >= 4 ? '#39A9FF' : 'rgba(172, 172, 172, 0.6)' }}
            />
            <MdGrade
              className='icon-star'
              /*onClick={() => setStar(5)}*/
              style={{ color: star >= 5 ? '#09CEFF' : 'rgba(172, 172, 172, 0.6)' }}
            />
          </label>
        ) : <MdThumbDown className='icon-venda-verdida-card' />}
      </div>
    </div>
  );
}
export default Card;