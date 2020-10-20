import React, {useState, useEffect} from 'react';
import {Spin} from 'antd';
import queries from 'api';
import {markdown} from 'markdown';

const RepoPreview = ({name, owner}) => {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setFetching(true);
            const repo = await queries.readme(owner, name);
            setData(repo);
            setFetching(false);
        }
        if (name && owner) fetch()
    }, [name, owner])

    if (!data && name) return <div>No readme file found</div>
    if (!data) return <div>Select a repository</div>
    if (fetching) return <Spin className='spinner'/>

    return <div>
                <h1>{owner}/{name}</h1>
                <pre dangerouslySetInnerHTML={{__html: markdown.toHTML(window.atob(data.content))}} />
           </div>
}

export default RepoPreview;