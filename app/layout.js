"use client";

import Header from "./components/Header";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NYGC</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Jockey+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik+80s+Fade&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="overflow-x-hidden">
        <ToastContainer />
        <Header />
        <div className="">{children}</div>
        <footer className="bg-black w-full text-white text-center p-5">
          <h1 className="uppercase font-extralight">Vist my <a href="http://chinmaysa-portfolio.vercel.app/" target={"_blank"} className="text-yellow-500 underline">portfolio</a></h1>
          <h1>All Rights Reserved By <a href="https://screentechnicals.com" target={"_blank"} className="text-orange-500 underline">Screen Technicals</a></h1>
        </footer>
      </body>
    </html>
  );
}
