import React from 'react';
import styled, {css} from "styled-components";
import Icons from "../icons/Icons.jsx";
import {Button} from "../../stories/Button.jsx";
import PropTypes from "prop-types";

const SIZES = {
  icon: css`
    --button-font-size: 16px;
    --button-padding: 5px 7px;
    --button-radius: 4px;
  `,
  sm: css`
    --button-font-size: 12px;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-font-size: 16px;
    --button-padding: 12px 16px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-font-size: 20px;
    --button-padding: 16px 20px;
    --button-radius: 12pxpx;
  `
}

const VARIANTS = {
  error: css`
    --button-color: #FFF;
    --button-bg-color: #dc3545;
    --button-hover-bg-color: #218838;
  `
}

const StyleBtn = styled.button`
  ${(props) => props.sizeStyle}
  ${(props) => props.variantStyle}
  
  box-shadow: 0 1px 2px rgba(0,0,0,.25) ;
  outline: none;
  border: 0;
  cursor: pointer;
  background: var(--button-bg-color, #FFF);
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 10px 13px);
  border-radius: var(--button-radius, 8px);
  
  &:active,
  &:hover,
  &:focus{
    background: var(--button-hover-bg-color, #F9B3BB);
    color: var(--button-hover-color, #FFF); 
  }
`

const Btn = ({btnType,IconName, BtnName, clickEvent, size, variant, ...props}) => {
  IconName ? size = 'icon' : ''
  const sizeStyle = SIZES[size]
  const variantStyle = VARIANTS[variant];

  return (
    <StyleBtn type={btnType} onClick={clickEvent} sizeStyle={sizeStyle}  {...props}>
      {IconName && <Icons name={IconName}/>}
      {BtnName}
    </StyleBtn>
  );
};

Btn.defaultProps = {
  btnType: 'button',
  btnName: 'Button'
}


export default Btn;
