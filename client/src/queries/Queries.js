import gql from 'graphql-tag';

export const USER_LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            role{
                role
            }
        }
    }
`;

export const CATEGORIES_QUERY = gql`
    query{
        categories{
            id
            name
        }
    }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = gql`
    query($categoryId: ID!){
        productsByCategory(categoryId: $categoryId){
            id
            name
            price
            category{
                id
                name
            }
        }
    }
`;

export const PRODUCTS_QUERY = gql`
    query{
        products{
            id
            name
            price
            category{
                id
                name
            }
        }
    }
`;