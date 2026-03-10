import { auth } from "@/auth";
import connectDb from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const { phone, role } = await request.json();
        const session = await auth()
        const user = await User.findOneAndUpdate({email: session?.user?.email}, {role, phone}, {new: true})
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        return NextResponse.json({user})
    } catch (error) {
        return NextResponse.json({message: `Edit role and phone error ${error}`}, {status: 500})
    }
}