import { gql } from "@apollo/client"

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
        createdAt
        updatedAt
        deletedAt
      }
      buyer {
        _id
        email
        name
        picture
        userPoint {
          _id
          amount
          user {
            _id
            email
            name
            picture
          }
        }
        createdAt
        updatedAt
        deletedAt
      }
      seller {
        _id
        email
        name
        picture
        userPoint {
          _id
        }
        createdAt
        updatedAt
        deletedAt
      }
      soldAt
      createdAt
      updatedAt
      deletedAt
    }
  }
`

export const UPDATE_TRAVEL_PRODUCT = gql`
  mutation updateTravelproduct($updateTravelproductInput: UpdateTravelproductInput!, $travelproductId: ID!) {
    updateTravelproduct(updateTravelproductInput: $updateTravelproductInput, travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
        createdAt
        updatedAt
        deletedAt
      }
      buyer {
        _id
        email
        name
        picture
        userPoint {
          _id
          amount
          user {
            _id
            email
            name
            picture
          }
        }
        createdAt
        updatedAt
        deletedAt
      }
      seller {
        _id
        email
        name
        picture
        userPoint {
          _id
        }
        createdAt
        updatedAt
        deletedAt
      }
      soldAt
      createdAt
      updatedAt
      deletedAt
    }
  }
`

export const DELETE_TRAVEL_PRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`
