import React, { useContext, useState , useEffect} from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// STYLE
import './style.css'

// COMPONENTS
import Column from '../../component/Column';
import CreateCard from '../../component/CreateCard';
import EditCard from '../../component/EditCard';
import ChartValueColumn from '../../component/charts/ChartValueColumn';
import ChartValuePrevisao from '../../component/charts/ChartValuePrevisao';

// CONTEXT API
import { BoardContext } from '../../contexts/BoardContext';
import ChartValueEstado from '../charts/ChartValueEstado';
import ChartValueEstadoColumn from '../charts/ChartValueEstadoColumn';

function Dashboard() {

    const { startDate, setStartDate, endDate, setEndDate } = useContext(BoardContext);


    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <label className='title'>Dashboard</label>

            </div>
            <div className='dashboard-body'>
                <div className='select-periodo-dashboard'>
                    <label className='label-select-date'>Data Inicial</label>
                    <DatePicker
                        className='input-date-dashboard'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy" // Defina o formato de data desejado
                        calendarClassName='custom-calendar'
                    />
                    <label className='label-select-date'>Data Final</label>
                    <DatePicker
                        className='input-date-dashboard'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="dd/MM/yyyy" // Defina o formato de data desejado
                        calendarClassName='custom-calendar'
                    />
                </div>

                <div className='charts-dashboard-container'>
                    <ChartValueColumn />
                    <ChartValueEstado />
                    <ChartValuePrevisao />
                    <ChartValueEstadoColumn />
                </div>

            </div>
        </div>
    );
}
export default Dashboard;