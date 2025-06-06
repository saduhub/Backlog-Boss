import { useQuery } from "@apollo/client";
import { REVIEWS_HOME } from "../utils/queries";
// Style
import '../assets/css/home.css';
// Components
import GameReviewCard from '../components/home/GameReviewCard';
import WelcomeBanner from '../components/home/WelcomeBanner';
import Auth from '../utils/auth';

function Home() {
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(REVIEWS_HOME);
  // console.log(data);
  const reviewData = data?.reviews || {}
  console.log(reviewData);
  const user = Auth.getUser();
  console.log(user)

  if (loading) return <p>Loading Latest Reviews...</p>
  if (error) return <p className="p-8 text-red-600">Something Went Wrong</p>;

  return (
    <section className="home-main-section">
      <WelcomeBanner user={user} />
      <div className='home-main-div'>
        {
          reviewData.map((review) => (
            <GameReviewCard key={review._id} review={review} />
          ))
        }
      </div>
    </section>
  );
}
  
export default Home;