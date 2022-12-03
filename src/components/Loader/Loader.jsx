import { Component } from "react";
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner'

const Spinner = styled.div`
    display: flex;
    justify-content: center;
`;

export class Loader extends Component{

    render() {
        return (
        <Spinner>
         <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#3f51b5" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
             wrapperClassName=""
            visible={true}
                />
        </Spinner>
        );
    }
}