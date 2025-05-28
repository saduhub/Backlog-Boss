import { gql } from '@apollo/client';

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!) {
    addFriend(userId: $userId) {
      _id
      username
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(id: $friendId) {
      _id
      username
      profilePictureUrl
      friends {
        _id
        username
        profilePictureUrl
      }
    }
  }
`;

export const REQUEST_FRIEND = gql`
  mutation requestFriend($friendId: ID!) {
    requestFriend(id: $friendId) {
      _id
      username
      profilePictureUrl
      friendRequests {
        _id
        username
        profilePictureUrl
      }
    }
  }
`;

export const REJECT_FRIEND = gql`
  mutation rejectFriend($userId: ID!) {
    rejectFriend(userId: $userId) {
      _id
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_TO_BACKLOG = gql`
  mutation addToBacklog($gameId: ID!) {
    addToBacklog(gameId: $gameId) {
      gamesInBacklog {
        _id
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation addToFavorites($gameId: ID!) {
    addToFavorites(gameId: $gameId) {
      gamesInFavorites {
        _id
      }
    }
  }
`
export const ADD_TO_IN_PROGRESS = gql`
  mutation addToInProgress($gameId: ID!) {
    addToInProgress(gameId: $gameId) {
      gamesInProgress {
        _id
      }
    }
  }
`

export const ADD_TO_COMPLETED = gql`
  mutation addToCompleted($gameId: ID!) {
    addToCompleted(gameId: $gameId) {
      gamesCompleted {
        _id
      }
    }
  }
`

export const ADD_TO_100COMPLETED = gql`
  mutation addTo100Completed($gameId: ID!) {
    addTo100Completed(gameId: $gameId) {
      games100Completed {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_BACKLOG = gql`
  mutation removeFromBacklog($gameId: ID!) {
    removeFromBacklog(gameId: $gameId) {
      gamesInBacklog {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation removeFromFavorites($gameId: ID!) {
    removeFromFavorites(gameId: $gameId) {
      gamesInFavorites {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_IN_PROGRESS = gql`
  mutation removeFromInProgress($gameId: ID!) {
    removeFromInProgress(gameId: $gameId) {
      gamesInProgress {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_COMPLETED = gql`
  mutation removeFromCompleted($gameId: ID!) {
    removeFromCompleted(gameId: $gameId) {
      gamesCompleted {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_100COMPLETED = gql`
  mutation removeFrom100Completed($gameId: ID!) {
    removeFrom100Completed(gameId: $gameId) {
      games100Completed {
        _id
      }
    }
  }
`;

export const ADD_LIKE_TO_REVIEW = gql`
  mutation addLikeToReview($reviewId: ID!) {
    addLikeToReview(reviewId: $reviewId) {
      _id
      likes
    }
  }
`;

export const REMOVE_LIKE_FROM_REVIEW = gql`
  mutation removeLikeFromReview($reviewId: ID!) {
    removeLikeFromReview(reviewId: $reviewId) {
      _id
      likes
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($gameId: ID!, $rating: Int!, $reviewText: String!) {
    addReview(gameId: $gameId, rating: $rating, reviewText: $reviewText) {
      _id
      rating
      reviewText
      likes
      dateOfReview
      user {
        _id
        username
        profilePictureUrl
      }
      game {
        _id
        title
      }
    }
  }
`;


export const CHANGE_PROFILE_PIC = gql`
  mutation changeProfilePic($url: String!) {
    changeProfilePic(url: $url) {
      username
      _id
      profilePictureUrl
    }
  }
`;

export const SAVE_AI_PIC = gql`
  mutation saveAiPic($url: String!) {
    saveAiPic(url: $url) {
      username
      _id
      aiImages
    }
  }
`;