import { connect } from '@/dbConfig/dbConfig';
import { verifyAuth } from '@/helpers/auth';
import Entry from '@/models/entryModel';
import Date from '@/models/dateModel';
import { NextRequest, NextResponse } from 'next/server';
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      farmerName,
      location,
      totalDOCInput,
      strain,
      fcr,
      age,
      date,
      stdFcr,
      stdWeight,
      todayMortality,
      totalMortality,
      avgWeight,
      totalFeed510,
      totalFeed511,
      farmStock510,
      farmStock511,
      disease,
      medicine,
    } = reqBody;
    //check if user exists
    const token = request.cookies.get('token')?.value || '';

    const verifiedtoken =
      token &&
      (await verifyAuth(token).catch((err: any) => {
        console.log(err);
      }));
    let userId = verifiedtoken ? verifiedtoken.data?.id : '';
    const entry = await Entry.create({
      userId: userId,
      date: date,
      farmerName: farmerName,
      location: location,
      totalDOCInput: totalDOCInput,
      strain: strain,
      age: age,
      fcr: fcr,
      stdFcr: stdFcr,
      avgWeight: avgWeight,
      stdWeight: stdWeight,
      todayMortality: todayMortality,
      totalMortality: totalMortality,
      totalFeed: {
        510: totalFeed510,
        511: totalFeed511,
      },
      farmStock: {
        510: farmStock510,
        511: farmStock511,
      },
      disease: disease,
      medicine: medicine,
    });
    try {
      await Date.create({
        date: date,
        users: userId,
      });
    } catch (error: any) {
      await Date.updateOne(
        { date: date, users: { $not: { $elemMatch: { $eq: userId } } } },
        { $addToSet: { users: userId } }
      );
    }
    const response = NextResponse.json({
      message: 'Entry successful',
      data: entry,
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
