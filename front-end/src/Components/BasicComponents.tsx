import styled from "styled-components";
import Theme from "./Theme";

export const Button = styled.button`
    background-color: ${Theme.colors.primary};
    border: 2px solid ${Theme.colors.primary};
    color: white;
    padding: 0.5rem;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 0.5rem;
    transition: all 0.4s ease-in-out;
    &:hover {
        background-color: ${Theme.colors.secondary};
        border: 2px solid ${Theme.colors.primary};
        color: ${Theme.colors.primary};

    }
`;

export const Input = styled.input`
    background-color: ${Theme.colors.primary};
    border: none;
    color: white;
    padding: 0.5rem;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 1rem;
`;

export const Container = styled.div`
    background-color: ${Theme.colors.primary};
    border: none;
    color: white;
    padding: 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 1rem;
`;

export const Separator = styled.div`
    background-color: none;
    border: none;
    color: white;
    padding: 0;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 1rem;
`;