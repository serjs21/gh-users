import React from 'react';
import { Input } from 'antd';

const Search = ({onSearch, placeholder, onChange}) => {
    return <Input.Search placeholder={placeholder}
                   onSearch={onSearch}
                   onChange={({target}) => onChange(target.value)}
               />
}

export default Search;