import styled, {css} from "styled-components";
import Icons from "@/components/Atom/Icons/Icons.jsx";

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
    --button-radius: 12px;
  `
}

const VARIANTS = {
  error: css`
    --button-color: #FFF;
    --button-bg-color: #dc3545;
    --button-hover-bg-color: #218838;
  `,
  active: css`
    --button-box-shadow : 0 10px 0 rgba(0,0,0,.25);
    --button-hover-box-shadow : 0 4px 0 #e87988;
    --transform-translateY : 6px;
  `
}

const Button = ({type, onClick, btnInner, size, variant}) =>{
  const sizeStyle = SIZES[size]
  const variantStyle = VARIANTS[variant];

  return (
    <Btn type={type} onClick={onClick} sizeStyle={sizeStyle} variantStyle={variantStyle}>
      {btnInner}
    </Btn>
  )
};

Button.defaultProps = {
  type: 'button',
  size: 'sm',
  variant: '',
  onClick : () => {}
}

export default Button


const Btn = styled.button`
  ${(props) => props.sizeStyle}
  ${(props) => props.variantStyle}

  box-shadow: var(--button-box-shadow, 0 qpx 2px rgba(0,0,0,.25));
  outline: none;
  border: 1px solid rgba(0,0,0,.25);
  cursor: pointer;
  background: var(--button-bg-color, #FFF);
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 10px 13px);
  border-radius: var(--button-radius, 8px);
  box-sizing: border-box;
  transition: .1s;
  
  &:hover{
    background: var(--button-hover-bg-color, #F9B3BB);
    color: var(--button-hover-color, #FFF);
    border: 1px solid transparent;
    box-shadow: var(--button-hover-box-shadow) ;
    transform: translateY(var(--transform-translateY));
  }
`
