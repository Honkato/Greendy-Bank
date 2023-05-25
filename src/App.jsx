import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/home'
import NavBar from './components/navbar'
import Cadastro from './screens/cadastro/cadastro'
import { Route, Routes, useNavigate, useLocation, createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Login from '../../store/src/screens/Login'
import FormLogin from './components/formLogin'

function App() {
  // const navigate = useNavigate()
  let location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(()=>{
    /*
    VERIFICA SE ESTA LOGADO
    */
  },[])
  useEffect(()=>{
    console.log(location.pathname);
    setShowNavBar(true)
    if (location.pathname.includes('cadastro')){
      setShowNavBar(false)
    }
  },[location])
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Home/>,
  //   },
  //   {
  //     path: '/Cadastro',
  //     element: <Cadastro />
  //   }
  // ])
  ////FORM LOGIN

  //--FORM LOGIN
  const goCadastro=()=>{
    navigate('/cadastro')
  }
  const goHome=()=>{
    navigate('/')
  }
  return (
    <div>
      
      <NavBar goHome={goHome} showNavBar={showNavBar} forms={<FormLogin goCadastro={goCadastro}/>}/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
      </Routes>
    </div>
  )
}

export default App
