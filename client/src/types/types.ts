
interface IInit {
  id: number;
  title: string;
  text: string;
  check1: boolean;
}


interface IPropsForm {
  inputs: IInit;
  inputHeandler: React.ChangeEventHandler; 
  submitHeandler: React.FormEventHandler;
}

interface IContext {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  inputs: IInit;
  inputHeandler: React.ChangeEventHandler;
  submitHeandler: React.FormEventHandler;
  deleteHeandler: (id: number) => void;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}





interface ILog {

  email: string;
  password: string;

}

interface IUser {
  user: object;
  userId: number;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  photo: File | null;
  updatedAt: string;
  createdAt: string;
  iat: number;
  exp: number;
}

interface LayoutProps {
  title?: string;
}
interface IRes {
  message: string;
  status: string;
}

interface IContext {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
}
interface Block {
  type: string;
  value: string | boolean | null;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  photo: File | null;
}



export type { IContext, IPropsForm, IRes, RegistrationData, IUser, ILog, Block, LayoutProps };
