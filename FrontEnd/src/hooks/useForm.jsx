import {useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebounce.jsx";

const useForm = ({initValues,onSubmit,onChange}) => {
  const [values, setValues] = useState(initValues);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
    {onChange && onChange()}
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
