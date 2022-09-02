const API_KEY = `language=pt-BR&api_key=240e4ddac5c36936ccf7654767fb0e32`
const API_BASE= `https://api.themoviedb.org/3`

/*
- Originais netflix
- Recomendados para você
- Em alta (top rated)
- ação
- comédia
- romance
- aventura
*/

// Função para consulta na api
const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`)
  const json = await req.json()
  return json
}

// Parte exportada
export default {
  // Função assincrona para consulta e obtenção das listas de filmes utilizando utilizando a função criada acima
  getHomeList: async () => {
    return [
      {
        slug: `originals`,
        title: `Originais do Netflix`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/discover/tv?with_network=213&${API_KEY}`)
      },
      {
        slug: `trending`,
        title: `Recomendados para você`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/trending/all/week?${API_KEY}`)
      },
      {
        slug: `toprated`,
        title: `Em alta`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/movie/top_rated?${API_KEY}`)
      },
      {
        slug: `action`,
        title: `Ação`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/discover/movie?with_genres=28&${API_KEY}`)
      },
      {
        slug: `comedy`,
        title: `Comédia`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/discover/movie?with_genres=35&${API_KEY}`)
      },
      {
        slug: `romance`,
        title: `Romance`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/discover/movie?with_genres=10749&${API_KEY}`)
      },
      {
        slug: `documentary`,
        title: `Documentário`,
        // Obtenção da lista de filmes
        items: await basicFetch (`/discover/movie?with_genres=99&${API_KEY}`)
      }
    ]
  },
  // Pegar infos de um filme em específico
  getMovieInfo: async (movieId, type) => {
    // Declaração de variável que conterá as infos
    let info = {}

    // Verificação se o ID foi enviado
    if (movieId) {
      // Switch para filmes e séries
      switch(type) {
        case 'movie':
          // Infos para filmes
          info = await basicFetch(`/movie/${movieId}?${API_KEY}`)
          break
        case 'tv':
          // Infos para séries
          info = await basicFetch(`/tv/${movieId}?${API_KEY}`)
          break
        // Valor padrão
        default:
          info = null
          break
      }
    }

    // Retorno da info
    return info
  }
}
