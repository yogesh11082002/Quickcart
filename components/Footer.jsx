import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            QuickCart is a modern E-Commerce website designed for a seamless shopping experience. It offers a wide range of products with fast checkout, secure payments, and user-friendly navigation. With responsive design and personalized recommendations, QuickCart makes online shopping quick, convenient, and enjoyable for customers anytime, anywhere.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-234-567-890</p>
              <p>contact@yogeshthakur9536@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container px-4 2xl:px-20 bg-gray-200 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
       <Image width={160} src={assets.logo} alt="" />
      <p className='flex-1 border-1 flex justify-center items-center border-gray-400 pl-4 text-sm  text-gray-900  max-sm:hidden'>Copyright @YogeshThakur | All Rights Reserved </p>
      <div className='flex items-center gap-2.5'>
        <a href="https://www.facebook.com/yogesh.sengar.589">
          <Image width={38} src={assets.facebook_icon} alt="" />
          </a>
        <a href="https://twitter.com/YogeshT12554000">
          <Image width={38} src={assets.twitter_icon} alt="" />
          </a>
          <a href="https://www.instagram.com/yogesh_thakur_1108">
          <Image width={38} src={assets.instagram_icon} alt="" />
          </a>
      </div>
    </div>
    </footer>
  );
};

export default Footer;