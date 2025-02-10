import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #26252E;
        --button: #023A35;
    }

    body {
        background-color: var(--background);
        color: white;
        font-size: 1.4em;
    }

    .errorMessage {
        color: lightcoral;
    }
`;

export default GlobalStyles;