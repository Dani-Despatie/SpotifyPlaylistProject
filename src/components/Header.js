import styled from "styled-components";

function Header() {
    return (
        <HeaderComponent>
            <h1>Spotify Playlist to CSV</h1>
        </HeaderComponent>
    )
}

export default Header;

const HeaderComponent = styled.div`
    position: relative;
    margin: 8px 0px;
    width: calc(100% - 24px);
    max-height: 360px;
    padding: 8px 20px;
    top: -8px;
    left: -8px;
    background-color: var(--banner-background);
    border-bottom: 1px solid black;
    
    text-align: center;
`;