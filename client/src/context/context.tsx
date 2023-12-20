import React, { FC, createContext, useState } from 'react';
import { IContext, IInit, IProduct,  IUser } from '../types/types';



export const ContextAll: React.Context<IContext> = createContext(
  {} as IContext
);

const initState: IInit = {
  id: 0,
  title: "",
  text: "",
  check1: false,
};

type Props = {
  children: React.ReactNode;
};

export const MeContextProvider: FC<Props> = ({ children }) => {
  const [inputs, setInputs] = useState(initState);
  const [cards, setCards] = useState<IInit[]>([]);
  const [query, setQuery] = useState<string>("");

  const inputHeandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.target.name.includes("check")
      ? setInputs((pre) => ({ ...pre, [ev.target.name]: ev.target.checked }))
      : setInputs((pre) => ({ ...pre, [ev.target.name]: ev.target.value }));
  };

  const [user, setUser] = useState<IUser>({
    user: {},
    id: 0,
    userName: "",
    updatedAt: "",
    createdAt: "",
    phone: "",
    firstName: "",
    lastName: "",
    role: "",
    age: 0,
    userEmail: "",
    authUser: false,
  });

  const [products, setProducts] = useState<IProduct[]>([]);; 

  const updateUser = (userName) => {
    setUser((prevUser) => ({
      ...prevUser,
      userName: userName,
    }));
  };

  const contextValue: IContext = {
    query,
    setQuery,
    cards,
    inputs,
    inputHeandler,
    submitHeandler: (event: React.FormEvent<Element>) => {},
    deleteHeandler: (id: number) => {},
    user,
    setUser,
    setProducts,
    products, 
  };


  return (
    <ContextAll.Provider value={contextValue}>{children}</ContextAll.Provider>
  );
};
