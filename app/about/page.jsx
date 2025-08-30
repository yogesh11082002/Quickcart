"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "@/public/about.png"; // Replace with your image
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";


gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const textRef = useRef([]);
  const featureRef = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      ".about-header",
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Paragraphs stagger
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
      }
    );

    // Feature cards
    gsap.fromTo(
      featureRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-features",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
      <>
       {/* ✅ Navbar at top */}
      <Navbar /> 
      
    <section className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* Hero Section */}
      <div className="px-6 md:px-16 lg:px-32 pt-16 text-center">
        <h1 className="about-header text-5xl md:text-6xl font-extrabold">
          About <span className="text-indigo-600">QuickCart</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center px-6 md:px-16 lg:px-32 py-16">
        {/* Left Image */}
        <div>
          <Image
            src={aboutImg}
            alt="About QuickCart"
            className="rounded-3xl shadow-xl"
          />
        </div>

        {/* Right Text */}
        <div className="about-text space-y-6 text-lg">
          {[
            "Welcome to QuickCart, your trusted online shopping destination where convenience meets variety.",
            "From daily essentials to trending fashion and the latest gadgets, we bring everything you need to your fingertips.",
            "We focus on speed, reliability, and customer satisfaction, ensuring every order reaches you on time.",
            "With secure payments, easy navigation, and 24/7 support, QuickCart makes online shopping effortless.",
          ].map((para, i) => (
            <p
              key={i}
              ref={(el) => (textRef.current[i] = el)}
              className="leading-relaxed"
            >
              {para}
            </p>
          ))}
          <p className="font-semibold text-indigo-700">
            Shop smart. Shop quick. Shop QuickCart.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="about-features px-6 md:px-16 lg:px-32 py-16 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "⚡ Fast Delivery",
            desc: "Get your products delivered quickly with reliable logistics.",
          },
          {
            title: "💰 Best Prices",
            desc: "Enjoy unbeatable deals and discounts across all categories.",
          },
          {
            title: "🤝 24/7 Support",
            desc: "Our team is always available to assist you anytime, anywhere.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            ref={(el) => (featureRef.current[i] = el)}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
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
      </>
  );
  
};

export default AboutPage;
