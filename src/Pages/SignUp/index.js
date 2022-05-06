import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import './signUp.css'
import { AuthContext } from '../../contexts/user';


import logo from '../../assets/logo.png'

function SignUp(){
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();
        
        if(nome !== '' && email !== '' && senha !== ''){
            signUp(email, senha, nome)
        }

    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Sistema do logo" />
                </div>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro</h1>
                <input type='text' placeholder='Seu nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
                <input type="text" placeholder="Email@email.com"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="******" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
            </form>

            <Link to='/'>Já tenho Uma conta? Entre</Link>
            </div>
        </div>
    )
}

export default SignUp;