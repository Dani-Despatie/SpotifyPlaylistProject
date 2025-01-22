import React from 'react';
import styled from 'styled-components';

const StandardButton = ({children, onClick}) => {
    return (
        <Button onClick={onClick}>{children}</Button>
    )
}

export default StandardButton;

const Button = styled.button`
    background-color: var(--button);
    color: white;
    font-size: 1em;

    border: 1px solid black;
    border-radius: 5px;

    padding: 4px 16px
`;