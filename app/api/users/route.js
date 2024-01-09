import {connect} from '@/lib/db.js'
import {User} from '@/models/userModel.js'
 import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

await connect()

export async function POST(req){
    try {
        const reqBody=await req.json()
        const {username,email,password}=reqBody;
        
        const userexist=await User.findOne({email});
         
        if(userexist)
        {
           return NextResponse.json({error:"User already exists"},{status:400})
        }
        const salt= await bcryptjs.genSalt(10)
        const hashpass=await bcryptjs.hash(password,salt)

        const user=new User({
            username,
            email,
            password:hashpass
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
        console.log(req.json())
        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return NextResponse.json({
                msg: 'Request body is empty',
            }, { status: 400 });
        }

        const reqBody = await req.json();
        const { email } = reqBody;
        console.log(email);

        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({
                msg: 'User not exists',
            }, { status: 400 });
        }

        console.log(user);

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
export async function PUT(req){
    try {
        const reqBody=await req.json()
        const { username, email, password } = reqBody;
        const user = await User.findOne({email});
        console.log(user)

        const cmppass=await bcryptjs.compare(password,user.password)
        if(!cmppass)
        {
            return NextResponse.json({
                msg:`Wrong password`
            },{status:400})  
        }

        const salt= await bcryptjs.genSalt(10)
        const hashpass=await bcryptjs.hash(password,salt)
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            username: username || user.username,
            password: hashpass || user.password,
          },
          { new: true }
        );
        return NextResponse.json({
            msg:'user profile updated Successfully',
            updatedUser,
        },{status:200})
      } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg:`error occured ${error}`
        },{status:400})  
      }
}

