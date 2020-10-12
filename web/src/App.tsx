import React from 'react'
import './styles/global.css'
import './pages/Landing/landing.css'
import logo from './assets/Logo.svg'

interface TitleProps {
  text: string
}

function App() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logo} alt="Happy"></img>
        <main>
          <h1>leve Felicidad e para o Mundo!</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Novo Hamburgo</strong>
          <strong>Rio Grande do Sul</strong>
        </div>
        <a href="#" className="enter-app">
          <span>enter</span>
        </a>
      </div>
    </div>
  )
}

export default App
