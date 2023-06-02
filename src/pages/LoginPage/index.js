import React, { useState } from 'react';

import MinhaImagem from '../../assets/background-v3.jpg';

// STYLE
import './style.css';

// IMAGE
import logo from '../../assets/logo.png';

// FIREBASE
import fb from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [mensagem, setMensagem] = useState();

    function logar() {

        // FIREBASE
        const auth = getAuth(fb);

        //LOGIN
        signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
            const user = userCredential.user;
            setMensagem('Olá ' + user.email);
            window.location.href = "/home";
        })
            .catch((error) => {
                setMensagem('Login ou Senha incorreto!');
            });

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Impede o comportamento padrão do formulário
            logar();
        }
    };

    return (
        <div className='login-container'
            style={{
                backgroundImage: `url(${MinhaImagem})`,
                maxHeight: 'calc(100vh - 0px)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: '0',
                
            }}
        >
            <div className="container">
                <div className="login-form-container">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" />
                        <h3 className='title'>SuiteFlow</h3>
                    </div>
                    <div className="form-group">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="Email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input onKeyDown={handleKeyDown} onChange={(e) => setSenha(e.target.value)} type="password" id="password" name="password" placeholder="Password" />
                    </div>
                    <div className="form-msg">
                        <span>{mensagem}</span>
                    </div>
                    <div className="container-login-form-btn">
                        <button type="submit" onClick={logar} className="login-form-btn">Login</button>
                    </div>
                    <div className="form-msg">
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;