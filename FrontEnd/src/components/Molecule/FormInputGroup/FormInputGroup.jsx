
import Input from "@/components/Atom/Input/Input.jsx";
import Button from "@/components/Atom/Button/Button.jsx";
import styled from "styled-components";

const FormInputGroup = ({formStyle,btnInner,onSubmit,onChange,name, notBtn, ...props}) => {

  const inputStyle = {
    height: '20px',
    border: 'none',
    outline: 'none'
  }

  return (
    <Form onSubmit={onSubmit} style={formStyle}>
      <Input style={inputStyle} name={name} required={true} onChange={onChange} {...props}></Input>
      {!notBtn && <Button type={'submit'} btnInner={btnInner} {...props}></Button>}
    </Form>
  )
}

export default FormInputGroup

FormInputGroup.defaultProps ={
  notBtn: false
}

const Form = styled.form`
  ${(props) => props.style}
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
`
