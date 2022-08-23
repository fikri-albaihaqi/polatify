import axios from 'axios';

// Refresh the token
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');
const setAuthStatus = status => window.localStorage.setItem('status', status);
const getAuthStatus = () => window.localStorage.getItem('status');
const deleteAuthStatus = () => window.localStorage.removeItem('logged_in');

const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8888/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error && (getAuthStatus() == 'logged_in')) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if ((Date.now() - getTokenTimestamp() > EXPIRATION_TIME) && (getAuthStatus() == 'logged_in')) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (((!localAccessToken || localAccessToken === 'undefined') && access_token) && (getAuthStatus() == 'logged_in')) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const login = () => {
  setAuthStatus('logged_in');
}

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.localStorage.removeItem('status');
  window.location.reload();
};

// API CALLS

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-type': 'application/json',
}

export const getUserProfile = () => axios.get('https://api.spotify.com/v1/me', { headers })

export const getUserPlaylists = () => axios.get('https://api.spotify.com/v1/users/user_id/playlists', { headers })

export const getUserFollowedArtists = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers })

export const getUserTopTracksShort = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term', { headers })

export const getUserTopTracksMedium = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term', { headers })

export const getUserTopTracksLong = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', { headers })

export const getUserTopArtistsShort = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term', { headers })

export const getUserTopArtistsMedium = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term', { headers })

export const getUserTopArtistsLong = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', { headers })