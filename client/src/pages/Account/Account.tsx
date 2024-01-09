import React, { useContext, useState } from 'react';
import { ContextAll } from '../../context/context';
import styles from './Account.module.css';
import axios from 'axios';

const AccountPage = () => {
  const { user, setUser } = useContext(ContextAll);
  const [newName, setNewName] = useState(user.name);
  const [newPassword, setNewPassword] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const handleNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewPhoto(file);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (newName !== user.name) formData.append('name', newName);
      if (newPassword !== '') formData.append('password', newPassword);
      if (newPhoto !== null) formData.append('photo', newPhoto as Blob);

      console.log('user.userId:', user.userId);
      const response = await axios.put(`http://localhost:3002/user/${user.userId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };


  return (
    <div className={styles.accountFormFlag}>
    <div className={styles.accountForm}>
      <h2 className={styles.accountFormH2}>Редактирование профиля</h2>
      <div className={styles.accountDiv}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Имя</label>
            <input
              id="name"
              type="text"
              value={newName}
              onChange={handleNameChange}
              placeholder="Введите новое имя"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Новый пароль</label>
            <input
              id="password"
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Введите новый пароль"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="photo">Фото профиля</label>
            <input
              id="photo"
              type="file"
              onChange={handlePhotoChange}
            />
          </div>
            <div className={styles.submitButtonDiv}>
          <button type="submit" className={styles.submitButton}>
            <span>Сохранить</span>
          </button>

          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AccountPage;
