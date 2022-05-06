import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/user'

import './signIn.css'
import logo from '../../assets/logo.png'

function SignIn(){
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();
        
        if(email !== '' && senha !== ''){
            signIn(email, senha)
        }

    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Sistema do logo" />
                </div>

            <form onSubmit={handleSubmit}>
                <h1>Entrar</h1>
                <input type="text" placeholder="Email@email.com"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="******" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
            </form>

            <Link to='/register'>Criar uma nova conta</Link>
            </div>
        </div>
    )
}

export default SignIn;