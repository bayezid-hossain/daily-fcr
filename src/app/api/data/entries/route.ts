import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Entry from '@/models/entryModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('token') || '';

    const verifiedtoken =
      token &&
      (await verifyAuth(token).catch((err: any) => {
        console.log(err);
      }));

    let userId = verifiedtoken ? verifiedtoken.data?.id : '';
    console.log(userId);
    const entries = await Entry.find({ userId });
    console.log(entries);
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
