import { useState, useEffect, useContext } from 'react'

import firebase from '../../services/firebaseConnection'
import { useHistory, useParams } from 'react-router-dom'

import Header from '../../components/Header'
import Title from '../../components/Title'
import {AuthContext} from '../../contexts/user'

import './new.css'

import {FiPlus} from 'react-icons/fi'

export default function New(){

    const {id} = useParams();
    const history = useHistory();


    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')

    const { user } = useContext(AuthContext);

    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection('clientes')
            .get()
            .then((snapshot)=>{
                let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeEmpresa
                    })
                })
            
                if(lista.length === 0){
                    console.log("Nenhuma empresa encontrada")
                    setCustomers([{id: '1', nomeEmpresa: 'FREELA'}])
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);

            })
            .catch((error) => {
                console.log('Deu algum erro!', error)
                setLoadCustomers(false);
                setCustomers([{id: '1', nomeEmpresa: ''}])
            })
        }

        loadCustomers();
    }, [])

    async function handleRegister(e){
        e.preventDefault();
        
        await firebase.firestore().collection("Chamados")
        .add({
            created: new Date(),
            clienteUser: customers[customerSelected].nomeFantasia,
            cliente: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(()=>{
            alert("Chamado feito com sucesso!") 
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((err)=>{
            alert("Ops, algo deu errado!")
            console.log(err);
        })

    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
        console.log(e.target.value);
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
        console.log(e.target.value);
    }

    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value);
    }

    return(
        <div>
            <Header/>


            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlus size={30} />
                </Title>

                <div className='container'>

                    <form className='form-profile' onSubmit={handleRegister}>
                        
                        <label>Clientes</label>

                        {loadCustomers ? (
                            <input type='text' disable={true} value="Carregando clientes..."  />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                            {customers.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })}
                        </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Tecnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type='radio'name='radio'value='Aberto' onChange={handleOptionChange} checked={status === 'Aberto'}/>
                            <span>Em aberto</span>

                            <input type='radio'name='radio'value='Progresso' onChange={handleOptionChange} checked={status === 'Progresso'}/>
                            <span>Progresso</span>

                            <input type='radio'name='radio'value='Atendido' onChange={handleOptionChange} checked={status === 'Atendido'}/>
                            <span>Atendido</span>

                        </div>    
                            
                            <label className='complemento'>Complemento</label>
                            <textarea type='text' placeholder='Descreva seu problema (opcional)' value={complemento} onChange={(e) => setComplemento(e.target.value)} />


                            <button type='submit'>Registrar</button>

                    </form>

                </div>

            </div>

        </div>
    )
}