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
`;

export const POPULAR_GAMES = gql`
  query getPopularGames {
    getPopularGames {
      id
      name
      background_image
      rating
      ratings_count
    }
  }
`;

export const GET_AI_IMAGE = gql`
  query getAiImage($prompt: String!) {
    getAiImage(prompt: $prompt) {
      url
    }
  }
`;