import gql from 'graphql-tag';

export const USER_LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
        }
    }
`;