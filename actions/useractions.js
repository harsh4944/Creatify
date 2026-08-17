// "use server";

// import Razorpay from "razorpay";
// import Payment from "@/models/Payment";
// import connectDB from "@/db/connectDb";

// export const initiate = async (amount, to_username, paymentform) => {
//   await connectDB();

//   const instance = new Razorpay({
//     key_id: process.env.KEY_ID,
//     key_secret: process.env.KEY_SECRET,
//   });

//   const options = {
//     amount: Number.parseInt(amount),
//     currency: "INR",
//     receipt: `receipt_${Date.now()}`,
//   };

//   const x = await instance.orders.create(options);

//   console.log("Razorpay Order:", x);

//   await Payment.create({
//     oid: x.id,
//     amount: Number(amount),
//     to_user: to_username,
//     name: paymentform.name,
//     message: paymentform.message,
//   });

//   return x;
// };

"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const x = await instance.orders.create(options);

  console.log("Razorpay Order:", x);

  await Payment.create({
    oid: x.id,
    amount: Number(amount),
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return {
    ...x,
    key_id: process.env.KEY_ID,
  };
};