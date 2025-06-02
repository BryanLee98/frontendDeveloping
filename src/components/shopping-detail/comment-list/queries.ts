import { gql } from "@apollo/client"

export const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
  query FetchTravelProductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(page: $page, travelproductId: $travelproductId) {
      _id
      contents
      travelproduct {
        _id
        name
        contents
      }
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`

export const FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWERS = gql`
  query FetchTravelProductQuestionsAnswers($page: Int, $travelproductQuestionId: ID!) {
    fetchTravelproductQuestionAnswers(page: $page, travelproductQuestionId: $travelproductQuestionId) {
      _id
      contents
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`
