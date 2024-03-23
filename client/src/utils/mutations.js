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

export const ADD_REVIEW = gql`
    mutation addReview($_id: String!, $reviewNum: Int!, $reviewText: String!) {
        addReview(_id: $_id, reviewNum: $reviewNum, reviewText: $reviewText) {
          id
          reviewNum
          reviewText
        }
    }
`;