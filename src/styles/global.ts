import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        background-color: #121214;
    }

    .custom-slidebar, .navbar-collapse.collapse {
        width: 100%;
        max-width: 100%;
        overflow: auto;
    }

    ::-webkit-scrollbar-track {
        border-radius: 100%;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 100%;
        background: aqua;
    }
`
