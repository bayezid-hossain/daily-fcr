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
    const { mobile, password } = reqBody;
    //check if user exists
    const user = await User.findOne({ mobile });
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    //check if password is correct
    if (user.password != password) {
      return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
    }
    // console.log(user);
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
      message: 'Login successful',
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 86400,
      secure: true,
      sameSite: 'none',
    });
    await user.save();
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
