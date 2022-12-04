import React from "react";
import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components';

const Spinner = styled.div`
    display: flex;
    justify-content: center;
`;

export function Loader (){
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