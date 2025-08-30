"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import gsap from "gsap";
import { usePathname } from "next/navigation"; // ✅ import
import { assets } from "@/assets/assets";
import Image from "next/image";

const ContactPage = () => {

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState("");
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const headerRef = useRef(null);

  const pathname = usePathname(); // ✅ detect route change

  useEffect(() => {
    // ✅ Run animations only when on /contact
    if (pathname === "/contact") {
      const ctx = gsap.context(() => {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(formRef.current, {
          opacity: 0,
          x: -100,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
        });

        gsap.from(infoRef.current, {
          opacity: 0,
          x: 100,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
        });

        // Floating animations
        gsap.to(formRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(infoRef.current, {
          y: 10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      return () => ctx.revert(); // ✅ cleanup animations on unmount
    }
  }, [pathname]); // ✅ runs again when route changes

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", "2428512a-f0dc-41b9-b674-f28901f47325");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Message sent successfully!");
      e.target.reset();
      setForm({ name: "", email: "", message: "" });
    } else {
      setResult("❌ Something went wrong. Try again.");
      console.error("Error:", data);
    }
  };

  return (
    <>
    <section className="min-h-screen px-6 md:px-16 lg:px-32 py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-gray-100">
      {/* Header */}
      <h1
        ref={headerRef}
        className="text-4xl md:text-5xl font-extrabold text-center mb-14"
      >
        Let’s <span className="text-purple-400">Connect</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-4 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-white/30 bg-transparent text-white placeholder-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-white/30 bg-transparent text-white placeholder-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            className="border border-white/30 bg-transparent text-white placeholder-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition font-semibold shadow-lg"
          >
            Send Message
          </button>

          {result && (
            <p className="mt-3 text-center text-sm font-medium text-purple-300">
              {result}
            </p>
          )}
        </form>

        {/* Contact Info */}
        <div
          ref={infoRef}
          className="flex flex-col justify-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-300">
            Contact Information
          </h2>
          <p className="flex items-center gap-3 mb-4">
            <FaEnvelope className="text-purple-400 text-lg" /> support@quickcart.com
          </p>
          <p className="flex items-center gap-3 mb-4">
            <FaPhone className="text-purple-400 text-lg" /> +91 98765 43210
          </p>
          <p className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-purple-400 text-lg" /> QuickCart HQ, New Delhi, India
          </p>
          <p className="text-gray-300">
            Our support team is available 24/7. Don’t hesitate to reach out for
            assistance with your orders, returns, or any inquiries.
          </p>
        </div>
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

export default ContactPage;
