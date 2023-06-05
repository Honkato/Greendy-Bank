import { useEffect, useState } from "react";
import api from "../components/api";


function Extrato() {
    const [extrato, setExtrato] = useState([])
    const [user, setUser] = useState(0)

    useEffect(() => {
        let tokenAccess = JSON.parse(localStorage.getItem("token"))
        if (tokenAccess == undefined) {
            return
        }
        api.get('auth/users/me/', { headers: { Authorization: "JWT " + tokenAccess.access } })
            .then((res) => {
                setUser(res.data.id)
                api.get("bank/movimentacao/", { headers: { Authorization: "JWT " + tokenAccess.access } }
                )
                    .then((response) => {
                        console.log(response)
                        setExtrato(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((res) => {

            })

    }, []);

    return (
        <>
            <div className='flex w-full min-h-screen h-fit bg-gradient-to-t from-[#5C9794] to-[#22CC91]'>
                <div className="w-screen">


                    <div className="flex flex-col m-3 justify-center">
                        {user == 0 ?
                            <div className="flex flex-1 justify-center">
                                <text className="text-center text-2xl font-bold">
                                    Você não está logado
                                </text>
                            </div>
                            : <>
                                {extrato.length == 0 ?
                                    <div className="flex flex-1 justify-center">
                                        <text className="text-center text-2xl font-bold">
                                            Não há extratos
                                        </text>
                                    </div>
                                    : <>
                                        {extrato.map((item) =>

                                            <div className="flex flex-col m-2">
                                                <div className={item.remetente == user ? "flex flex-col p-2 border-2 border-rose-600 rounded-lg" : "flex flex-col p-2 border-2 rounded-lg"} key={item.id}>
                                                    <text>
                                                        <text className="font-bold">Nome: </text>{item.remetente == user ? item.destinatarioNome : item.remetenteNome}
                                                    </text>
                                                    <text>
                                                        <text className="font-bold">Chave Pix:</text>{item.remetente == user ? item.chavePix : " To You "}
                                                    </text>
                                                    <text>
                                                        <text className="font-bold">Valor: </text>{item.remetente == user ? "-" : '+'}R${item.valor}
                                                    </text>
                                                    <text>
                                                        <text className="font-bold">Observação: </text>{item.descricao}
                                                    </text>
                                                </div>
                                            </div>
                                        )}
                                    </>}</>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Extrato;