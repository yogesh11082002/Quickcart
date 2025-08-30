// import React from "react";

// const NewsLetter = () => {
//   return (
//     <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
//       <h1 className="md:text-4xl text-2xl font-medium">
//         Subscribe now & get 20% off
//       </h1>
//       <p className="md:text-base text-gray-500/80 pb-8">
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry.
//       </p>
//       <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
//         <input
//           className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
//           type="text"
//           placeholder="Enter your email id"
//         />
//         <button className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none">
//           Subscribe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;

"use client";
import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      alert(
        "🎉 Thanks for subscribing! You’ll receive your 20% discount code in your inbox shortly."
      );
      setEmail(""); // clear field
    }
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium">
        Subscribe now &{" "}
        <span className="text-red-600">get 20% off</span>
      </h1>
      <p className="md:text-base text-gray-500/80 pb-8 max-w-xl">
        Join our newsletter to stay updated on the latest arrivals, special
        offers, and exclusive deals. As a welcome gift, new subscribers will
        instantly receive a  20% discount
        code in their email inbox.
      </p>

      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubscribe}
          disabled={!isValidEmail(email)}
          className={`md:px-12 px-8 h-full text-white rounded-md rounded-l-none transition ${
            isValidEmail(email)
              ? "bg-red-600 hover:bg-red-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
