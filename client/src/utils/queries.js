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

export const SOCIAL = gql`
  query social {
    me {
      _id
      email
      hoursPlayed
      username
      profilePictureUrl
      friends {
        _id
        username
        profilePictureUrl
      }
      likedReviews {
        _id
      }
      reviews {
        _id
        game {
          _id
          title
        }
        rating
        reviewText
        likes
        dateOfReview
      }
      friendRequests {
        _id
        username
        profilePictureUrl
      }
    }
    users {
      _id
      username
      profilePictureUrl
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

export const USER_VISITED_INFO = gql`
  query userVisitedInfo($id: ID!) {
    userVisitedInfo(id: $id) {
      _id
      username
      profilePictureUrl
      username
      hoursPlayed
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
    _id
    pictureUrl
    platforms
    releaseDate
    reviews {
      reviewText
      dateOfReview
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

export const LIBRARY_QUERY = gql`
query userLibrary {
  me {
    _id
    gamesCompleted {
      _id
      pictureUrl
      title
    }
    gamesInBacklog {
      _id
      pictureUrl
      title
    }
    gamesInFavorites {
      _id
      pictureUrl
      title
    }
    gamesInProgress {
      _id
      pictureUrl
      title
    }
  }
}
`;

export const REVIEWS_HOME = gql`
query ReviewsHome {
  reviews {
    _id
    dateOfReview
    likes
    rating
    reviewText
    user {
      _id
      profilePictureUrl
      username
    }
    game {
      _id
      title
      pictureUrl
      averageRating
    }
  }
}
`;