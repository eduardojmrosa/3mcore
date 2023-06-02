import React, { useContext, useState } from 'react'

import Confetti from "react-confetti";

// STYLE
import './style.css'

// COMPONENTS
import Column from '../../component/Column';
import CreateCard from '../../component/CreateCard';
import EditCard from '../../component/EditCard';
import VendaPerdida from '../../component/VendaPerdida';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { ColumnContext } from '../../contexts/ColumnContext';

import { MdOutlineSearch } from "react-icons/md";
import ImportExcel from '../ImportExcel';




function Board() {

    const { showConfetti, setShowConfetti, searchValue, setSearchValue, createCardModal, editCardModal, listaColumns } = useContext(BoardContext);
    const { openCloseVendaPerdida } = useContext(ColumnContext);


    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission(status => {
          console.log('Permissão de notificação:', status);
        });
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registrado:', registration);
          })
          .catch(error => {
            console.error('Erro ao registrar o Service Worker:', error);
          });
      }

      function enviarNotificacao(titulo, opcoes) {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(titulo, opcoes);
          });
        }
      }

      enviarNotificacao('Mudança no site', {
        body: 'Alguma coisa mudou no site!',
        icon: '/caminho/para/icone.png'
      });









    return (
        <div className='board-container'>
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500}    />}


            <div className='board-header'>
                <label className='title'>Pipeline</label>
                <input
                    className='input-search-card'
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Buscar card por nome..."
                />
                <MdOutlineSearch className='icons-search' />

            </div>
            <div className='board-body'>
                {
                    listaColumns.map((item) => (
                        <Column key={item.id} columnData={item} />
                    ))
                }
            </div>

            {createCardModal ? (<CreateCard />) : <></>}
            {editCardModal ? (<EditCard />) : <></>}
            {openCloseVendaPerdida ? (<VendaPerdida />) : <></>}
            {/*<ImportExcel /> */}

        </div>
    );
}
export default Board;