import React, {useEffect, useState} from 'react';
import queries from 'api';
import {Spin, Button} from 'antd';

const User = ({name, onRepoSelect = () => {}}) => {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);
    useEffect(() => {
        const fetchUser = async() => {
            setFetching(true);
            const user = await queries.userWithName(name);
            setData(user);
            setFetching(false);
        }
        if (name && name.length) fetchUser();
    }, [name])

    if (fetching ) return <Spin className='spinner'/>
    if (!name) return <div>Type a Github user name</div>
    if (name && !data) return <div> {name} is not a valid user name </div>

    const {user} = data;
    const repos = user.repositories.edges.map(repo => repo.node).map(({name, id, owner}) => ({name, id, owner}));

    return <div className='user'>
    <div className='details'>
     <img src={user.avatarUrl} className='profile-pic'/>
         <div>
            <div><span>Login</span>: {user.login}</div>
            <div><span>Name</span>: {user.name || '--'}</div>
            <div><span>Location:</span> {user.location || '--'}</div>
        </div>
    </div>
      <div>Repositories:</div>
      <div className='repos-list'>
       {repos.map(repo => <RepoUrl repo={repo} onSelect={onRepoSelect} key={repo.id} />)}
      </div>
    </div>
}

const RepoUrl = ({repo, onSelect}) => {
    return <Button type='link' onClick={() => onSelect(repo.name, repo.owner.login)}>{repo.owner.login}/{repo.name}</Button>
}

export default User;