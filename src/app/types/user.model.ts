export interface IUser {
  id?: number;
  username: string;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  company: {
    name: string;
  };
  phone: string;
}
