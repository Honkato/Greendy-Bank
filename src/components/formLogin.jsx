import React from "react";
import { useNavigate } from "react-router-dom";

function FormLogin({goCadastro}) {
    return (
        <div className="flex flex-row bg-gradient-to-b from-[#287A6B] to-[#1e6b5d] align-middle items-center justify-between">
            <form className="flex flex-row rounded-none shadow-none bg-gradient-to-b from-[#287A6B] to-[#1e6b5d] align-middle items-center justify-between">
                <div className='flex pl-5 pt-3 pb-3 items-center sm:flex-row flex-col'>
                    <div className='pr-0 pb-2 sm:pb-0 sm:pr-3'>
                        <text>CPF: </text>
                        <input className="w-32" placeholder="XXX.XXX.XXX-XX"></input>
                    </div>
                    <div className='pr-0 sm:pr-3'>
                        <text>Senha: </text>
                        <input className="w-28" placeholder="*****"></input>
                    </div>
                </div>
                {/* <div className="">
                    permanecer logado?
                    <input type="checkbox" className="cursor-pointer 
    w-5 h-5 border-3 rounded-lg hover:checked:bg-green-400 outline-none checked:bg-green-300"/>
                </div> */}
                <button className=" w-10 font-bold">OK</button>
            </form>
            <></>
            {/* <Link >Não tenho uma conta</Link> */}
            <button className="bg-transparent text-[#ffe816]" onClick={goCadastro}>Não tenho uma conta</button>
        </div>
    );
}

export default FormLogin;