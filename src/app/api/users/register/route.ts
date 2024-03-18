import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT } from 'jose';
import { getJwtSecretKey } from '@/helpers/auth';

connect();

export async function POST(request: NextRequest) {
  // console.log('ip' + request.headers.get('x-forwarded-for'));
  try {
    const reqBody = await request.json();
    const { name, mobile, password } = reqBody;
    //check if user exists
    let user = await User.findOne({ mobile });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    } else {
      user = await User.create({ name, mobile, password });
    }

    //create token data
    const tokenData = {
      id: user._id,
      mobile: user.mobile,
      isVerified: user.isVerified,
    };
    //create token
    const token = await new SignJWT({ data: tokenData })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(new TextEncoder().encode(getJwtSecretKey()));
    const response = NextResponse.json({
      message: 'Registration successful',
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 86400,
      secure: true,
      sameSite: 'none',
      domain: process.env.DOMAIN,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
