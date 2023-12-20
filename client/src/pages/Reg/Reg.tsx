import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextAll } from '../../context/context';
import styles from '../Reg/Reg.module.css';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

export default function Register(): JSX.Element {
  interface RegistrationData {
    userName: string;
    userEmail: string;
    password: string;
  }

  const { user, setUser } = useContext(ContextAll);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const submitRegHandler = async (values: RegistrationData): Promise<void> => {
    console.log('values', values);
    try {
      const response = await fetch('http://localhost:3002/user/reg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          userName: result.userName,
          authUser: true,
          id: result.id, 
          
        }));
        navigate('/');
      } else {
        setErrorMsg(result.error);
        setTimeout(() => {
          setErrorMsg('');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      password: '',
    },
    onSubmit: submitRegHandler,
  });

  return (
    <div className={styles.RegFlag}>
      <div className={styles.RegDiv}>
        {!user.authUser && (
          <Flex className={styles.regFlex} align="center" justify="center">
            <Box className={styles.regBox} p={6} rounded="md">
              <form className={styles.RegForm} onSubmit={formik.handleSubmit}>
                <VStack p={4} spacing={8} align="flex-start">
                  <FormControl
                    isInvalid={formik.errors.userName !== null && formik.errors.userName !== undefined}
                  >
                    <FormLabel htmlFor="userName">Имя</FormLabel>
                    <Input
                      id="userName"
                      name="userName"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                      placeholder="Введите имя"
                      disabled={false}
                    />
                    <FormErrorMessage>{formik.errors.userName}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={formik.errors.userEmail !== null && formik.errors.userEmail !== undefined}
                  >
                    <FormLabel htmlFor="userEmail">Почта</FormLabel>
                    <Input
                      id="userEmail"
                      name="userEmail"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userEmail}
                      placeholder="Введите почту"
                    />
                    <FormErrorMessage>{formik.errors.userEmail}</FormErrorMessage>
                  </FormControl>
                  <FormControl style={{marginBottom: '20px'}}
                    isInvalid={formik.errors.password !== null && formik.errors.password !== undefined}
                  >
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder="Придумайте пароль"
                    />
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                  </FormControl>

                  {errorMsg !== '' && <div className={styles.errorMessage}>{errorMsg}</div>}

                  <Button type="submit" colorScheme="blue" width="full">
                    Отправить
                  </Button>
                </VStack>
              </form>
            </Box>
          </Flex>
        )}
      </div>
    </div>
  );
}
