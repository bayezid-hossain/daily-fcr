import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Entry from '@/models/entryModel';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, _id } = reqBody;

    const verifiedtoken =
      token &&
      (await verifyAuth(token).catch((err: any) => {
        console.log(err);
      }));
    let userId = verifiedtoken ? verifiedtoken.data?.id : '';
    const entries = await Entry.deleteOne({ userId, _id });
    // console.log(entries);
    const response = NextResponse.json({
      message: 'Entry Deleted',
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
