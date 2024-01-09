import {connect} from '@/lib/db.js'
import {User} from '@/models/userModel.js'
 import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req){
    try {
        const reqBody=await req.json()
        const {username,email,password}=reqBody;
        console.log(reqBody)
        
        const userexist=await User.findOne({email});

        if(userexist)
        {
           return NextResponse.json({error:"User already exists"},{status:400})
        }
        const salt= await bcryptjs.genSalt(10)
        const hashpass=await bcryptjs.hash(password,salt)

        const newuser=new User({
            username,
            email,
            password:hashpass
        })
        const saveduser=await newuser.save()
        return NextResponse.json({
            msg:'user created Successfully'
        },{status:201})

    } catch (error) {
        return NextResponse.json({
            msg:`error occured ${error}`
        },{status:400})   
    }
}

export async function GET(){

}

export async function PUT(){
    
}
