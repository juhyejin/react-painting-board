
import Input from "@/components/Atom/Input/Input.jsx";
import Button from "@/components/Atom/Button/Button.jsx";
import styled from "styled-components";

const FormInputGroup = ({btnInner,onSubmit,onChange,name}) => {

  const inputStyle = {
    margin: '10px',
    height: '20px',
    border: 'none',
    outline: 'none'
  }


  return (
    <Form onSubmit={onSubmit}>
      <Input style={inputStyle} name={name} required={true} placeholder='방 이름을 적어주세요.' onChange={onChange}></Input>
      <Button type={'submit'} btnInner={btnInner}></Button>
    </Form>
  )
}

export default FormInputGroup

const Form = styled.form`
  
`
