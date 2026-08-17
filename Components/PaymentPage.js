"use client";

import React, { useState } from "react";
import Script from "next/script";
import { initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const { data: session } = useSession();

  const handleChange = (e) => {
    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };

  const pay = async (amount) => {
  const order = await initiate(amount, username, paymentform);

  console.log("Order:", order);

  if (!order?.id) {
    alert("Order creation failed");
    return;
  }

  const options = {
    key: order.key_id,
    amount: order.amount,
    currency: order.currency,

    name: "Get Me A Chai",
    description: "Support Payment",

    order_id: order.id,
    callback_url: `${process.env.URL}/api/razorpay`,

    prefill: {
      name: paymentform.name,
      email: session?.user?.email || "",
    },

    notes: {
      message: paymentform.message,
      username: username,
    },

    theme: {
      color: "#3399cc",
    },

    // handler: function (response) {
    //   console.log("Payment Success:", response);
    //   alert("Payment Successful!");
    // },
  };

  const rzp1 = new window.Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    console.log("Payment Failed:", response.error);
  });

  rzp1.open();
};

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Cover Image */}
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-[350px]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=Q7kaA9Dnt4TnOtJ-3eyjCar55CnseIIIr6s38YDnNxM%3D&token-time=1788480000"
          alt=""
        />

        <div className="absolute -bottom-20 right-[45%] border-white border-2 rounded-full">
          <img
            className="rounded-full"
            width={150}
            height={150}
            src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/688268/58038c0493a24f549304aaaac67cc71b/eyJoIjozNjAsInciOjM2MH0%3D/3.jpeg?token-hash=mzlv0zlLWkaKumpeurZ_TXqYo8c6OJcqu2r5nPE87OM%3D&token-time=1787961600"
            alt=""
          />
        </div>
      </div>

      {/* User Info */}
      <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
        <div className="text-lg font-bold">@{username}</div>

        <div className="text-slate-400">
          Creating Animated art for VTT&apos;s
        </div>

        <div className="text-slate-400">
          26,626 members . 113 posts . $16,680/release
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11">

          {/* Supporters */}
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold">
              Supporters
            </h2>

            <ul className="mx-5 text-lg">
              <li className="my-4 flex gap-2 items-center">
                <img
                  width={33}
                  src="person.gif"
                  alt="user avatar"
                />

                <span>
                  Shubham donated
                  <span className="font-bold"> $5</span> with a message
                  &quot;I support you bro. Lots of ❤️&quot;
                </span>
              </li>

              <li className="my-4 flex gap-2 items-center">
                <img
                  width={33}
                  src="person.gif"
                  alt="user avatar"
                />

                <span>
                  Shubham donated
                  <span className="font-bold"> $5</span> with a message
                  &quot;I support you bro. Lots of ❤️&quot;
                </span>
              </li>

              <li className="my-4 flex gap-2 items-center">
                <img
                  width={33}
                  src="person.gif"
                  alt="user avatar"
                />

                <span>
                  Shubham donated
                  <span className="font-bold"> $5</span> with a message
                  &quot;I support you bro. Lots of ❤️&quot;
                </span>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="makepayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">
              Make Payment
            </h2>

            <div className="flex flex-col gap-2">

              <input
                name="name"
                onChange={handleChange}
                value={paymentform.name}
                type="text"
                placeholder="Enter Name"
                className="p-3 bg-slate-800 w-full rounded-lg"
              />

              <input
                name="message"
                onChange={handleChange}
                value={paymentform.message}
                type="text"
                placeholder="Enter Message"
                className="p-3 bg-slate-800 w-full rounded-lg"
              />

              <input
                name="amount"
                onChange={handleChange}
                value={paymentform.amount}
                type="number"
                placeholder="Enter Amount"
                className="p-3 bg-slate-800 w-full rounded-lg"
              />

              {/* Pay entered amount */}
              <button
                type="button"
                onClick={() => pay()}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg"
              >
                Pay
              </button>
            </div>

            {/* Choose Amount */}
            <div className="flex gap-3 mt-5">

              <button
                className="bg-slate-800 p-2 rounded-lg"
                onClick={() => pay(1000)}
              >
                ₹10
              </button>

              <button
                className="bg-slate-800 p-2 rounded-lg"
                onClick={() => pay(2500)}
              >
                ₹25
              </button>

              <button
                className="bg-slate-800 p-2 rounded-lg"
                onClick={() => pay(5000)}
              >
                ₹50
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;