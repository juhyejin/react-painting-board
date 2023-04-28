import styled from "styled-components";

const Input = (props) =>{
  const {placeholder, _onChange} = props;

  return (
    <InputComponent placeholder={placeholder} onChange={_onChange}/>
  )
}

export default Input

const InputComponent = styled.input`
  width: 100%;
  max-width: 200px;
  height: 30px;
  border: 0;
  outline: none;
`
