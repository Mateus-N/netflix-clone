import React, { useState } from "react"
import './styles.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Função que será exportada
export default ({ title, items }) => {

  const [scrollx, setScrollx] = useState(0)

  const handleLeftArrow = () => {
    let x = scrollx + Math.round (window.innerWidth / 2)
    if ( x > 0 ) {
      x = 0
    }

    setScrollx(x)
  }

  const handleRightArrow = () => {
    let x = scrollx - Math.round (window.innerWidth / 2)
    let listWidth = items.results.length * 150
    if ((window.innerWidth - listWidth) > x ) {
      x = (window.innerWidth - listWidth) - 60
    }

    setScrollx(x)
  }

  // Retorno da função
  return (
    // Lista horinzontal de filmes
    <div className="movieRow">
      {/* Título da linha que é puxado dos objetos no arquivo Tmdb.jsx */}
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>

      {/* Área total que a lista ocupa, é a área que será usada para o correr da lista (Trilho da lista) */}
      <div className="movieRow--listarea">
        {/* Área que corre com os filmes na horizontal no espaço da lista anterior (Vagão) */}
        <div className="movieRow--list" style={{
          marginLeft: scrollx,
          width: items.results.length * 150
        }}>
          {/* Função que irá expor na tela todos as capas de filmes com a função .map */}
          {items.results.length > 0 && items.results.map (( item, key) => (
            // Identificação do elemento poster
            <div key={key} className="movieRow--item">
              {/* Link concatenado para buscar os posters dos filmes */}
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
