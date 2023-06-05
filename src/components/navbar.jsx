import { useState } from "react";
import logo from '/src/assets/logo.svg'

const NavBar = ({ forms, showNavBar, goHome }) => {
    const [tab, setTab] = useState(false)

    return (
        <>
            <div className={showNavBar ? "shadow-lg" : "hidden"}>
                {forms}
            </div>

            <nav className="w-full h-fit shadow-lg bg-[#287A6B] flex flex-col  justify-around">
                <div className="flex flex-row shadow-2xl h-16 items-center justify-between">
                    <div className="m-2">
                        <button onClick={goHome} className="bg-transparent rounded-full">
                            <img src={logo}></img>
                        </button>
                    </div>
                    <button className="bg-transparent sm:hidden m-2 ">
                        <div onClick={() => setTab(!tab)} className="sm:hidden h-7 w-10 flex flex-col justify-around">
                            <div className="h-1 bg-black" />
                            <div className="h-1 bg-black" />
                            <div className="h-1 bg-black" />
                        </div>
                    </button>
                </div>
                <ul className={" flex flex-col items-center justify-around sm:flex-row "+ (tab ? " hidden sm:inline-flex" : "")}>
                    <li className="">opção legal 1</li>
                    <li className="">opção maneira 2</li>
                    <li>opção divertida 3</li>
                    <li>opção incrivel 4</li>
                    <li>opção legaozona 5</li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;