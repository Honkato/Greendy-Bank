import FormBasico from "./formBasico";

function FormUsuario({ dados, setDados, setForm }) {
    // const getBase64 = (file)=> {
    //     if (file == ""){
    //         return
    //     }
    //     let document = "";
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         document = reader.result;
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };

    //     return document;
    // }
    function TestaCPF(strCPF) {
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

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (dados.tipo_de_pessoa != '') {
                    if (!TestaCPF(dados.identifier)) {
                        alert("CPF inválido")
                        return
                    }
                    if (!descobrirDigito(dados.rg)) {
                        alert("RG inválido")
                        return
                    };
                    setForm(1)
                } else {
                    alert('É necessario definir o tipo de cliente')
                }
            }}>
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
                                { 'nome': "identifier", 'ml': 11, 'req': true, 'mask':'cpf' },
                                { 'nome': "rg", 'ml': 9, 'req': true }
                            ]}
                            />
                            :
                            <FormBasico dados={dados} setDados={setDados} info={[
                                { 'nome': "nome", 'ml': 200, 'req': true, 'mask': 'nome_razao_social' },
                                { 'nome': "nomeSocial", 'ml': 200, 'req': false, 'mask': 'nome_fantasia' },
                                { 'nome': "date_of_birth", 'ml': 8, 'req': true, 'mask': 'data de criação', 'type': 'date' },
                                { 'nome': "identifier", 'ml': 14, 'req': true, 'mask':'cnpj' },
                                { 'nome': "inscricao_estadual", 'ml': 9, 'req': true },
                                { 'nome': "inscricao_municipal", 'ml': 12, 'req': true }
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