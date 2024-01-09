import React, { FC, createContext, useState } from 'react';
import { IContext, IUser } from '../types/types';
import { jwtDecode } from 'jwt-decode';



export const ContextAll: React.Context<IContext> = createContext(
  {} as IContext
);



type Props = {
  children: React.ReactNode;
};

export const MeContextProvider: FC<Props> = ({ children }) => {
  

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: IUser = jwtDecode(token);

      return {
        userId: decodedToken.userId,
        name: decodedToken.name,
        email: decodedToken.email,
        dateOfBirth: decodedToken.dateOfBirth,
        gender: decodedToken.gender,
        photo: decodedToken.photo,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
    }

    return {
      userId: 0,
      name: "",
      email: "",
      dateOfBirth:"",
      gender: "",
      photo: null,
      iat: 0,
      exp: 0,
    };
  });
  
  const contextValue: IContext = {
    user,
    setUser,
  };

  
  return (
    <ContextAll.Provider value={contextValue}>{children}</ContextAll.Provider>
  );
};
