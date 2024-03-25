import {gql} from '@apollo/client';

export const ME = gql`
  query me {
    me {
      _id
      email
      hoursPlayed
      username
      profilePictureUrl
      friends {
        _id
        username
      }
      games100Completed {
        _id
      }
      gamesCompleted {
        _id
      }
      gamesInBacklog {
        _id
      }
      gamesInFavorites {
        _id
      }
      gamesInProgress {
        _id
      }
      likedReviews {
        _id
      }
      reviews {
        _id
      }
      friendRequests {
        _id
      }
    }
  }
`;

export const GAME_SUGGESTIONS = gql`
  query gameSuggestions {
    gameSuggestions {
      _id
      title
      pictureUrl
    }
  }
`;

export const USER_LIKES = gql`
  query userReviews($userReviewsId: ID!) {
    userReviews(id: $userReviewsId) {
      _id
      likes
    }
  }
`;

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