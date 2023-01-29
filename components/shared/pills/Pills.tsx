import React, { cloneElement, isValidElement } from "react";
import styled from "styled-components";

interface PillsWrapperProps {
  display?: string | number;
  alignItems?: string | number;
  justifyContent?: string | number;
  padding?: string | number;
  margin?: string | number;
  height?: string | number;
  width?: string | number;
}
interface PillStyledProps {
  pillpadding?: string | number;
  pillmargin?: string | number;
  pillheight: string | number;
  pillwidth: string | number;
  border?: string;
  shadow?: string;
  backGroundColor?: string;
  rounded?: string | number;
}
interface PillProps extends PillStyledProps {
  children: any;
}
interface PillsProps {
  children: any;
  pills?: any[];
  display?: string | number;
  alignItems?: string | number;
  justifyContent?: string | number;
  padding?: string | number;
  margin?: string | number;
  height?: string | number;
  width?: string | number;
  rounded?: string | number;
}

const PillsWrapper = styled.div<PillsWrapperProps>`
  display: ${(props) => (props.display ? props.display : "flex")};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  height: ${(props) => (props.height ? props.height : "100%")};
  width: ${(props) => (props.width ? props.width : "100%")};
  flex-wrap: wrap;
  gap: 10px;
`;

const PillStyled = styled.div<PillStyledProps>`
  display: flex;
  padding: ${(props) => (props.pillpadding ? props.pillpadding : "0")};
  margin: ${(props) => (props.pillmargin ? props.pillmargin : "0")};
  height: ${(props) => (props.pillheight ? props.pillheight : "100%")};
  width: ${(props) => (props.pillwidth ? props.pillwidth : "100%")};
  border: ${(props) => (props.border ? props.border : "none")};
  box-shadow: ${(props) => (props.shadow ? props.shadow : "none")};
  border-radius: ${(props) => (props.rounded ? props.rounded : "0")};
  background-color: ${(props) =>
    props.backGroundColor ? props.backGroundColor : "transparent"};
`;

export const Pill = ({
  children,
  pillheight,
  pillwidth,
  pillpadding,
  pillmargin,
  shadow,
  border,
  backGroundColor,
  rounded,
}: PillProps) => {
  const pillProps = {
    pillheight,
    pillwidth,
    pillpadding,
    pillmargin,
    shadow,
    border,
    backGroundColor,
    rounded,
  };
  if (!isValidElement(children)) {
    return (
      <PillStyled {...pillProps}>
        <span>{children}</span>
      </PillStyled>
    );
  }
  return <PillStyled {...pillProps}>{children}</PillStyled>;
};

const Pills = ({
  children,
  height,
  width,
  padding,
  display,
  alignItems,
  justifyContent,
}: PillsProps) => {
  const wrapperProps = {
    height,
    width,
    padding,
    display,
    alignItems,
    justifyContent,
  };

  return (
    <PillsWrapper {...wrapperProps}>
      {isValidElement(children)
        ? cloneElement(children)
        : Array.isArray(children)
        ? children.map((child) => cloneElement(child))
        : null}
    </PillsWrapper>
  );
};

export default Pills;
