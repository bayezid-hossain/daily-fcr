import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Date from '@/models/dateModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const verifiedToken =
      token &&
      (await verifyAuth(token).catch((err: any) => {
        console.log(err);
      }));
    let userId = verifiedToken ? verifiedToken.data?.id : '';
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
