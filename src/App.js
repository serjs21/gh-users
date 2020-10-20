import React, {useState} from 'react';
import './App.css';
import debounce from 'lodash/debounce';
import { Search, User, RepoPreview } from 'components';
import { Spin } from 'antd';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRepo, setSelectedRepo] = useState({});

    const _onSearch = (value) => {
        setSearchQuery(value);
        setSelectedRepo({}); // remove display on search
    }

    const onSearch = debounce(_onSearch, 300);
    const onRepoSelect = (name, owner) => setSelectedRepo({name, owner})

    return <div className='app'>
            <div className='search-bar'>
                <Search placeholder='Search...' onSearch={_onSearch} onChange={onSearch} />
                <User name={searchQuery} onRepoSelect={onRepoSelect} />
            </div>
            <div className='content'> <RepoPreview {...selectedRepo}/>
            </div>
    </div>
}

export default App;
