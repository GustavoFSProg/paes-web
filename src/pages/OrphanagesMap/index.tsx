import React from 'react'
import './styles.css'
import mapMarkerimg from '../../assets/map_marker.svg'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import REACT_APP_MAPBOX_TOKEN from '../../Env'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerimg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],

  popupAnchor: [173, 2],
})

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
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_APP_MAPBOX_TOKEN}`}
        /> */}

        <Marker icon={mapIcon} position={[-29.6899559, -51.1480951]}>
          <Popup
            minWidth={240}
            maxWidth={240}
            closeButton={false}
            className="map-popup"
          >
            <div className="wrapper">
              <Link to="/orphanage/create" className="linke">
                <FiArrowRight size={20} />
              </Link>
            </div>
            <span>Lar das Meninas pobres</span>
          </Popup>
        </Marker>
      </Map>
      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}
