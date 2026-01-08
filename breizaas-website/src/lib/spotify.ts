/**
 * Spotify Web API Integration
 * Fetches real-time artist data from Spotify
 */

export interface SpotifyArtist {
  followers: {
    total: number;
  };
  name: string;
  id: string;
}

export interface ApiError {
  code: 'SPOTIFY_ERROR';
  message: string;
}

/**
 * Get Spotify access token using Client Credentials flow
 * Tokens are cached and reused until expiry
 */
async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing Spotify credentials');
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to get Spotify token:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
}

/**
 * Fetch Spotify artist follower count
 * Uses artist ID extracted from Spotify artist URL
 *
 * @param artistId - Spotify artist ID (from artist URL)
 * @returns Follower count or ApiError
 *
 * @example
 * ```ts
 * const result = await getSpotifyFollowers('3sMoefLp287FEWJF6Ue7oc');
 * if ('code' in result) {
 *   console.error(result.message);
 * } else {
 *   console.log(`${result.toLocaleString()} followers`);
 * }
 * ```
 */
export async function getSpotifyFollowers(artistId: string): Promise<number | ApiError> {
  const token = await getSpotifyAccessToken();

  if (!token) {
    return {
      code: 'SPOTIFY_ERROR',
      message: 'Kunne ikke hente Spotify data',
    };
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch Spotify artist:', response.statusText);
      return {
        code: 'SPOTIFY_ERROR',
        message: 'Kunne ikke hente Spotify data',
      };
    }

    const data: SpotifyArtist = await response.json();
    return data.followers.total;
  } catch (error) {
    console.error('Error fetching Spotify followers:', error);
    return {
      code: 'SPOTIFY_ERROR',
      message: 'Kunne ikke hente Spotify data',
    };
  }
}
