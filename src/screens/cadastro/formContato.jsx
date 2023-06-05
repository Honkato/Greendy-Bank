
import api from "../../components/api";
import FormBasico from "./formBasico";

function FormContato({ dados, setDados, setForm }) {
    function validacaoEmail(field) {
        let usuario = field.substring(0, field.indexOf("@"));
        let dominio = field.substring(field.indexOf("@")+ 1, field.length);
        if ((usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true
        } else{
        return false
        }
    }
    const proximo=async()=>{
        let block = false
        await api.get(`bank/numeros/${dados.numero}`)
        .then((res)=>{
            if (res.data.exist){
                alert('esse numero ja existe no nosso banco')
                block = true
            }
        })
        await api.get(`bank/emails/${dados.email}`)
        .then((res)=>{
            if (res.data.exist){
                alert('esse email ja existe no nosso banco')
                block = true
            }
        })
        if (block){
            return
        }
        setForm(3)
    }
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                let btn = e.nativeEvent.submitter
                if (btn.id == "prev") {
                    setForm(1)
                } else if (btn.id == "next") {
                    if (dados.numero.length != 11){
                        alert("numero precisa ser válido")
                        return
                    }
                    if (!validacaoEmail(dados.email)){
                        alert("Email invalido")
                        return
                    }
                    proximo()
                    
                }
            }} className="w-96">
                <FormBasico dados={dados} setDados={setDados} info={[
                    { 'nome': "numero", 'ml': 11, 'req': true },
                    { 'nome': "ramal", 'ml': 4, 'req': false },
                    { 'nome': "email", 'ml': 100, 'req': true },
                    { 'nome': "observacao", 'ml': 200, 'req': false }
                ]}
                />
                <div>
                    <div className="flex flex-row justify-between mt-2">
                        <button className="w-16" formNoValidate={true} id="prev">prev</button>
                        <button className="w-16" id="next">next</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FormContato;