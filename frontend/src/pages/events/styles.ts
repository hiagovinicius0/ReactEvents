import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.jpg'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: center;
    flex-direction: column;
    place-content: center;
    width: 100%;
    max-width: 700px;
    align-items: center;
    overflow-y: auto;
    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;
    }
    h1{
        margin-bottom: 24px;
    }
    a {
        color: #F4EDE8;
        display: block;
        margin-top: 24px;
        transition: color 0.2s;
        &:hover {
            color: ${shade(0.2, '#F4EDE8')}
        }
    }
    > a {
        color: #FF9000;
        display: block;
        margin-top: 24px;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        svg {
            margin-right: 16px;
        }
        &:hover {
            color: ${shade(0.2, '#FF9000')}
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: cover;
`;

export const Title = styled.h1 `
    font-size: 48px;
    color: orange;
    max-width: 400px;
    line-height: 56px;
    margin-top: 40px;
    text-align: center;
`;

export const FormCreate = styled.div `
    padding: 20px;
    margin: 30px;
    border: 1px solid white;
    border-radius: 5px;
    div {
        label {
            display: block;
            padding: 10px;
        }
        input {
            padding-right: 30px;
            width: 100%;
            border: 2px solid black;
            border-radius: 5px;
            height: 40px;
            background-color: black;
            color: lightgray;
        }
        input[type=file] {
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            padding: 6px 20px;
        }
    }
    button {
        align-items: center;
        background: #FF9000;
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        color: #312E38;
        width: 25%;
        font-weight: 500;
        margin-top: 16px;
        transition: background-color 0.2s;
        &:hover {
            background: ${shade(0.2, '#FF9000')}
        }
    }

`;

export const Events = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 80px;
    max-width: 700px;
    a{
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        align-items: center;
        color: #3A3A3A;
        & + a{
            margin-top: 16px;
        }
        h1{
            font-size: 24px;
            margin-bottom: 10px;
            text-decoration: none;
            font-weight: normal;
        }
        div{
            display: flex;
            div{
                display:block;
                flex: 1;
                padding: 0 20px 0 20px;
                &:nth-last-child(-n+3){
                    border-left: 1px solid #dadce0;
                }
                strong{
                    font-weight: normal;
                    font-size: 12px;
                    padding-bottom: 20px;
                }
                p{
                    font-weight: bold;
                    margin-top: 5px;
                    text-align: justify;
                }
            }
        }
        p{
            text-align: justify;
        }
        h3{
            font-weight: bold;
            padding: 10px 10px 10px 0;
        }
        svg{
            margin-left: auto;
            color: black;
            display: flex;
        }
    }
`;
