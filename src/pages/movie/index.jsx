import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './styles.css'

export default () => {

  const API_KEY = `language=pt-BR&api_key=240e4ddac5c36936ccf7654767fb0e32`
  const API_BASE= `https://api.themoviedb.org/3`
  const [movie, setMovie] = useState({})
  let params = useParams()
  let firstDate = new Date (movie.first_air_date)
  let id = params.movieId
  let genres = []

  const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
  }

  for ( let i in movie.genres) {
    genres.push( movie.genres[i].name)
  }

  useEffect (() => {
    const loadMovie = async () => {
      let movie = await basicFetch(`/tv/${id}?${API_KEY}`)
      setMovie(movie)
    }

    loadMovie()
  }, [])

  return (
    <div
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}
      className='container'
    >
      {/* Grandiente vertical */}
      <div className="movie--vertical">
      <Header />
        {/* Gradiente Horizontal */}
        <div className="movie--horizontal">
          <div className="movie--name">{movie.original_name}</div>
          <div className="movie--info">
            <div className="movie--points">{movie.vote_average} Pontos</div>
            <div className="movie--year">{firstDate.getFullYear()}</div>
            <div className="movie--seasons">{movie.number_of_seasons} Temporada{movie.number_of_seasons !== 1 ? `s` : ``}</div>
          </div>
          <div className="movie--description">{movie.overview}</div>
          <div className="movie--buttons">
            <a href={`${movie.id}`} className="movie--watchbutton">Play</a>
            <a href={`${movie.id}`} className="movie--mylistbutton">Episódios</a>
          </div>
          <div className="movie--genres"><strong>Gêneros:</strong> {genres.join (`, `)}</div>
        </div>
      </div>
    </div>
  )
}
