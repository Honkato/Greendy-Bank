import { useEffect, useState } from "react";

function FormBasico({ dados, setDados, info }) {
    
    return (
        <>
            {info.map((item, index) =>
                <div className="flex flex-col" key={item.nome}>

                    <text className="font-semibold">
                        {item.mask != undefined ? item.mask.replaceAll("_", " ").toUpperCase() : item.nome.replaceAll("_", " ").toUpperCase()}
                    </text>
                    {item.req ?
                        <input
                            className={item.customClassName != undefined ? item.customClassName :"p-1 bg-white text-black rounded-xl h-fit w-full outline-none"}
                            required
                            type={item.type != undefined ? item.type : "text"}
                            id={item.id != undefined ? item.id : undefined}
                            name={item.nome}
                            maxLength={item.ml}
                            placeholder={item.mask != undefined ? item.mask.replaceAll("_", " ") : item.nome.replaceAll("_", " ")}
                            value={dados[item.nome]}
                            onChange={(e) => {
                                // {item.type == 'number'?<></>:<></>}
                                setDados({ ...dados, [item.nome]: e.target.value})
                            }}
                        /> :
                        <input
                            className={item.customClassName != undefined ? item.customClassName :"p-1 bg-white text-black rounded-xl h-fit w-full outline-none"}
                            type={item.type != undefined ? item.type : "text"}
                            id={item.id != undefined ? item.id : undefined}
                            name={item.nome}
                            maxLength={item.ml}
                            placeholder={item.mask != undefined ? item.mask.replaceAll("_", " ") : item.nome.replaceAll("_", " ")}
                            value={dados[item.nome]}
                            onChange={(e) =>{ 
                                // {item.type == 'number'?<></>:<></>}
                                setDados({ ...dados, [item.nome]: e.target.value})
                                }}
                        />}
                </div>
            )}
        </>
    );
}

export default FormBasico;