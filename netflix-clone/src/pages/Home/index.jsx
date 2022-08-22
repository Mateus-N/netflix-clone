import React, { useEffect, useState } from 'react'
import './styles.css'
import Tmdb from '../../routes/Tmdb'
import MovieRow from '../../components/MovieRow'
import FeaturedMovie from '../../components/FeaturedMovie'
import Header from '../../components/Header'


// Função que será exportada
export default () => {

  // Constante para conter a lista de filmes que será preenchida com a ativação do useEffects
  const [movieList, setMovieList] = useState ([])
  const [featuredData, setFeaturedData] = useState (null)
  const [blackHeader, setBlackHeader] = useState (false)

  // Função para realizar a consulta de filmes
  useEffect (() => {
    const loadAll = async () => {
      // Pegando a lista de todos os filmes
      let list = await Tmdb.getHomeList()
      setMovieList (list)

      // Pegando o FeaturedMovie
      let originals = list.filter ( i => i.slug === `originals`)
      // Geração de número aleátorio com base na quantidade de itens de originals
      let randomChosen  = Math.floor ( Math.random() * (originals[0].items.results.length - 1))
      // Selecionando item aleatório
      let chosen = originals[0].items.results[randomChosen]
      // Envio do ID escolhido acima para a função no arquivo Tmdb.jsx
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      // Adicionando as informações ao featuredData
      setFeaturedData (chosenInfo)
    }

    // Ativação da função
    loadAll()
  }, [])

  // Controle de scroll para set de background do header
  useEffect (() => {
    const scrollListener = () => {
      if (window.scrollY > 40 ) {
        setBlackHeader (true)
      } else {
        setBlackHeader (false)
      }
    }

    window.addEventListener (`scroll`, scrollListener)

    return () => {
      window.removeEventListener (`scroll`, scrollListener)
    }
  }, [])

  // Parte que será retornada
  return (
    // Exibição do conteúdo na tela
    <div className='pages'>

      {/* Importação do componente */}
      <Header black={blackHeader}/>

      {/* Importação do componente */}
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      {/* Sessão que irá conter todas as listas */}
      <section className='lists'>
        {/* Exibição do componente repetido de acordo com a função .map para a lista filmes */}
        {movieList.map((item, key) => (
          // Componente exportando props para serem resgatados no arquivo MovieRow
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>Made by Mateus Nunes</p>
        <p>Direitos de imagem para Netflix</p>
        <p>Dados pegos do site Themoviedb.org</p>
      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
        <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif" alt="Carregando" />
      </div>
      }
    </div>
  )
}
