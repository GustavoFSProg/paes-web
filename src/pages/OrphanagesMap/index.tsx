import React from 'react'
import './styles.css'
import mapMarkerimg from '../../assets/map_marker.svg'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import dotenv from 'dotenv'

dotenv.config()

export default function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerimg} alt="markerMap" />

          <h2>Escolha um Orfanato</h2>
          <p>Muitas crianças estão esperando sua visita!:)</p>
        </header>
        <footer>
          <strong>Novo Hamburgo</strong>
          <span>Rio Grande Do Sul</span>
        </footer>
      </aside>

      <Map
        center={[-29.6899559, -51.1480951]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=
          ${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> */}
      </Map>
      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}
