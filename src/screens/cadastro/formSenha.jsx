import { useState } from "react";
import FormBasico from "./formBasico";

function FormSenha({ dados, setDados, setForm, createUser }) {
    const [confirm, setConfirm] = useState('')
    const averiguarSenhar =()=>{
        const maiuscula = /[A-Z]/
        const numeros = /[0-9]/
        const especiais = /[!|@|#|$|%|^|&|*|(|)|-|_]/
        const proibidos = /['|"|||{|}]/
        if (dados.password != confirm){
            alert('senhas diferentes')
            return true
        }
        if (dados.password.length < 6){
            alert('senha muito pequena')
            return true
        }
        if (!maiuscula.test(dados.password)){
            alert('deve conter ao menos 1 letra maiuscula')
            return true
        }
        if (!numeros.test(dados.password)){
            alert('deve conter ao menos 1 numero')
            return true
        }
        if (!especiais.test(dados.password)){
            alert('deve conter ao menos 1 caracter especial')
            return true
        }
        if (proibidos.test(dados.password)){
            alert('há caracteres que não podem ser utilizados')
            return true
        }
        return false
        
    }
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                let btn = e.nativeEvent.submitter
                if (btn.id == "prev") {
                    setForm(2)
                } else if (btn.id == "finish") {
                    if (averiguarSenhar()){
                        return
                    }
                    createUser()
                    
                }
            }} className="w-96">
                <FormBasico dados={dados} setDados={setDados} info={[
                    {'nome': "password", 'ml': 200, 'req': true, 'type':'password', 'customClassName':'p-1 bg-white text-black rounded-xl h-fit w-fit outline-none'}
                ]}
                />
                <div className="flex flex-col">
                <text className="font-semibold">
                    CONFIRM PASSWORD
                </text>
                <input className="p-1 bg-white text-black rounded-xl h-fit w-fit outline-none" type="password" maxLength={200} value={confirm} onChange={(e)=>setConfirm(e.target.value)}
                placeholder="confirm password"
                />
                <div>
                    <ul>
                        *A senha deve conter ao menos:
                        <li>6 digitos</li>
                        <li>1 letra maiuscula</li>
                        <li>1 caracter especial</li>
                        <li>1 numero</li>
                    </ul>
                </div>
                <div>
                    <text>
                        
                    </text>
                </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between mt-2">
                        <button className="w-16" formNoValidate={true} id="prev">prev</button>
                        <button className="w-16" id="finish">finish</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FormSenha;