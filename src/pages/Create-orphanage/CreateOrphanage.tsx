import React, { FormEvent, useState, ChangeEvent } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'
import { useHistory } from 'react-router-dom'

import { FiArrowLeft, FiPlus } from 'react-icons/fi'

import mapMarkerImg from '../../assets/map_marker.svg'
import './create-orphanage.css'
import api from '../../services/api'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
})

export default function CreateOrphanage() {
  const { goBack } = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const history = useHistory()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [instructions, setInstructions] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState([])
  const [open_on_weekend, setOpenOnWeekend] = useState(true)

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng,
    })

    return true
  }

  function handleSeletImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview: any = selectedImages.map((image) => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const { latitude, longitude } = position

      const data = new FormData()

      data.append('name', name)
      data.append('about', about)
      data.append('opening_hours', opening_hours)
      data.append('instructions', instructions)
      data.append('latitude', String(latitude))
      data.append('longitude', String(longitude))
      data.append('open_on_weekend', String(open_on_weekend))
      images.forEach((image) => {
        data.append('images', image)
      })

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

      await api.post('/orphanages', data)

      console.log(data)

      return alert('Cadastro realizado com sucesso!')

      history.push('/app')
    } catch (error) {
      console.log(error)
      return true
    }
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

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt="name" />
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="image[]"
                className="botao-imagem"
                onChange={handleSeletImage}
              />
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
