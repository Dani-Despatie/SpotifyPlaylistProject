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
    position: sticky;
    margin: 8px 0px;
    width: 100%;

    text-align: center;
    border: 1px solid pink;
`;