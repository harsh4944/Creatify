import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const paymentId = formData.get("razorpay_payment_id");
  const orderId = formData.get("razorpay_order_id");
  const signature = formData.get("razorpay_signature");

  console.log("Payment ID:", paymentId);
  console.log("Order ID:", orderId);
  console.log("Signature:", signature);

  // Yaha payment signature verify karna hai

  return NextResponse.redirect(
    new URL("/harshkaushik494", req.url)
  );
}