import { useContext } from 'react'
import './header.css'

import { AuthContext } from '../../contexts/user'

import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import avatar from '../../assets/avatar.png'

import { Link } from 'react-router-dom';

export default function Header(){

    const { user } = useContext(AuthContext);

    return(
        <div>
            
            <div className='sidebar'>
                
                <div>
                    <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto Avatar"></img>
                </div>

                <Link to='/dashboard'>
                    <FiHome color='white' size={30} />
                    Agendamento
                </Link>

                <Link to='/customers'>
                    <FiUser color='white' size={30} />
                    Clientes
                </Link>

                <Link to='/profile'>
                    <FiSettings color='white' size={30} />
                    Configurações
                </Link>
            </div>
        
        </div>
    )
}