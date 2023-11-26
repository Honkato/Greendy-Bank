import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../components/api";

function Home() {
    const angularB = 'src/assets/images/angularB.png'
    const angularW = 'src/assets/images/angularW.png'
    const caramelo = 'src/assets/images/caramelo.png'
    const centralized = 'src/assets/images/centralized.png'
    const footer = 'src/assets/images/footer.png'
    const pixImage = 'src/assets/images/pixImage.png'

    const [extrato, setExtrato] = useState([])

    useEffect(() => {
        // let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"))
        api.get("bank/movimentacao/"
            // , {headers: { Authorization: "JWT " + tokenAccess }}
        )

            .then(function (response) {
                console.log(response)
                setExtrato(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);

    return (
        <>

            <div className='flex w-full h-fit bg-gradient-to-t from-[#5C9794] to-[#22CC91]'>
                <div className="w-full flex-col flex overflow-hidden">
                    <div className="flex flex-row justify-center flex-wrap">
                        <img className="h-[30rem] md:h-[50rem]" src={centralized}></img>
                        <div className="flex flex-row justify-center flex-wrap md:m-0 mt-10">
                            <img className='w-64 h-80 md:w-[24rem] md:h-[31rem] md:m-0 -mt-10' src={angularW}></img>
                            <img className="w-64 h-80 md:w-[24rem] md:h-[31rem] md:-ml-24 md:mt-96  drop-shadow-2xl" src={angularB}></img>
                        </div>
                    </div>
                    <div className="bg-[#287A6B] flex flex-row w-full">
                        <div className="flex-1 flex flex-col pl-2 md:pl-12 py-2 md:py-8 justify-between">
                            <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 border-r-2 border-b-2 border-black flex flex-row text-sm md:text-xl ">
                                <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                <p className="text-center">In our bank you can make pix with more practicities</p>
                            </div>

                            <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 border-r-2 border-black flex flex-row text-sm md:text-xl">
                                <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                <p className="text-center">In our bank you can make pix with more practicities</p>
                            </div>

                        </div>
                        <div className="flex-1  flex flex-col pr-2 md:pr-12 py-2 md:py-8 justify-between w-full">
                            <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 border-b-2 border-black flex flex-row text-sm md:text-xl">
                                <p className="text-center">In our bank you can make pix with more practicities</p>
                                <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                            </div>

                            <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex flex-row text-sm md:text-xl">
                                <p className="text-center">In our bank you can make pix with more practicities</p>
                                <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row w-screen justify-center">
                        <div className="w-screen xl:w-fit flex flex-col items-center justify-center">
                            <img className="w-40 sm:w-96 m-2 border border-black rounded-md" src={caramelo}></img>
                            <text className="text-center">Com o nosso banco voce ficara tao de boa e filiz quanto esse gentil caramelo maroto</text>
                        </div>
                        <div className="flex flex-col flex-wrap p-2">
                            <div className=" flex flex-row border-t xl:border-l xl:border-t-0 border-black">
                                <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 flex flex-col text-sm md:text-xl ">
                                    <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                    <p className="text-center">Speak with us</p>
                                </div>
                                <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 flex flex-col text-sm md:text-xl ">
                                    <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                    <p className="text-center">Speak with us</p>
                                </div>
                                <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 flex flex-col text-sm md:text-xl ">
                                    <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                    <p className="text-center">Speak with us</p>
                                </div>
                            </div>
                            <div className=" flex flex-row xl:border-l border-black">
                                <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 flex flex-col text-sm md:text-xl ">
                                    <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                    <p className="text-center">Speak with us</p>
                                </div>
                                <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 flex flex-col text-sm md:text-xl ">
                                    <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                    <p className="text-center">Speak with us</p>
                                </div>
                                <div className="justify-center items-center px-2 md:px-12 py-2 md:py-8 flex-1 flex flex-col text-sm md:text-xl ">
                                    <img src={pixImage} className=" w-20 h-20 md:w-40 md:h-40"></img>
                                    <p className="text-center">Speak with us</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="">
                        <>
                            {extrato.map((item) =>
                                <>
                                    <div key={item.id}>
                                        {item.valor}
                                    </div>
                                </>
                            )}
                        </>
                    </div>
                    <div className="bg-[#404040] h-96">

                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;