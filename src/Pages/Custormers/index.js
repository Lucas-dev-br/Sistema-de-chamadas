import './custormers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi'
import { useState } from 'react';

export default function Custormers () {

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState ('')


    async function handleAdd(e){
        e.preventDefault();

        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('clientes')
            .add({
                nomeEmpresa: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                alert('Cadastrado com sucesso!')
            })
            .catch((error)=>{
                console.log(error);
            })
        }else{
            alert("Prencha todos os campos")
        }
    }


    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Clientes'>
                    <FiUser size={30} />
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>
                        <label>Nome do cliente</label>
                        <input type='text' value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value) }/>

                        <label>CNPJ</label>
                        <input type='text' value={cnpj} onChange={(e) => setCnpj(e.target.value)}></input>

                        <label>Endereço</label>
                        <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)}></input>

                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>

            </div>
        </div>
    )
}