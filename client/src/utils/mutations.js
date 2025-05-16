import { gql } from '@apollo/client';

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!, $myId: ID!) {
    addFriend(userId: $userId, myId: $myId) {
      _id
      username
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(id: $friendId) {
      id
      username
      profilePictureUrl
      friends {
        id
        username
        profilePictureUrl
      }
    }
  }
`;

export const REQUEST_FRIEND = gql`
  mutation requestFriend($friendId: ID!) {
    requestFriend(id: $friendId) {
      id
      username
      profilePictureUrl
      friendRequests {
        id
        username
        profilePictureUrl
      }
    }
  }
`;

export const REJECT_FRIEND = gql`
  mutation rejectFriend($userId: ID!, $myId: ID!) {
    rejectFriend(userId: $userId, myId: $myId) {
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

export const ADD_REVIEW = gql`
    mutation addReview($id: ID!, $reviewNum: Int!, $reviewText: String!) {
        addReview(id: $id, reviewNum: $reviewNum, reviewText: $reviewText) {
          _id
          reviews{
              rating
          reviewText
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