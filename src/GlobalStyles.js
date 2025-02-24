import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #26252E;
        --banner-background: #16161B;
        --faded-text: grey;
    }

    html {
        font-size: 1.4rem;
    }

    body {
        position: relative;
        background-color: var(--background);
        color: white;
        line-height: 1.4;
    }

    .root {
        min-height: calc(100vh - 15px);
        width: 100%;
    }

    .container {
        margin: 10px 120px;
        margin-bottom: 5rem;
        display: flex;
        flex-direction: column;
        width: calc(100% - 240px);
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .url-input {
        width: 50%;
        min-width: 460px;
        font-size: 0.8em;
        padding: 6px 12px;
        margin: 12px 0px;

        border-radius: 4px;
        border: none;
    }

    .input {
        display: flex;
        align-items: center;
    }

    .instr-button {
        background-color: white;
        font-size: 1.2rem;
        margin: 0px 10px;
        border-radius: 4px;
        border: 2px solid dimgray;
        box-shadow: 4px 4px var(--banner-background);
    }
    .instr-button:active {
        transform: translateY(2px);
    }
    .instr-button:hover {
        background-color: #BFD1DB;
    }

    .download {
        margin: 8px 0px;
    }
    .download a {
        color: #6BADE2;
    }

    .errorMessage {
        color: lightcoral;
    }

    .instructions {
        max-width: 900px;
        color: rgb(201 207 211);
        border: 1px solid #2D475C;
        border-radius: 8px;
        padding: 16px;
        margin-top: 16px;
        text-align: left;
        box-shadow: 4px 4px #1E34466B;
    }

    .instructions h3 {
        text-decoration: underline;
    }

    @media only screen and (max-width: 630px) {
        html {
            font-size: 1.2rem;
        }
        .container {
            margin: 10px 0px;
            margin-bottom: 5rem;
            text-align: center;
            width: calc(100vw - 20px);
        }
        .url-input {
            width: 90%;
            min-width: 20px;
        }
        button {
            align-self: center;
        }
    }
`;

export default GlobalStyles;