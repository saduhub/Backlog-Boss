import {gql} from '@apollo/client';

export const QUERY_GAME = gql`
  query Query($gameId: ID!) {
    game(id: $gameId) {
      title
      averageRating
      genre
      id
      pictureUrl
      platforms
      releaseDate
      reviews {
        dateOfReview
        id
        likes
        rating
        reviewText
        user {
          email
          id
          hoursPlayed
          username
          profilePictureUrl
        }
      }
    }
  }
`;

export const QUERY_USER_REVIEWS = gql`
  query userReviews($userId: ID!) {
    userReviews(id: $userId) {
      user {
        username
      }
      game {
        title
        pictureUrl
      }
      rating
      likes
      reviewText
    }
  }
`;

export const GAME_PAGE_QUERY = gql`
query gamePage($gameId: ID!) {
  game(id: $gameId) {
    pictureUrl
    platforms
    releaseDate
    reviews {
      reviewText
      user {
        username
        profilePictureUrl
      }
      rating
    }
    averageRating
    genre
    title
  }
  me {
    gamesCompleted {
      id
    }
    gamesInBacklog {
      id
    }
    gamesInFavorites {
      id
    }
    gamesInProgress {
      id
    }
  }
}

`