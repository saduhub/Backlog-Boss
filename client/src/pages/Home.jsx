import '../assets/css/home.css';

import { useQuery } from '@apollo/client';
import { POPULAR_GAMES } from '../utils/queries';

import HomeGameCard from '../components/Home-Game-Card';

const Home = () => {
  const { loading, data } = useQuery(POPULAR_GAMES);
  const popularGames = data?.getPopularGames;
  // console.log(popularGames);
  
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
          {loading ? <div className="home-font">Loading...</div> :
            <div id="gameCard" className="home-flex home-flex-wrap">
              {popularGames?.map((game) => (
                  <HomeGameCard key={game.id} game={game} />
              ))}
            </div>}
        </section>
      </div>
    </div>
  )
}

export default Home;