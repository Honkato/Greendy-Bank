import api from "../../components/api";
import FormBasico from "./formBasico";


function FormUsuario({ dados, setDados, setForm }) {
    function validarCNPJ(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let i = 0;
        let pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    }
    function TestaCPF(strCPF) {
        if (strCPF.length == 14) {
            return validarCNPJ(strCPF)
        }
        let Soma;
        let Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    function descobrirDigito(rg) {
        let rg1 = rg.substring(0, (rg.length - 1))
        let numVerUsuario = rg.substring((rg.length - 1))
        let digitos = rg1.split("");
        let totais = [];
        let total = 0;
        console.log(rg)
        console.log(rg1)
        console.log(numVerUsuario)
        // Multiplicamos os que seriam da primeira linha com os da segunda    
        digitos.forEach(function (digito, index) {
            totais.push(Number(digito) * (2 + index));
        });

        // Multiplicamos as colunas
        totais.forEach(function (numero) { total += numero });

        // Descobrimos o resto da divisão
        let resto = total % 11;

        let numVerSistema = 11 - resto;
        console.log(numVerSistema)

        if (numVerSistema == 11) {
            if (numVerUsuario == 0) {
                return true;
            } else {
                return false;
            }
        }
        if (numVerSistema == 10) {
            if (numVerUsuario == 'X' || numVerUsuario == 'x') {
                return true;
            } else {
                return false;
            }
        }
        if (numVerSistema == numVerUsuario) {
            return true
        } else {
            return false
        }

    }
    const proximo = async () => {
        let block = false
        await api.get(`bank/cnpjcpf/${dados.identifier}`)
            .then((res) => {
                if (res.data.exist) {
                    alert('esse CPF/CNPJ ja existe no nosso banco')
                    block = true
                }
            })
        await api.get(`bank/rg/${dados.rg}`)
            .then((res) => {
                if (res.data.exist) {
                    alert('esse rg ja existe no nosso banco')
                    block = true
                }
            })
        if (block) {
            return
        }
        setForm(1)
    }

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                if (dados.tipo_de_pessoa != '') {
                    if (!TestaCPF(dados.identifier)) {
                        alert("CPF inválido")
                        return
                    }
                    if (dados.tipo_de_pessoa == 'F') {
                        if (!descobrirDigito(dados.rg)) {
                            alert("RG inválido")
                            return
                        };
                    }
                    proximo()



                } else {
                    alert('É necessario definir o tipo de cliente')
                }
            }} className="w-96">
                <FormBasico dados={dados} setDados={setDados} info={[

                ]}
                />
                <div className="flex flex-col">
                    <text className="font-semibold">TIPO DE CLIENTE</text>
                    <select className="" value={dados.tipo_de_pessoa} onChange={(e) => setDados({ ...dados, tipo_de_pessoa: e.target.value })} defaultValue="">
                        {/* <option hidden disabled value="">____________________</option> */}
                        <option hidden disabled className="" value="">SELECIONE</option>
                        <option hidden disabled value="">____________________</option>
                        <option value={'F'}>Pessoa Física</option>
                        <option value={'J'}>Pessoa Juridica</option>
                    </select>
                </div>
                {dados.tipo_de_pessoa == '' ? <></> :
                    <>

                        {dados.tipo_de_pessoa == 'F' ?
                            <FormBasico dados={dados} setDados={setDados} info={[
                                { 'nome': "nome", 'ml': 200, 'req': true, 'mask': 'nome' },
                                { 'nome': "nomeSocial", 'ml': 200, 'req': false, 'mask': 'nome social' },
                                { 'nome': "date_of_birth", 'ml': 8, 'req': true, 'mask': 'data de nascimento', 'type': 'date' },
                                { 'nome': "identifier", 'ml': 11, 'req': true, 'mask': 'cpf', 'customClassName': "p-1 bg-white text-black rounded-xl h-fit w-fit outline-none" },
                                { 'nome': "rg", 'ml': 9, 'req': true, 'customClassName': "p-1 bg-white text-black rounded-xl h-fit w-fit outline-none" }
                            ]}
                            />
                            :
                            <FormBasico dados={dados} setDados={setDados} info={[
                                { 'nome': "nome", 'ml': 200, 'req': true, 'mask': 'nome_razao_social' },
                                { 'nome': "nomeSocial", 'ml': 200, 'req': false, 'mask': 'nome_fantasia' },
                                { 'nome': "date_of_birth", 'ml': 8, 'req': true, 'mask': 'data de criação', 'type': 'date' },
                                { 'nome': "identifier", 'ml': 14, 'req': true, 'mask': 'cnpj', 'customClassName': "p-1 bg-white text-black rounded-xl h-fit w-fit outline-none" },
                                { 'nome': "inscricao_estadual", 'ml': 9, 'req': true, 'customClassName': "p-1 bg-white text-black rounded-xl h-fit w-fit outline-none" },
                                { 'nome': "inscricao_municipal", 'ml': 12, 'req': true, 'customClassName': "p-1 bg-white text-black rounded-xl h-fit w-fit outline-none" }
                            ]}
                            />
                        }
                        <div>
                            <input
                                className="items-center p-1 bg-white text-black rounded-xl h-fit w-fit outline-none hidden"
                                type='file'
                                id='file-input'
                                name='foto'
                                // maxLength={200}
                                // placeholder={item.mask != undefined ? item.mask.replaceAll("_", " ") : foto.replaceAll("_", " ")}
                                value={dados.foto}
                                onChange={(e) => {
                                    // {item.type == 'number'?<></>:<></>}
                                    setDados({ ...dados, ['foto']: e.target.value })
                                }}
                            />
                            <text className="font-semibold">
                                SELECIONE UMA FOTO
                            </text>
                            <label className="justify-center  flex" for="file-input">
                                <img className="h-20 w-20" src={'https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png'} />
                            </label>
                            {dados.foto == "" ? <text className="text-yellow-400 font-light">sem foto*</text> : <text className="text-green-200 font-light">foto selecionada*</text>}
                            {/* https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png */}
                            {/* <input className="hidden" id="file-input" type="file" /> */}
                        </div>

                    </>}

                <div className="flex justify-end mt-2">
                    <button className="w-16">next</button>
                </div>
            </form>
        </>
    );
}

export default FormUsuario;