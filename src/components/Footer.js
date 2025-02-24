import styled from "styled-components";
import linkedin from '../assets/linkedin.png';

function Footer() {
    return (
        <FooterComponent className = 'footer'>
            <p>Website by Danielle Despatie</p>
            
            <div className = 'icons'>
                <a>
                    <img src = {linkedin} alt = 'LinkedIn Logo' /> 
                </a>
            </div>
        </FooterComponent>
    )
}

export default Footer;

const FooterComponent = styled.div`
    width: calc(100vw - 2px);
    position: fixed;
    bottom: 0px;
    left: 0px;

    color: gray;

    display: flex;
    align-items: center;
    justify-content: center;

    .icons {
        display: flex;
        flex-direction: row;
    }

    img {
        width: 40px;
        margin: 0px 8px;
    }

    @media only screen and (max-width: 500px) {
        flex-direction: column;
        font-size: 0.9em;

        img {
            width: 35px;
        }
    }
`;