import styled from "styled-components";

const Input = ({placeholder}) =>{
  return (
    <InputComponent placeholder={placeholder}/>
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
