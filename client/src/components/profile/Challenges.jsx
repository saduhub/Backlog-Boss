import { useQuery} from "@apollo/client";
import { USER_LIKES } from "../../utils/queries";
// eslint-disable-next-line
function Challenges({logo, otherData}) {
    const userId = localStorage.getItem('_id');
    const { data, loading, error } = useQuery(USER_LIKES, {
        variables: { userReviewsId: userId },
    });
    console.log(data)
    const likesData = data?.userReviews || []
    console.log(error);
    console.log(likesData);
    // eslint-disable-next-line
    const reviewedGamesCount = otherData.reviews.length;
    const likesCount = likesData.reduce((total, current) => total + current.likes, 0);
    const reviewedGamesWidth = `${(reviewedGamesCount / 50) * 100}%`;
    const likesWidth = `${(likesCount / 200) * 100}%`;

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-challenges">
            <h2>Challenges</h2>
            {/* Reviewed */}
            <div className="profile-games-reviewed">
                <div className="profile-reviewed-image">
                    <img src={logo} alt="placeholder" />
                </div>
                <div className="profile-progress">
                    <div className="profile-title-number">
                        <h3>Games Reviewed</h3>
                        {/* eslint-disable-next-line */}
                        <h4><span className='profile-highlighted-text'>{reviewedGamesCount}</span>/50</h4>
                    </div>
                    <div className='profile-progress-bar'>
                        <div className='profile-reviewed' style={{width: reviewedGamesWidth}}>
                            <p>.</p>
                        </div>
                    </div>
                    <h5>Takes the time!</h5>
                </div>
            </div>
        {/* Likes */}
            <div className="profile-likes-gardnered">
                <div className="profile-likes-image">
                    <img src={logo} alt="placeholder" />
                </div>
                <div className="profile-progress">
                    <div className="profile-title-number">
                        <h3>Likes Gardnered</h3>
                        {/* eslint-disable-next-line */}
                        <h4><span className='profile-highlighted-text'>{likesCount}</span>/200</h4>
                    </div>
                    <div className='profile-progress-bar'>
                        <div className='profile-likes' style={{width: likesWidth}}>
                            <p>.</p>
                        </div>
                    </div>
                        <h5>Popular!</h5>
                </div>
            </div>
        </div>
    )
}

export default Challenges;