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

  type AiImageResponse {
  url: String
  error: String
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
    profileBackloggedCount: Int
    userVisitedBackloggedCount(id: ID!): Int
    userVisitedInfo(id: ID!): User
    getPopularGames: [PopularGame]
    getAiImage(prompt: String!): AiImageResponse
    relatedGamesByGenre(genres: [String!]!, limit: Int!): [Game]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addFriend(userId: ID!): User
    removeFriend(id: ID!): User
    requestFriend(id: ID!): User
    rejectFriend(userId: ID!): User
    addReview(gameId: ID!, rating: Int!, reviewText: String!): Review
    addToBacklog(gameId: ID!): User
    removeFromBacklog(gameId: ID!): User
    addToFavorites(gameId: ID!): User
    removeFromFavorites(gameId: ID!): User
    addToInProgress(gameId: ID!): User
    removeFromInProgress(gameId: ID!): User
    addToCompleted(gameId: ID!): User
    removeFromCompleted(gameId: ID!): User
    addTo100Completed(gameId: ID!): User
    removeFrom100Completed(gameId: ID!): User
    addLikeToReview(reviewId: ID!): Review!
    removeLikeFromReview(reviewId: ID!): Review!
    changeProfilePic(url: String!): User
    saveAiPic(url: String!): User
  }`
;

module.exports = typeDefs;