"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
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
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
  };

  
};
export const fetchuser = async (username) => {
  await connectDB()

  const u = await User.findOne({ username })

  const userData = u?.toObject({ flattenObjectIds: true })

  return userData
}
export const fetchpayments = async (username) => {
  await connectDB()

  const p = await Payment.find({ to_user: username })
    .sort({ amount: -1 })
    .lean()

  return p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    createdAt: payment.createdAt?.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
  }))
}