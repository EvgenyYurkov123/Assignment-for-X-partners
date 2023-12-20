  import React, { useContext, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { ContextAll } from '../../context/context'
  import styles from './Login.module.css'
  import { useFormik } from 'formik'
  import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack
  } from '@chakra-ui/react'

  export default function Login(): JSX.Element {
    const { user, setUser } = useContext(ContextAll)
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate()

    interface LoginFormValues {
      
        userName: string;
        userEmail: string;
        password: string;
    
    }

    const submitLoginHandler = async (values: LoginFormValues): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3002/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(values)
        })

        const result = await response.json()
        console.log('user', result)

        if (response.ok) {
          setUser((prevUser) => ({
            ...prevUser,
            user: result.userName,
            authUser: true
          }))
          localStorage.setItem('user', JSON.stringify({ user: result.userName, authUser: true }))
          navigate('/')
        } else {
          setErrorMsg(result.error)
          setTimeout(() => {
            setErrorMsg('')
          }, 2000)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    const formik = useFormik({
      initialValues: {
        
        userName: '',
        userEmail: '',
        password: ''
        
      },
      onSubmit: submitLoginHandler
    })

    return (
      <div className={styles.LoginFlag}>
        <div className={styles.LoginDiv}>
          {!user.authUser && (
            <Flex className={styles.loginFlex} align="center" justify="center">
              <Box className={styles.loginBox} p={6} rounded="md">
                <form className={styles.LoginForm} onSubmit={formik.handleSubmit}>
                  <VStack p={4} spacing={8} align="flex-start">
                    <FormControl isInvalid={!!(formik.touched.userEmail && formik.errors.userEmail)}>
                      <FormLabel htmlFor="userEmail">Почта</FormLabel>
                      <Input
                        id="userEmail"
                        name="userEmail"
                        type="email"
                        variant="filled"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userEmail}
                        placeholder="Введите почту"
                      />
                      <FormErrorMessage>{formik.errors.userEmail}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!formik.errors.password} style={{marginBottom: '30px'}}>
                      <FormLabel  htmlFor="password">Пароль</FormLabel>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Введите пароль"
                      />
                      {formik.errors.password !== null && formik.errors.password !== undefined && (
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                      )}
                    </FormControl>

                    {errorMsg !== null && errorMsg !== undefined && errorMsg !== '' && (
                      <div className={styles.errorMessage}>{errorMsg}</div>
                    )}

                    <Button type="submit" colorScheme="blue" width="full">
                      Войти
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Flex>
          )}
        </div>
      </div>
    )
  }
