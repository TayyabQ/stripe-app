// import { NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";

// interface SubscribeRequestBody{
//     amount: number;
// }

// export async function POST(request: Request){
//     try{
//         const body = await request.json();
//         const {amount} = body as SubscribeRequestBody;

//         console.log(amount)

//         if(!amount){
//             return NextResponse.json(
//                 {error: "Amount not found"},
//                 {status: 404}
//             )
//         }
//         const newSubscription = await prisma.subscription.create({
//             data: {
//                  amount: amount,
//             },
//         });

//         return NextResponse.json (
//             {message: "Successfully Subscribed in db!",
//                 subscription: newSubscription,
//             },
//             {status: 201}
//         );

//     } catch (error: any){
//         console.error("API Route Error - /api/subscribe POST:", error)

//         return NextResponse.json(
//             {error: "Internal Server Error"},
//             {status: 500}
//         )
//     }
// }