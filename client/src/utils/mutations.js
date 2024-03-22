import { gql } from '@apollo/client';

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(id: $friendId) {
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
  mutation rejectFriend($friendId: ID!) {
    rejectFriend(id: $friendId) {
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