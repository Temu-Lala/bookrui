// // booksapi.ts
// import axios from 'axios';

// export interface Book {
//   id: number;
//   title: string;
//   genre: string;
//   price: number;
//   imagePath: string;
//   author: string;
//   publicationdate?: string;
//   publisher: string;
//   description: string;
//   username: string;
//   email: string;
// }

// const API_URL = 'http://localhost:3001'; // Replace with your backend URL

// export const fetchBooksByUser = async (username: string, email: string) => {
//   try {
//     const response = await axios.get<Book[]>(`${API_URL}/books/user/`, {
//       params: { username, email },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     throw error;
//   }
// };
