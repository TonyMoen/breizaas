import { NextResponse } from 'next/server';
import { getArtistInfo } from '@/lib/queries/artistInfo';

export async function GET() {
  try {
    const artistInfo = await getArtistInfo();

    return NextResponse.json({
      success: !('code' in artistInfo),
      data: artistInfo,
      message: 'code' in artistInfo
        ? `Error: ${artistInfo.message} (${artistInfo.code})`
        : 'Successfully fetched artist info',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
