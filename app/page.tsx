import Image from "next/image";
import Login from './(pages)/(auth)/login/page'
import Books from './(pages)/books/page';
import sidebook from '../public/assets/book.png'
import Footer from "./components/footer";
export default function Home() {
  return (
    <div className="max-h-screen max-w-screen    items-center">
  
      <Books />
     
  </div>
  );
}
