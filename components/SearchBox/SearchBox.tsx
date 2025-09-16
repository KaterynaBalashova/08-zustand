import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
    text: string,
    onSearch: (searchQuery: string) => void,
}

export default function SearchBox({ text, onSearch }: SearchBoxProps) {
    
    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={text}
            onChange={handelChange}
        />

    );
}