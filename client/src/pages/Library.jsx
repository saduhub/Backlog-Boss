import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import '../assets/css/Library.css';
import { LIBRARY_QUERY } from '../utils/queries';

const Library = () => {
    const { data } = useQuery(LIBRARY_QUERY);

    const me = data?.me;

    return (
        <div className="library-main">
            <div className="library-favorites-div">
                <h1>Favorites</h1>
                <div className="library-favorites-list">
                    {me && me.gamesInFavorites.map(game => (
                        <div key={game._id}>
                            <Link to={`/game/${game._id}`}>
                            <img src={game.pictureUrl} alt={game.title} />
                            </Link>
                            <p>{game.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="library-in-progress-div">
                <h1>In Progress</h1>
                <div className="library-in-progress-list">
                    {me && me.gamesInProgress.map(game => (
                        <div key={game._id}>
                            <Link to={`/game/${game._id}`}>
                            <img src={game.pictureUrl} alt={game.title} />
                            </Link>
                            <p>{game.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="library-backlog-div">
                <h1>Backlog</h1>
                <div className="library-backlog-list">
                    {me && me.gamesInBacklog.map(game => (
                        <div key={game._id}>
                            <Link to={`/game/${game._id}`}>
                            <img src={game.pictureUrl} alt={game.title} />
                            </Link>
                            <p>{game.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="library-completed-div">
                <h1>Completed</h1>
                <div className="library-completed-list">
                    {me && me.gamesCompleted.map(game => (
                        <div key={game._id}>
                            <Link to={`/game/${game._id}`}>
                            <img src={game.pictureUrl} alt={game.title} />
                            </Link>
                            <p>{game.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Library;