import '../assets/css/home.css';

import { useEffect, useState } from 'react';

import HomeGameCard from '../components/Home-Game-Card';

const Home = () => {
  const gameObjs = [
    {
      id: 0,
      title: 'Game Title',
      username: 'Username',
      review: 'Game review',
      rating: 4.9,
      likes: 70,
    },
    {
      id: 1,
      title: 'Game Title 2',
      username: 'Username 2',
      review: 'Game review 2',
      rating: 5.0,
      likes: 65,
    },
    {
      id: 2,
      title: 'Game Title 3',
      username: 'Username 3',
      review: 'Game review 3',
      rating: 3.2,
      likes: 18,
    },
    {
      id: 3,
      title: 'Game Title 4',
      username: 'Username 4',
      review: 'Game review 4',
      rating: 4.9,
      likes: 70,
    },
    {
      id: 4,
      title: 'Game Title 5',
      username: 'Username 5',
      review: 'Game review 5',
      rating: 5.0,
      likes: 65,
    },
    {
      id: 5,
      title: 'Game Title 6',
      username: 'Username 6',
      review: 'Game review 6',
      rating: 3.2,
      likes: 18,
    },
    {
      id: 6,
      title: 'Game Title 7',
      username: 'Username 7',
      review: 'Game review 7',
      rating: 4.9,
      likes: 70,
    },
    {
      id: 7,
      title: 'Game Title 8',
      username: 'Username 8',
      review: 'Game review 8',
      rating: 5.0,
      likes: 65,
    },
    {
      id: 8,
      title: 'Game Title 9',
      username: 'Username 9',
      review: 'Game review 9',
      rating: 3.2,
      likes: 18,
    }
  ];

  // const rawgKey = getRawgKey();
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    const getGamesbyPopularity = async () => {
/*       const baseUrl = 'https://api.rawg.io/games';
      const url = new URL(baseUrl);
      url.searchParams.append('key', rawgKey);
      url.searchParams.append('metacritic', `${min},${max}`);
      url.searchParams.append('page_size', 9);
      console.log(url); */
  
      // const apiKey = getRawgKey();
      const apiKey = 'e137fde8c0cb4534bc8647570b3ce764';
  
      const url = `https://api.rawg.io/api/games?page_size=9&key=${apiKey}`;
      // console.log(url);
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        // console.log(data.results);
        return data.results;
      } catch (err) {
        console.error(err);
      }
    }
    // popularGames.current = getGamesbyPopularity();
    setPopularGames(getGamesbyPopularity());
  }, [])
  
  return (
    <div className="home-flex home-content-center">
      <div className="home-container">
        <section className="home-main-header home-font">
          <h2>
            Hello, Username
          </h2>
        </section>

        <section className="home-inner-box home-border-radius">
          <div className="home-sub-header home-font">
            <h3>
              Trending Games
            </h3>
          </div>
          <div id="gameCard" className="home-flex home-flex-wrap home-gap home-content-center">
{/*             {popularGames.map((game) => (
                <HomeGameCard key={game.id} game={game} />
            ))} */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home;