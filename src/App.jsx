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
import axios from 'axios'
import Extrato from './screens/ex-trato'
import api from './components/api'

function App() {
  // const navigate = useNavigate()
  let location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(true)
  const [isLogged, setIsLogged] = useState(false)

  const salvarLocalToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token))
  }
  const pegarLocalToken = () => {
    return JSON.parse(localStorage.getItem("token"))
  }

  useEffect(()=>{
    setTimeout(()=>{

    }, [1000])
  })

  const getToken = () => {
    api.post('auth/jwt/create', {
      identifier: cpf,
      password: senha,
    }).then((res) => {
      salvarLocalToken(res.data)
      console.log(res.data)
    })
  }
  const goLogin = (cpf, senha) => {
    api.post('auth/jwt/create', {
      identifier: cpf,
      password: senha,
    }).then((res) => {
      salvarLocalToken(res.data)
      console.log(res.data)
      goExtrato()
    }).catch((res)=>{
      alert('usuario ou senha incorretos')
      if(res.response.status == 401){
        api.get(`bank/clientesB/${cpf}/`).then((res)=>{
          console.log(res);
          alert('sua conta esta bloqueada por excesso de tentativas, tente mais tarde :)')
        })

      }
    })
  }
  useEffect(() => {
    /*
    VERIFICA SE ESTA LOGADO
    */
  }, [])
  useEffect(() => {
    console.log(location.pathname);
    setShowNavBar(true)
    if (location.pathname.includes('cadastro')) {
      setShowNavBar(false)
    }
  }, [location])
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
  const goCadastro = () => {
    navigate('/cadastro')
  }
  const goHome = () => {
    navigate('/')
  }
  const goExtrato = () => {
    if (location.pathname.includes('extrato')) {
      window.location.reload()
    }
    
    navigate('/extrato')
  }
  return (
    <div>

      <NavBar goHome={goHome} showNavBar={showNavBar} forms={<FormLogin goCadastro={goCadastro} goLogin={goLogin} />} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastro' element={<Cadastro getToken={getToken}/>} />
        <Route path='/extrato' element={<Extrato />} />
      </Routes>
    </div>
  )
}

export default App
