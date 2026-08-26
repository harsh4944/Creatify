"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchData } from "next-auth/client/_utils";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  
  const [currentUser, setcurrentUser]= useState({})
  const [payments, setPayments]= useState([])
  const searchParams = useSearchParams()

  useEffect(() =>{
    getData()
  }, []);

  useEffect(() => {
  if (searchParams.get("paymentdone") === "true") {
    toast.success("Thanks For Your Donation!", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
      transition: Bounce,
    });
  }
}, [searchParams]);
  

  const handleChange = (e) => {
    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };

const getData = async (params)=>{
let  u = await fetchuser(username)
setcurrentUser(u)
let dbpayments = await fetchpayments(username)
setPayments(dbpayments)
}


  const pay = async (amount) => {
  const order = await initiate(amount, username, paymentform);

  

  if (!order?.id) {
    alert("Order creation failed");
    return;
  }

  const options = {
    key: currentUser.razorpayid,
    amount: order.amount,
    currency: order.currency,

    name: "Get Me A Chai",
    description: "Support Payment",

    order_id: order.id,
    callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,

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
  };

  const rzp1 = new window.Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    console.log("Payment Failed:", response.error);
  });

  rzp1.open();
};



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Cover Image */}
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-48 md:h-[350]"
          src={currentUser.coverpic}
          alt=""
        />

        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 border-white border-2 rounded-full size-36 overflow-hidden">
          <img
            className="object-cover size-36 rounded-full"
            width={128}
            height={128}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>

      {/* User Info */}
      <div className="info flex  justify-center items-center my-24 mb-32 flex-col gap-2">
        <div className="text-lg font-bold">@{username}</div>

        <div className="text-slate-400">
         Lets help {username} get a chai
        </div>

        <div className="text-slate-400">
          {payments.length} Payments . {currentUser.name} ₹{payments.reduce((a,b) => a+b.amount, 0)} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          {/* Supporters */}
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Top 5 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length == 0 && <li> No payments yet</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img width={33} src="/person.gif" alt="user avatar" />

                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Payment */}
          <div className="makepayment  w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make Payment</h2>

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
                onClick={() => pay(Number(paymentform.amount))}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg disabled:bg-slate-600 disabled:from-purple-100"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 || paymentform.amount?.length<1
                }
              >
                Pay
              </button>
            </div>

            {/* Choose Amount */}
            <div className="flex flex-col md:flex-row gap-3 mt-5">
              <button
                className="bg-slate-800 p-2 rounded-lg"
                onClick={() => pay(10)}
              >
                ₹10
              </button>

              <button
                className="bg-slate-800 p-2 rounded-lg"
                onClick={() => pay(25)}
              >
                ₹25
              </button>

              <button
                className="bg-slate-800 p-2 rounded-lg"
                onClick={() => pay(50)}
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