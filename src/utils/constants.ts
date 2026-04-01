export const BASE_URL = "http://localhost:7777";

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