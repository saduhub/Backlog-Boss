const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    profilePictureUrl: String
    gamesInFavorites: [Game]
    gamesInBacklog: [Game]
    gamesCompleted: [Game]
    gamesInProgress: [Game]
    friends: [User]
    friendRequests: [User]
    likedReviews: [Review]
    reviews: [Review]
    hoursPlayed: Int
    games100Completed: [Game]
    aiImages: [String]
  }

  type Review {
    id: ID!
    user: User!
    game: Game!
    rating: Float!
    likes: Int
    dateOfReview: String
    reviewText: String
  }

  type Game {
    id: ID!
    title: String!
    averageRating: Float
    releaseDate: String
    genre: [String]
    platforms: [String]
    pictureUrl: String
    reviews: [Review]
  }

  type PopularGame {
    id: ID!
    name: String!
    background_image: String!
    rating: Float!
    ratings_count: Int!
    metacritic: Int
  }

  type imageURL {
    url: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    userReviews(id: ID!): [Review]
    me: User
    getPopularGames: [PopularGame]
    getAiImage(prompt: String!): imageURL
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addFriend(id: ID!): User
    removeFriend(id: ID!): User
    requestFriend(id: ID!): User
    rejectFriend(id: ID!): User
    addReview(id: String!, reviewNum: Int!, reviewText: String!): Game
  }`
;

module.exports = typeDefs;