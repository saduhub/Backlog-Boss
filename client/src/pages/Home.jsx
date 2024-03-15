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
    <div class="home-container">
      <section class="home-main-header">
        <h2>
          Hello, Username
        </h2>
      </section>

      <section class="home-inner-box">
        <div class="home-sub-header">
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