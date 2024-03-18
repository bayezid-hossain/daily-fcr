import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Entry from '@/models/entryModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST(request: NextRequest) {
  try {
    const user_info_cookie = request.headers.get('user_info_cookie') || '';
    const date = request.url
      .toString()
      .substring(request.url.lastIndexOf('/') + 1);
    console.log(date);
    const verifieduser_info_cookie =
      user_info_cookie &&
      (await verifyAuth(user_info_cookie).catch((err: any) => {
        console.log(err);
      }));
    let userId = verifieduser_info_cookie
      ? verifieduser_info_cookie.data?.id
      : '';
    const entries = await Entry.find({ userId, date });
    // console.log(entries);
    const response = NextResponse.json({
      message: 'Entry List',
      data: entries,
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
