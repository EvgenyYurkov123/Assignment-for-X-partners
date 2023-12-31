import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextAll } from '../../context/context';
import { IUser, ILog } from '../../types/types';
import styles from '../Login/Login.module.css';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
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
import axios from 'axios';

export default function Login() {
    const { setUser } = useContext(ContextAll);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const submitLoginHandler = async (values: ILog) => {
        try {
            const response = await axios.post('http://localhost:3002/user/login', values, {
                withCredentials: true,
            });

            const result = response.data;

            if (response.status === 200) {
                const { token } = result;
                const decodedToken: IUser = jwtDecode(token);

                localStorage.setItem('token', token);

                setUser((prev) => ({
                    ...prev,
                    userId: decodedToken.userId,
                    name: decodedToken.name,
                    email: decodedToken.email,
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: submitLoginHandler,
    });

    return (
        <div className={styles.LoginFlag}>
            <h2 className={styles.LoginH2}>Авторизация</h2>
            <div className={styles.LoginDiv}>
                <Flex className={styles.loginFlex} align="center" justify="center">
                    <Box className={styles.loginBox} p={6} rounded="md">
                        <form className={styles.LoginForm} onSubmit={formik.handleSubmit}>
                            <VStack p={4} spacing={4} align="flex-start">
                                <FormControl isInvalid={Boolean(formik.touched.email && formik.errors.email)}>
                                    <FormLabel htmlFor="email">Почта</FormLabel>
                                    <Input
                                        {...formik.getFieldProps('email')}
                                        placeholder="Введите почту"
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={Boolean(formik.touched.password && formik.errors.password)}>
                                    <FormLabel htmlFor="password">Пароль</FormLabel>
                                    <Input
                                        {...formik.getFieldProps('password')}
                                        placeholder="Введите пароль"
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                    />
                                    {formik.errors.password && (
                                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                                    )}
                                </FormControl>

                                {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

                                <Button type="submit" colorScheme="blue" width="full" style={{ marginTop: '20px' }}>
                                    Войти
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </Flex>
            </div>
        </div>
    );
}
