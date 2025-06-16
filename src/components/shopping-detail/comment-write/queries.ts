import { gql } from "@apollo/client"

export const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
      travelproductId: $travelproductId
    ) {
      _id
      contents
      travelproduct {
        _id
        name
        remarks
        contents
        price
        tags
        images
      }
      user {
        _id
        email
        name
        picture
        userPoint {
          _id
          amount
        }
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`

export const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation updateTravelproductQuestion(
    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
    $travelproductQuestionId: ID!
  ) {
    updateTravelproductQuestion(
      updateTravelproductQuestionInput: $updateTravelproductQuestionInput
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      travelproduct {
        _id
        name
        remarks
        contents
        price
        tags
        images
      }
      user {
        _id
        email
        name
        picture
        userPoint {
          _id
          amount
        }
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`

export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(travelproductQuestionId: $travelproductQuestionId)
  }
`
