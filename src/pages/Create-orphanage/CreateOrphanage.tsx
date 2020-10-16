import React, { FormEvent, useState } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'
import { useHistory } from 'react-router-dom'

import { FiArrowLeft, FiPlus } from 'react-icons/fi'

import mapMarkerImg from '../../assets/map_marker.svg'
import './create-orphanage.css'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
})

export default function CreateOrphanage() {
  const { goBack } = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [instructions, setInstructions] = useState('')

  const [open_on_weekend, setOpenOnWeekend] = useState(true)
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng,
    })

    return console.log(event.latlng)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    console.log({
      position,
      about,
      instructions,
      opening_hours,
      name,
      latitude,
      longitude,
      open_on_weekend,
    })
  }

  return (
    <div id="page-create-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Abertos que Horas</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekend ? 'active' : ''}
                  onClick={() => setOpenOnWeekend(true)}
                >
                  Sim
                </button>
                <button
                  className={!open_on_weekend ? 'active' : ''}
                  type="button"
                  onClick={() => setOpenOnWeekend(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}
