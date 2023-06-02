import React, { useContext, useState } from 'react'

// STYLE
import './style.css'

// COMPONENTS
import Column from '../Column';
import CreateCard from '../CreateCard';
import EditCard from '../EditCard';
import ImportExcel from '../ImportExcel';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import { ColumnContext } from '../../contexts/ColumnContext';
import { CardContext } from '../../contexts/CardContext';

import { MdCreate, MdDeleteOutline, MdAccessAlarms, MdAlternateEmail, MdGrade, MdPhone, MdAccountBalance, MdCalendarMonth, MdOutlineAttachMoney, MdArticle, MdAccountBalanceWallet } from "react-icons/md";


function Admin() {


    const { modalImprtExcel, openCloseModalImportExcel } = useContext(BoardContext);

    return (

        <div className='adm-container'>
            <div className='adm-header'>
                <label className='title'>Admin</label>
            </div>
            <div className='menu-superior-adm'>
                <button className='btn-import-excel-adm' onClick={openCloseModalImportExcel}>Importar</button>
            </div>
            <div className='adm-body'>

            { modalImprtExcel ? ( <ImportExcel /> ) : <></>}

            </div>



        </div>

    );
}
export default Admin;