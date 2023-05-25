import { useState } from "react";
import FormBasico from "./formBasico";

function FormSenha({ dados, setDados, setForm, createUser }) {
    const [confirm, setConfirm] = useState('')
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                let btn = e.nativeEvent.submitter
                if (btn.id == "prev") {
                    setForm(2)
                } else if (btn.id == "finish") {
                    if (dados.password != confirm){
                        alert('senhas diferentes')
                        // return
                    }
                    createUser()
                    
                }
            }}>
                <FormBasico dados={dados} setDados={setDados} info={[
                    {'nome': "password", 'ml': 200, 'req': true}
                ]}
                />
                <input maxLength={200} value={confirm} onChange={(e)=>setConfirm(e.target.value)}
                />
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