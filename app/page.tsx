import Image from "next/image";
import Login from './(pages)/(auth)/login/page'
import sidebook from '../public/assets/book.png'
export default function Home() {
  return (
    <div className="max-h-screen max-w-screen    items-center">
  
      <Login />
  </div>
  );
}
