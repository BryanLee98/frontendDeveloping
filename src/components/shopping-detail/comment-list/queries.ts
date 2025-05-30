import { gql } from "@apollo/client"

export const FETCH_COMMENTS = gql`
  query FetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`

export const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
  query FetchTravelProductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(page: $page, travelproductId: $travelproductId) {
      _id
      contents
      travelproduct {
        _id
        name
        remarks
        contents
        price
        tags
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
    fetchTravelproductQuestionsAnswers(page: $page, travelproductQuestionId: $travelproductQuestionId) {
      _id
      contents
      travelproductQuestion {
        _id
        contents
        user {
          _id
          email
          name
          picture
        }
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
