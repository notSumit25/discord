import {connect} from '@/lib/db.js'
import {User} from '@/models/userModel.js'
import { getAuth } from "@clerk/nextjs/server";
 import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { auth, currentUser } from "@clerk/nextjs";

await connect()

export async function POST(req){
    try {
        const reqBody=await req.json()
        const {username,email,password}=reqBody;
        
        const userexist=await User.findOne({email});
         const {userId}=auth();
        if(userexist)
        {
           return NextResponse.json({error:"User already exists"},{status:400})
        }
        const salt= await bcryptjs.genSalt(10)
        const hashpass=await bcryptjs.hash(password,salt)
        
        const user=new User({
            username,
            email,
            password:hashpass,
            userid:userId
        })
        const saveduser=await user.save()
        return NextResponse.json({
            msg:'user created Successfully',
            saveduser,
        },{status:201})

    } catch (error) {
        return NextResponse.json({
            msg:`error occured ${error}`
        },{status:400})   
    }
}

//get profile by email
export async function GET(req){
    try {
        // console.log(req.json())
        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return NextResponse.json({
                msg: 'Request body is empty',
            }, { status: 400 });
        }

        const reqBody = await req.json();
        const { email } = reqBody;
      

        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({
                msg: 'User not exists',
            }, { status: 400 });
        }
        return NextResponse.json({
            msg: 'User found successfully',
            data: user,
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: `Error occurred: ${error}`,
        }, { status: 400 });
    }
}



//update profile
export async function PATCH(req){
    try {
        const reqBody=await req.json()
        const { username, pic } = reqBody;
        // console.log(username,pic);
        const user = await currentUser();
        const userm = await User.findOneAndUpdate({ userId: user.id },{
            username:username,
            pic:pic
          });
        return NextResponse.json({
            msg:'user profile updated Successfully',
            userm,
        },{status:200})
      } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg:`error occured ${error}`
        },{status:400})  
      }
}

