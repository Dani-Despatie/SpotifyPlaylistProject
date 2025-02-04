import React from 'react';
import styled from 'styled-components';


function ConsoleLogView() {
    const logs = localStorage.getItem('logs');
    const logArray = logs.split("\n");

    return (
        <Container>
            <p className='title'> <u>Console Logs: </u></p>

            {logs && logArray.map((log, index) => {
                return (
                    <p className="log" key={index}>{log}</p>
                )
            })}
        </Container>
    )
}

export default ConsoleLogView;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.9em;
    
    border: 2px solid black;
    border-radius: 5px;
    background-color: #121216;

    padding: 20px;
    margin: 20px;
    margin-top: 100px;

    .title {
        text-align: center;
        font-size: 1.1em;
        margin-bottom: 20px;
    }
    .log {
        margin: 10px;
        max-width: 100%;
        word-wrap: break-word;
    }
`