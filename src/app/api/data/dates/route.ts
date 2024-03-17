import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import { cookies } from 'next/headers';
import Date from '@/models/dateModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function GET(request: NextRequest) {
  let userId;
  let verifiedToken;
  let cookie = request.headers.get('Cookie');
  try {
    const token = cookie?.substring(cookie.lastIndexOf('token='));
    verifiedToken =
      token &&
      (await verifyAuth(token).catch((err: any) => {
        console.log(err);
      }));
    userId = verifiedToken ? verifiedToken.data?.id : '';
    console.log(userId);
    const dates = await Date.find({ users: userId }, '-users');
    // console.log(entries);
    const response = NextResponse.json({
      message: 'Date List',
      data: dates,
      success: true,
    });
    console.log(dates);
    console.log(token);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        userId: userId,
        cookie,
        verifiedToken,
        token: request.headers.get('token'),
      },
      { status: 500 }
    );
  }
}
