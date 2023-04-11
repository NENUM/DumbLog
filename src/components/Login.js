import React from 'react'
import { Box, Button, Card, CardContent, TextField, Typography} from '@mui/material'
import Center from './Center'
import useForm from '../hooks/useForm'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import useStateContext from '../hooks/useStateContext'
import {useNavigate} from 'react-router-dom'

const getFreshModel = () => ({
   password:'',
   email: ''
})

export default function Login() {

  const {context, setContext} = useStateContext();
  const navigate = useNavigate();

  const {
       values,
        setValues,
        errors,
        setErrors,
        handleInputChange
  } = useForm(getFreshModel);

  const login = e =>{
      e.preventDefault();
      if(validate()){
        createAPIEndpoint(ENDPOINTS.client)
          .post(values)
          .then(res => {
            setContext({email: res.data.email})
            navigate('/home')
          })
          .catch(err=>console.log(err))
      }
      
  }  

  const validate = () =>{
      let temp = {}
      temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Email is not valid"
      temp.password = values.password != ""?"":"The password is required"
      setErrors(temp)
      return Object.values(temp).every(x => x == "")
    }
    
    
  return (
    <Center>
      <Card sx={{width:400}}>
      <CardContent sx={{textAlign: 'center'}}>
        <Typography variant='h3' sx={{my:3}}>
          Test App
        </Typography>
          <Box sx={{
          '& .MuiTextField-root':{
            margin: 1,
            width: '90%'
          }
        }}>
          <form noValidate autoComplete='on' onSubmit={login}>
          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.email && {error: true, helperText: errors.email})}
          ></TextField>
          <TextField
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.password && {error: true, helperText: errors.password})}
          ></TextField>
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{width:'90%'}}>Login</Button>
        </form>
        </Box>
      </CardContent>
      </Card>
    </Center>
  )
}
