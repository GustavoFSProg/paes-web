import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import paes1 from '../../assets/paes.jpeg'
import '../../styles/global.css'
import './landing.css'

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={paes1} alt="paes" />
        <main>
          <h1>Encomende seus pães caseiros!</h1>
          <p>Experimente já!.</p>
        </main>

        <div className="location">
          <strong>Novo Hamburgo</strong>
          <strong>Rio Grande do Sul</strong>
        </div>
        <Link to="/" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  )
}
