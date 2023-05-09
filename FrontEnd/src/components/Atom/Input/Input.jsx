import styled from "styled-components";

const Input = ({ onChange,
                 type,
                 style,
                 required,
               name,...props}) =>{


  return (
    <InputComponent type={type} name={name} required={required} onChange={onChange} style={style} {...props}/>
  )
}

export default Input

const InputComponent = styled.input`
  ${(props) => props.style}
`
