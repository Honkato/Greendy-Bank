import FormBasico from "./formBasico";

function FormEndereco({ dados, setDados, setForm }) {
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                let btn = e.nativeEvent.submitter
                if (btn.id == "prev") {
                    setForm(0)
                } else if (btn.id == "next") {
                    setForm(2)
                }
            }} className="w-96">
                <FormBasico dados={dados} setDados={setDados} info={[
                    { 'nome': "cep", 'ml': 8, 'req': true, 'type': 'number' },
                    { 'nome': "uf", 'ml': 2, 'req': true },
                    { 'nome': "cidade", 'ml': 40, 'req': true },
                    { 'nome': "bairro", 'ml': 50, 'req': true },
                    { 'nome': "logradouro", 'ml': 200, 'req': true },
                    { 'nome': "numero", 'ml': 10, 'req': true, 'type': 'number' },
                    { 'nome': "complemento", 'ml': 10, 'req': false },
                ]}
                />
                <div className="flex flex-row justify-between mt-2">
                    <button className="w-16" formNoValidate={true} id="prev">prev</button>
                    <button className="w-16" id="next">next</button>
                </div>
            </form>
        </>
    );
}

export default FormEndereco;