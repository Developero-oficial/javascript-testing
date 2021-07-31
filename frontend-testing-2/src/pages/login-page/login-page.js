import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import {Redirect} from 'react-router-dom'

import {loginService} from '../../services/auth-services'
import {AuthContext} from '../../contexts/auth-context'

const isEmailValid = email =>
  !/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email)

export const LoginPage = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [emailValidation, setEmailValidation] = React.useState('')
  const [passwordValidation, setPasswordValidation] = React.useState('')
  const {onLoginSuccess, isAuth} = React.useContext(AuthContext)

  const validateEmail = ({email}) => {
    if (!email) {
      setEmailValidation('The email is required')

      return false
    }

    if (isEmailValid(email)) {
      setEmailValidation(
        'The email is not valid. Use the format username@mail.com',
      )

      return false
    }

    setEmailValidation('')
    return true
  }

  const validatePassword = ({password}) => {
    if (!password) {
      setPasswordValidation('The password is required')

      return false
    }

    setPasswordValidation('')

    return true
  }

  const validateForm = handleSubmit => e => {
    e.preventDefault()
    const {
      email: {value: emailValue},
      password: {value: passwordValue},
    } = e.target.elements

    const isEmailValid = validateEmail({email: emailValue})
    const isPasswordValid = validatePassword({password: passwordValue})

    if (isEmailValid && isPasswordValid) {
      handleSubmit({email: emailValue, password: passwordValue})
    }
  }

  const handleSubmit = async ({email, password}) => {
    try {
      setIsFetching(true)

      const response = await loginService({
        email,
        password,
      })

      if (response.status === 200) {
        const {token} = response.data
        onLoginSuccess({token})
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        const {errorMessage} = error.response.data
        return setErrorMsg(errorMessage)
      }

      setErrorMsg('Unexpected error. Please refresh the browser and try again')
    } finally {
      setIsFetching(false)
    }
  }

  if (!isFetching && isAuth) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={6}>
        <Box mb={3}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
        </Box>

        {errorMsg && (
          <Box my={3}>
            <Typography align="center" color="error">
              {errorMsg}
            </Typography>
          </Box>
        )}

        <form onSubmit={validateForm(handleSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!emailValidation}
            helperText={emailValidation}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!passwordValidation}
            helperText={passwordValidation}
          />

          <Box my={3}>
            <Button
              disabled={isFetching}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}
