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
    }
  ];
  
  return (
    <div className="home-container">
      <section className="home-main-header">
        <h2>
          Hello, Username
        </h2>
      </section>

      <section className="home-inner-box">
        <div className="home-sub-header">
          <h3>
            Trending Games
          </h3>
        </div>
        {gameObjs.map(game => {
          return (
            <HomeGameCard key={game.title} game={game} />
          )
        })}
      </section>
    </div>
  );
};

export default Home;