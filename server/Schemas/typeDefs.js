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
    relatedGamesByGenre(genres: [String!]!, limit: Int!): [Game]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addFriend(userId: ID!, myId: ID!): User
    removeFriend(id: ID!): User
    requestFriend(id: ID!): User
    rejectFriend(userId: ID!, myId: ID!): User
    addReview(gameId: ID!, reviewNum: Int!, reviewText: String!): Review
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
    changeProfilePic(url: String!): User
    saveAiPic(url: String!): User
  }`
;

module.exports = typeDefs;