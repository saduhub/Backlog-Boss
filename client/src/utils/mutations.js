import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                username
                profilePictureUrl
                hoursPlayed
                friends {
                    id
                }
                games100Completed {
                    id
                }
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
                likedReviews {
                    id
                }
                reviews {
                    id
                    likes
                }
            }
        }
    }
`;