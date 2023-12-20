interface IInit {
  id: number;
  title: string;
  text: string;
  check1: boolean;
}

interface IReg {
  userName: string;
  userEmail: string;
  password: string;
}
interface IPropsForm {
  inputs: IInit;
  inputHeandler: React.ChangeEventHandler; //типизация функции!
  submitHeandler: React.FormEventHandler;
}

interface IPropsList {
  cards: IInit[];
  // deleteHeandler?: (id: number) => void
}

interface Icard {
  card: IInit;
  // key?: number
  // deleteHeandler?: (id:number ) => void
}

interface IUser {
  name: any;
  user: object;
  id: number;
  userName: string;
  updatedAt: string;
  createdAt: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
  age: number;
  // Add userEmail property
  userEmail: string;
  authUser: boolean;
}

interface IContext {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  cards: IInit[];
  inputs: IInit;
  inputHeandler: React.ChangeEventHandler;
  submitHeandler: React.FormEventHandler;
  deleteHeandler: (id: number) => void;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

interface IRes {
  message: string;
  status: string;
}

interface IDog {
  dog: string;
  loading: boolean;
}

interface IProduct {
  id: number;
  image: string;
  name: string;
  article: string;
  rate: number;
  tags: string[];
  price: number;
  balance: number;
  isFavourite: boolean;
}

type SliceStateType = {
  products: IProduct[];
  loading: boolean;
  error: null | string;
};


 interface RootState {
  basket: BasketState; 
}

 interface BasketState {
  products: IProduct[]; 
  loading: boolean;
  error: string | null;
}

export type {
  IInit,
  IPropsForm,
  IPropsList,
  Icard,
  IContext,
  IRes,
  IDog,
  IReg,
  IUser,
  IProduct,
  SliceStateType,
  BasketState,
  RootState,
};
