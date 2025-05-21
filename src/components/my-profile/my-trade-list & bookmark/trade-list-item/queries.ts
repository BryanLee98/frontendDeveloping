"use client"
import { gql } from "@apollo/client"

export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
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
          createdAt
          updatedAt
          deletedAt
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
          amount
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
export const FETCH_TRAVEL_PRODUCTS = gql`
  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
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
          createdAt
          updatedAt
          deletedAt
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
          amount
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
export const FETCH_TRAVEL_PRODUCTS_I_BOUGHT = gql`
  query fetchTravelproductsIBought($search: String, $page: Int) {
    fetchTravelproductsIBought(search: $search, page: $page) {
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
          createdAt
          updatedAt
          deletedAt
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
          amount
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
export const FETCH_TRAVEL_PRODUCTS_I_SOLD = gql`
  query fetchTravelproductsISold($search: String, $page: Int) {
    fetchTravelproductsISold(search: $search, page: $page) {
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
          createdAt
          updatedAt
          deletedAt
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
          amount
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
export const FETCH_TRAVEL_PRODUCTS_I_PICKED = gql`
  query fetchTravelproductsIPicked($search: String, $page: Int) {
    fetchTravelproductsIPicked(search: $search, page: $page) {
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
          createdAt
          updatedAt
          deletedAt
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
          amount
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
