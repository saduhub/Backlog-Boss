import {gql} from '@apollo/client';

export const ADD_REVIEW = gql`
    mutation addReview($_id: String!, $reviewNum: Int!, $reviewText: String!) {
        addReview(_id: $_id, reviewNum: $reviewNum, reviewText: $reviewText) {
          id
          reviewNum
          reviewText
        }
    }
`