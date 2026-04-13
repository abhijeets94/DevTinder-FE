export const BASE_URL = location.hostname === "localhost" ?  "http://localhost:7777" : "/api";

export interface User 
  {
    message: string,
    data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        about: string,
        skills: Array<string>,
        createdAt: Date,
        updatedAt: Date,
        __v: number,
        photoUrl: string
    }
}

export interface FeedUsers {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  about: string;
  age: string;
  gender: string;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  photoUrl: string;
  fromUserId?: FeedUsers;
}