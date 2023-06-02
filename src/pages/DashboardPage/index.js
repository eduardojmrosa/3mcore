import React from 'react'

// COMPONENTS
import Header from '../../component/Header'
import Dashboard from '../../component/Dashboard';

function DashboardPage() {

    return (
        <header className='home-container'>
            <Header />
            <Dashboard />
        </header>
    );
}
export default DashboardPage;