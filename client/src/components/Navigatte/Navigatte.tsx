
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigatte.module.css";
import { ContextAll } from '../../context/context';

export default function Navigatte() {
    const { user, setUser } = useContext(ContextAll);


    const logoutHandler = async () => {

        try {
            const response = await fetch(`http://localhost:3002/user/logout`, {
                credentials: 'include',
            });
            if (response.ok) {
                await response.json();
                setUser({
                    ...user,
                    name: '',
                    email: '',

                });
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.NavFlag}>


            <div className={styles.NavBegin} >

                <div className={styles.links}>
                    {user.name ? (
                        <>
                            <div className={styles.Hello}>Привет!</div>
                            <div className={styles.Hello1}>{user.name}</div>



                            <Link className={styles.LinkAccount} to={'/account'} >
                                Личный кабинет
                            </Link>
                            <Link className={styles.LinkExit} to={'/'} onClick={logoutHandler}>
                                Выйти
                            </Link>

                        </>
                    ) : (
                        <>
                            <Link className={styles.LinkLogin} to="/login">
                                Войти
                            </Link>
                            <Link className={styles.LinkReg} to="/register">
                                Регистрация
                            </Link>
                        </>
                    )}
                    <Link className={styles.LinkHome} to={'/'}>
                        Главная
                    </Link>
                </div>
            </div>
        </div >
    );
}