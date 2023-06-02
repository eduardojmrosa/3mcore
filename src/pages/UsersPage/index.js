import React from 'react'

// COMPONENTS
import Header from '../../component/Header'
import Users from '../../component/Users';

function UsersPage() {

    return (
        <header className='user-container'>
            <Header />
            <Users />
        </header>
    );
}
export default UsersPage;