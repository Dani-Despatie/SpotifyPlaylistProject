import React from 'react';
import styled from 'styled-components';

const StandardButton = ({children, onClick}) => {
    return (
        <Button onClick={onClick}>{children}</Button>
    )
}

export default StandardButton;

const Button = styled.button`
    background-color: #103D63;
    color: white;
    font-size: 1em;
    width: fit-content;

    border: 1px solid black;
    border-radius: 5px;

    padding: 4px 32px;
    margin: 4px;

    box-shadow: 4px 4px var(--banner-background);

    &:hover {
        background-color: #204E74;
    }
    &:active {
        transform: translateY(2px);
    }
`;