import styled from "styled-components";
import linkedin from '../assets/linkedin.png';

function Footer() {
    return (
        <FooterComponent className = 'footer'>
            <p>Website by Danielle Despatie</p>
            
            <div className = 'icons'>
                <a href = 'https://www.linkedin.com/in/danielledespatie/'>
                    <img src = {linkedin} alt = 'LinkedIn Logo' /> 
                </a>
            </div>
        </FooterComponent>
    )
}

export default Footer;

const FooterComponent = styled.div`
    width: 100vw;
    height: 3rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: var(--banner-background);

    color: var(--faded-text);

    display: flex;
    align-items: center;
    justify-content: center;

    .icons {
        display: flex;
        flex-direction: row;
    }

    img {
        width: 35px;
        margin: 0px 8px;
    }

    @media only screen and (max-width: 630px) {
        flex-direction: column;
        font-size: 0.85rem;
        width: calc(100vw + 16px);
        height: 4.5rem;
        line-height: 0.5;
        border-top: 1px solid black;

        img {
            width: 30px;
            margin: 0px 0px;
        }
    }
`;