
import React, { useEffect, useState } from "react";
import FormBasico from "./formBasico";
import { json } from "react-router-dom";
import FormUsuario from "./formUsuario";
import FormEndereco from "./formEndereco";
import FormContato from "./formContato";

import FormSenha from "./formSenha";
import api from "../../components/api";

function Cadastro() {
    const [form, setForm] = useState(0)
    const [user, setUser] = useState({})
    const [criar, setCriar] = useState(false)
    const [password, setPassword] = useState({
        password:''
    })
    const [dadosUsuario, setDadosUsuario] = useState({
        //COMMON
        nome: "",
        nomeSocial: "",
        date_of_birth: "",
        // foto: "",
        password:password.password,
        //KIND OF PERSON
        tipo_de_pessoa: "",
        //PHYSICAL PERSON
        identifier: undefined,
        rg: undefined,
        //LEGAL PERSON
        inscricao_estadual: undefined,
        inscricao_municipal: undefined,
    })
    // useEffect(()=>{
    //     setUser(dadosUsuario)
    // },[dadosUsuario])
    useEffect(()=>{
        setDadosEndereco({... dadosEndereco, cliente:user.id})
        setDadosContato({... dadosContato, cliente:user.id})
    }, [user])

    useEffect(()=>{
        // { ...dados, [item.nome]: e.target.value}
        setDadosUsuario({... dadosUsuario, password:password.password})
    }, [password.password])
    
    const [dadosContato, setDadosContato] = useState({
        //CONTACT
        cliente: user,
        ddd: "",
        numero: "",
        ramal: "",
        email: "",
        observacao: "",
    })
    const [dadosEndereco, setDadosEndereco] = useState({
        //ADDRESS
        cliente: user,
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
    })


    useEffect(()=>{
        if (criar){
            createNewContato()
        }
        setCriar(false)
    }, [dadosContato.cliente])

    const createNewEndereco = () => {
        api.post("bank/enderecos/", dadosEndereco).then((res) => {
            console.log(res.data)
            alert("usuario criado com sucesso!")
        }).catch((erro) => {
            alert(erro)
        })

    }
    const createNewContato = () => {
        api.post("bank/contatos/", dadosContato).then((res) => {
            console.log(res.data)
            createNewEndereco()
        }).catch((erro) => {
            alert(erro)
        })
    }
    // const createNewAccount=()=>{

    // }
    const createNewUser = () => {
        api.post("auth/users/", dadosUsuario, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(async(res) => {
            setCriar(true)
            setTimeout(()=>{
                setUser(res.data)
            }, 1000)
        }).catch((erro) => {
            alert(erro)
        })
    }

    const createUser = () => {
        createNewUser()
    }

    useEffect(() => {
        console.log(dadosUsuario.tipo_de_pessoa)
        if (dadosUsuario.tipo_de_pessoa == 'F') {
            setDadosUsuario({
                ...dadosUsuario,
                identifier: undefined,
                inscricao_estadual: undefined,
                inscricao_municipal: undefined
            })
        } else if (dadosUsuario.tipo_de_pessoa == 'J') {
            setDadosUsuario({
                ...dadosUsuario,
                identifier: undefined,
                rg: undefined
            })
        }
    }, [dadosUsuario.tipo_de_pessoa])
    return (
        <div className="flex flex-col">
            <div className='flex justify-center h-screen bg-gradient-to-t p-5 from-[#5C9794] to-[#22CC91]'>

                {form == 0 ? <FormUsuario dados={dadosUsuario} setDados={setDadosUsuario} setForm={setForm} />
                    :<>{form == 1 ?
                            <FormEndereco dados={dadosEndereco} setDados={setDadosEndereco} setForm={setForm} />
                            :<>{form == 2 ?
                                    <FormContato dados={dadosContato} setDados={setDadosContato} setForm={setForm} />
                                    :
                                    <FormSenha dados={password} setDados={setPassword} setForm={setForm} createUser={createUser}/>
                                }</>
                        }</>
                }
                

                
                <div className="">

                </div>
            </div>
                {/* devmode 
                <button onClick={() => {
                    console.log("user:")
                    console.log((dadosUsuario))
                    console.log("contato:")
                    console.log((dadosContato))
                    console.log("endereco:")
                    console.log((dadosEndereco))
                    console.log("cliente:")
                    console.log((user))
                }}>
                    dados
                </button> */}
            
        </div>
    );
}

export default Cadastro;