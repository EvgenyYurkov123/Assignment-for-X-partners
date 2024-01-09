


interface IUser {
  user: object;
  userId: number;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  photo: File | null;
  id: number;
  age: number;
  updatedAt: string;
  createdAt: string;
  iat: number;
  exp: number;
}



interface IContext {
  userId: IUser;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  password: string;
  updatedAt: string;
  createdAt: string;
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



export type { IContext,  RegistrationData, IUser, Block };
