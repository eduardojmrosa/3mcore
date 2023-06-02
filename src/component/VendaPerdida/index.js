import React, { useContext, useEffect, useState } from 'react'
import './style.css'

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { UserContext } from '../../contexts/UserContext';
import { ColumnContext } from '../../contexts/ColumnContext';
import { CardContext } from '../../contexts/CardContext';

// FIREBASE
import fb from '../../config/firebase';
import { deleteDoc, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

function VendaPerdida(props) {

    //--- FIREBASE
    const db = getFirestore(fb);

    const { openCloseCreateCardModal } = useContext(BoardContext);

    const { user, nameUser, emailUser, adressUser, cityUser, estadoUser, cepUser, foneUser, responsavelUser, meioContatoUser, nivelAcess } = useContext(UserContext);

    const { openCloseVendaPerdida, vendaPerdidaModal } = useContext(ColumnContext);

    const { openCloseEditCardModal } = useContext(BoardContext);

    const { motivoVendaPerdida, setMotivoVendaPerdida } = useContext(CardContext);

    const motivos = [
        {id: '0', name: 'Não informado'},
        {id: '1', name: 'Comprou pelo concorrente'},
        {id: '2', name: 'Comprou alumínio'},
        {id: '3', name: 'Valor a cima do concorrente'},
        {id: '4', name: 'Recomendação do Arquiteto'},
    ]

    return (
        <div className='modal-venda-perdida-container'>
            <div className='venda-perdida-container'>
                <div className='venda-perdida-header'>
                    <div className='title-venda-perdida'>Motivo da Venda Perdida</div>
                    <div className='btn-close-container'>
                        <button className='btn-close' onClick={vendaPerdidaModal}>X</button>
                    </div>
                </div>
                <div className='venda-perdida-body'>

                    <label className='title'>Motivo</label>
                    <input className='input-venda-perdida' type='text' value={motivoVendaPerdida} onChange={(e) => setMotivoVendaPerdida(e.target.value)} placeholder={'Digite o motivo...'}></input>
                    {
                        motivos.map((item) => 
                            <button className='btn-motivos' onClick={() => setMotivoVendaPerdida(item.name)}>{item.name}</button>
                        )
                    }

                </div>
                <div className='venda-perdida-footer'>
                    <div>
                    </div>
                    <div className='footer-rigth'>
                        <button className='btn-cancel' onClick={vendaPerdidaModal}>Cancelar</button>
                        <button className='btn-save' onClick={vendaPerdidaModal}>Confirmar</button>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default VendaPerdida;