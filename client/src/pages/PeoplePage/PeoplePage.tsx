import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from '../../types/types';

function PeoplePage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImageUrl(url);
    }
  };

  useEffect(() => {
    axios.get('/user/people') 
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении пользователей:', error);
      });
  }, []);

  return (
    <div>
      <h2>Список пользователей</h2>
      <div className="user-cards">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.photo} alt={user.name} />
            <h3>{user.name}</h3>
            <p>Возраст: {user.age}</p>
            {previewImageUrl && <img src={previewImageUrl} alt="Preview" />}
            <input type="file" onChange={handleFileChange} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeoplePage;
