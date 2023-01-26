import React from 'react'
import styled from 'styled-components';

interface PillsWrapperProps {
    display? : string | number;
    alignItems? : string | number;
    justifyContent? : string | number;
    padding? : string | number;
    margin? : string | number;
    height? : string | number;
    width? : string | number;
}
interface PillsStyledProps {
    padding? : string | number;
    margin? : string | number;
    height? : string | number;
    width? : string | number;
    border? : string ;
    shadow? : string ;
    backGroundColor ? : string;

}
interface PillsProps {
    pills : any[];

}

const PillsWrapper = styled.div<PillsWrapperProps>`
display: ${props=>props.display ? props.display : 'flex'};
align-items: ${props=>props.alignItems ? props.alignItems : 'center'};
justify-content: ${props=>props.justifyContent ? props.justifyContent : 'flex-start'};
padding : ${props=>props.padding  ? props.padding  : "0"};
margin : ${props=>props.margin ? props.margin : "0"};
height:  ${props=>props.height ? props.height : "100%"};
width: ${props=>props.width ? props.width : "100%"};
`

const PillStyled = styled.div<PillsStyledProps>`
padding : ${props=>props.padding  ? props.padding  : "0"};
margin : ${props=>props.margin ? props.margin : "0"};
height:  ${props=>props.height ? props.height : "100%"};
width: ${props=>props.width ? props.width : "100%"};
border: ${props=>props.border ? props.border : "none"};
box-shadow: ${props=>props.shadow ? props.shadow : "none"};
background-color:${props=>props.backGroundColor ? props.backGroundColor : "transparent"};
`

const Pill = ({pill} : any)=>{
 

    return <PillStyled>
          {pill}
         </PillStyled>
}

const Pills = ({pills} : PillsProps) => {
  return (
    <PillsWrapper>
      {
        pills.map((pill,indx)=><Pill key={indx} pill={pill}/>)
      }
    </PillsWrapper>
  )
}

export default Pills