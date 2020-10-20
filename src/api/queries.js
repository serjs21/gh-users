import { gql } from '@apollo/client';
import client from './api';
import { getReadme } from 'api/rest';

export const _userWithName = userName => gql`{
      user(login: "${userName}") {
       name
       login
       location
       avatarUrl(size: 90)
       repositories(first: 100, orderBy: {field: CREATED_AT, direction: ASC}) {
         edges {
           node {
             name
             id
             owner {
                 login
               }
             }
           }
         }
       }
     }
`

const execute = async (query) => {
    try {
        const result = await client.query({query});
        return result.data;
    } catch (e) {
        console.warn('request failed', e);
        return null;
    }
}

const queries = {
    userWithName: (name) => execute(_userWithName(name)),
    readme: (owner, repo) => getReadme(owner, repo),
}


export default queries;


