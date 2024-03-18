import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Date from '@/models/dateModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST(request: NextRequest) {
  try {
    let user_info_cookie = request.headers.get('Cookie') || '';
    user_info_cookie = user_info_cookie.replaceAll('user_info_cookie=', '');
    console.log(user_info_cookie);
    const verifieduser_info_cookie =
      user_info_cookie &&
      (await verifyAuth(user_info_cookie).catch((err: any) => {
        console.log(err);
      }));
    let userId = verifieduser_info_cookie
      ? verifieduser_info_cookie.data?.id
      : '';
    const dates = await Date.find({ users: userId }, '-users');
    // console.log(entries);
    const response = NextResponse.json({
      message: 'Date List',
      data: dates,
      success: true,
    });
    console.log(dates);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
