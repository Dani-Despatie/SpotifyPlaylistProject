import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #26252E;
    }

    body {
        background-color: var(--background);
        color: white;
        font-size: 1.4em;
    }

    

    .container {
        margin: 20px 120px;
    }

    .playlist-form {
        display: flex;
        flex-direction: column;
    }

    .url-input {
        width: 50%;
        font-size: 0.7em;
        padding: 6px 12px;
        margin: 12px 0px;

        border-radius: 4px;
        border: none;
    }

    .download a {
        margin: 8px 0px;
        color: cornflowerblue;
    }

    .errorMessage {
        color: lightcoral;
    }

    @media only screen and (max-width: 500px) {
        .container {
            margin: 10px 10px;
            text-align: center;
        }
        .url-input {
            width: 90%;
        }
        button {
            align-self: center;
        }
    }
`;

export default GlobalStyles;