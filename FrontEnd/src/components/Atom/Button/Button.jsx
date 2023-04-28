import styled, {css} from "styled-components";

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
  `
}

const Btn = styled.button`
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

const Button = ({type, onClick, btnInner, size, variant}) =>{
  const sizeStyle = SIZES[size]
  const variantStyle = VARIANTS[variant];

  return (
    <Btn type={type} onClick={onClick} sizeStyle={sizeStyle} variantStyle={variantStyle}>
      { btnInner }
    </Btn>
  )
};

Button.defaultProps = {
  type: 'button',
  btnInner: 'button',
  size: 'sm',
  variant: '',
  onClick : () => {}
}

export default Button


