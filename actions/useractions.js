"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  // fetch  the secret of the user  who is getting  the payment
      let user = await User.findOne({username: to_username})
      const secret = user.razorpaysecret 

  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  const options = {
    amount: Math.round(Number(amount) * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const x = await instance.orders.create(options);

  await Payment.create({
    oid: x.id,
    amount: Number(amount),
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return {
    ...x,
    key_id: user.razorpayid,
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

  const p = await Payment.find({ to_user: username, done:true })
    .sort({ amount: -1 })
    .limit(5)
    .lean()

  return p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    createdAt: payment.createdAt?.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
  }))
}

export const updateProfle= async (data, oldusername)=>{
  await connectDB()
  let ndata = Object.fromEntries(data)

  if(oldusername !== ndata.username){
    let u = await User.findOne({ username: ndata.username})
    if(u){
      return { error: " Username already exists"}

    }
    await User.updateOne({ email: ndata.email}, ndata)

    await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
  }
  else{

    await User.updateOne({ email: ndata.email}, ndata)
  }

}