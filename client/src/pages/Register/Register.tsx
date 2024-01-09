import { useContext, useState } from 'react';
import { IUser, RegistrationData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { ContextAll } from '../../context/context';
import styles from './Register.module.css';
import { jwtDecode } from 'jwt-decode';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

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
  const { setUser } = useContext(ContextAll);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const submitRegHandler = async (values: RegistrationData): Promise<void> => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('gender', values.gender);

    if (values.photo !== null) {
      const encodedName = encodeURI(values.photo.name);
      formData.append('photo', values.photo as Blob, encodedName);
    }

    try {
      const response = await axios.post('http://localhost:3002/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      const result = response.data;
      if (response.status === 200) {
        const { token } = result;
        const decodedToken: IUser = jwtDecode(token);
        localStorage.setItem('token', token);
        console.log('>>>>>>>>>', localStorage.setItem);

        setUser((prev) => ({
          ...prev,
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
          dateOfBirth: decodedToken.dateOfBirth,
          gender: decodedToken.gender,
          photo: decodedToken.photo,
          iat: decodedToken.iat,
          exp: decodedToken.exp,
        }));

        navigate('/account');
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Имя обязательно для заполнения'),
    email: Yup.string().email('Введите правильный email').required('Email обязателен для заполнения'),
    password: Yup.string().required('Пароль обязателен для заполнения'),
    dateOfBirth: Yup.date().required('Дата рождения обязательна для заполнения').max(new Date(), 'Дата рождения не может быть в будущем'),
    gender: Yup.string().required('Укажите пол'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      dateOfBirth: '',
      gender: '',
      photo: null
    },
    validationSchema: validationSchema,
    onSubmit: submitRegHandler,
  });

  return (
    <div className={styles.registrationForm}>
      <h2>Регистрация</h2>
      <div className={styles.RegDiv}>

        <Flex className={styles.regFlex} align="center" justify="center">
          <Box className={styles.regBox} p={6} rounded="md">
            <form className={styles.regForm} onSubmit={formik.handleSubmit}>
              <VStack p={4} spacing={4} align="flex-start">
                <FormControl
                  isInvalid={formik.errors.name !== '' && formik.errors.name !== undefined}
                >
                  <FormLabel htmlFor="name" >Имя</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Введите имя"
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.email !== '' && formik.errors.email !== undefined}
                >
                  <FormLabel htmlFor="email">Почта</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Введите почту"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.password !== '' && formik.errors.password !== undefined}
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
                <FormControl
                  isInvalid={formik.errors.dateOfBirth !== '' && formik.errors.dateOfBirth !== undefined}
                >
                  <FormLabel htmlFor="dateOfBirth">Дата рождения</FormLabel>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                    placeholder="Введите дату рождения"
                  />
                  <FormErrorMessage>{formik.errors.dateOfBirth}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.gender !== '' && formik.errors.gender !== undefined}
                >
                  <FormLabel htmlFor="gender">Пол</FormLabel>
                  <Input
                    id="gender"
                    name="gender"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    placeholder="Укажите пол"
                  />
                  <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.photo !== '' && formik.errors.photo !== undefined}
                >
                  <FormLabel htmlFor="photo">Фото профиля</FormLabel>
                  <Input
                    height="50px"
                    id="photo"
                    name="photo"
                    type="file"
                    variant="filled"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      formik.setFieldValue('photo', file);
                      formik.setFieldTouched('photo', true);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.photo}</FormErrorMessage>
                </FormControl>
                {errorMsg !== '' && (<div className={styles.errorMessage}>{errorMsg}</div>)}
                <Button type="submit" colorScheme="blue" width="full">
                  Отправить
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>

      </div>
    </div>
  );
}
