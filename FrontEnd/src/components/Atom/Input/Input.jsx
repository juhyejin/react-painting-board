import styled from "styled-components";

const Input = ({placeholder,
                 onChange,
                 type,
                 style,
                 required,
               name}) =>{


  return (
    <InputComponent type={type} name={name} required={required} placeholder={placeholder} onChange={onChange} style={style} />
  )
}

export default Input

const InputComponent = styled.input`
  ${(props) => props.style}
`
