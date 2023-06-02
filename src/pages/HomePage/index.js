import React from 'react'

// COMPONENTS
import Header from '../../component/Header'
import Board from '../../component/Board';

function HomePage() {

    return (
        <header className='home-container'>
            <Header />
            <Board />
        </header>
    );
}
export default HomePage;