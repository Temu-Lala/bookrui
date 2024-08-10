// app/books/products.ts
"use client"
// app/books/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: number;
  name: string;
  author: string;
  price: number;
  image: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  try {
    const products: Product[] = [
      {
        id: 1,
        name: 'Book 1',
        author: 'Author 1',
        price: 10,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Book 2',
        author: 'Author 2',
        price: 15,
        image: 'https://via.placeholder.com/150',
      },
      // Add more products as needed
    ];

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
