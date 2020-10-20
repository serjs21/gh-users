import axios from 'axios';
import {token} from './api';

const baseURL = 'https://api.github.com/repos/'

const headers = {
    accept: 'application/vnd.github.v3+json',
    Authorization: `bearer ${token}`,
};

export const getReadme = async (owner, repo) => {
    try {
        const result = await axios.get(baseURL + `${owner}/${repo}/readme`,{headers});
        return result.data;
    } catch (e){
        console.warn('failed to get readme file', e)
    }
}

window.gr = getReadme;