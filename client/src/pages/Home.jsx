import '../assets/css/home.css';

import HomeGameCard from '../components/Home-Game-Card';

const Home = () => {
  const gameObjs = [
    {
      title: 'Game Title',
      username: 'Username',
      review: 'Game review',
      rating: 4.9,
      likes: 70,
    },
    {
      title: 'Game Title 2',
      username: 'Username 2',
      review: 'Game review 2',
      rating: 5.0,
      likes: 65,
    },
    {
      title: 'Game Title 3',
      username: 'Username 3',
      review: 'Game review 3',
      rating: 3.2,
      likes: 18,
    }
  ];
  
  return (
    <div className="home-container">
      <section className="home-main-header home-font">
        <h2>
          Hello, Username
        </h2>
      </section>

      <section className="home-inner-box">
        <div className="home-sub-header home-font">
          <h3>
            Trending Games
          </h3>
        </div>
        <div className="home-flex home-gap home-content-center">
          {gameObjs.map(game => {
            return (
              <HomeGameCard key={game.title} game={game} />
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Home;