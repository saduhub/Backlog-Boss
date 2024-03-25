const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
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
    _id: ID!
    user: User!
    game: Game!
    rating: Float!
    likes: Int
    dateOfReview: String
    reviewText: String
  }

  type Game {
    _id: ID!
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
    gameSuggestions: [Game]
    reviews: [Review]
    review(id: ID!): Review
    userReviews(id: ID!): [Review]
    me: User
    userVisitedInfo(id: ID!): User
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
    addReview(id: ID!, reviewNum: Int!, reviewText: String!): Game
    addToBacklog(gameId: ID!): User
    addToFavorites(gameId: ID!): User
    addToInProgress(gameId: ID!): User
    addToCompleted(gameId: ID!): User
  }`
;

module.exports = typeDefs;