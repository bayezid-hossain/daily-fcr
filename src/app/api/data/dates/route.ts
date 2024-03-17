import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Date from '@/models/dateModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST(request: NextRequest) {
  let userId;
  try {
    const token = request.headers.get('token') || '';

    const verifiedToken =
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
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, userId: userId },
      { status: 500 }
    );
  }
}
