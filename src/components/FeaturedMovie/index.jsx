import React from "react";
import './styles.css'

export default ({item}) => {

  // Manipulação da data para utilizar apenas o ano
  let firstDate = new Date (item.first_air_date)
  // Manipulação da listas de gêneros para exibição limpa
  let genres = []
  // iteração no array de gêneros para adicionar no array apenas os nomes dos gêneros
  for ( let i in item.genres) {
    genres.push( item.genres[i].name)
  }

  let description = item.overview
  if ( description.length > 200 ) {
    description = description.substring (0, 200) + `...`
  }

  return (
    // Sessão do topo da página
    <section className="featured" style={{
      // imagem de fundo pega concatenando link
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      {/* Grandiente vertical */}
      <div className="featured--vertical">
        {/* Gradiente Horizontal */}
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average.toFixed(1)} Pontos</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? `s` : ``}</div>
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a href={`${item.id}`} className="featured--watchbutton">Assistir</a>
            <a href={`${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
          </div>
          <div className="featured--genres"><strong>Gêneros:</strong> {genres.join (`, `)}</div>
        </div>
      </div>
    </section>
  )
}
