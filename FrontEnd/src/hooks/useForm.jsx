import {useState} from "react";

const useForm = ({initValues,onSubmit}) => {

  const [values, setValues] = useState(initValues);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
    console.log(values)
  }
  const handleSubmit = (event)=>{
    event.preventDefault();
    onSubmit()
  }
  return {
    values,
    handleChange,
    handleSubmit
  }
}

export default useForm
