// import axios from 'axios';

// const SITE_URL = 'http://localhost:3000/';
const SITE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001'
    : 'https://circulusjmkim.github.io';
const API_URL = (env) => {
  console.log(env);
  // if (process.env.NODE_ENV !== 'production') {
  //   return 'http://0.0.0.0:58791/v1/';
  // }
  switch (env) {
    case 'stg':
      return 'http://192.168.2.114:58791/v1/';
    default:
      return 'http://192.168.3.214:59791/v1/';
  }
};
const publishDate = '2107161406';

export const POST = 'POST';
export const PATCH = 'PATCH';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const GET = 'GET';

export const encodeGetParams = (p) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&');

export const setAPI = (path, method, body) => {
  const env = localStorage.getItem('env');
  const url = `${API_URL(env)}${path}`;
  const headers =
    method === GET && body && 'token' in body
      ? {
          method,
          mode: 'cors',
          headers: {
            'x-access-token': body.token,
            'Access-Control-Allow-Origin': SITE_URL,
            'Access-Control-Allow-Methods': method,
          },
        }
      : {
          method,
          mode: 'cors',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': SITE_URL,
            'Access-Control-Allow-Methods': method,
            'Content-Type': 'application/json',
          },
        };
  if (body && method !== GET) {
    headers.body = JSON.stringify(body);
  }
  return { url, headers };
};

const URL = window.URL || window.webkitURL;
// Get data from the cache.
async function getCachedData(cacheName, url, audio) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    const res = await fetch(url);
    if (res.ok) {
      await cacheStorage.add(url);
      let data;
      if (audio) {
        data = await res.arrayBuffer();
        data = new Blob([data], { type: 'audio/mpeg' });
      } else {
        data = await res.blob();
      }
      return { cached: false, file: URL.createObjectURL(data) };
    }
    if (url.indexOf('diary') > -1) {
      return null;
    }
    return { cached: false, file: `${SITE_URL}/image/img_thumb.png` };
  }

  // eslint-disable-next-line no-return-await
  const data = await cachedResponse.blob();
  return { cached: true, file: URL.createObjectURL(data) };
}

async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();

  keys.forEach((key) => {
    const isOurCache = key.substr(0, 7) === 'assets-';

    if (isOurCache && currentCache !== key) {
      caches.delete(key);
    }
  });
}

const getMobileOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
};

export async function getFile(data) {
  if (!data) return `${SITE_URL}/image/img_thumb.png`;
  const cacheName = `assets-${publishDate}`;
  const url = `${API_URL()}file?${encodeGetParams(data)}`;
  const [key] = Object.keys(data);
  const exceptCase =
    getMobileOS() === 'iOS' || key === 'diary' || key === 'userPhoto';
  let file;
  try {
    if (window.caches && !exceptCase) {
      const cachedData = await getCachedData(cacheName, url, 'diary' in data);
      if (cachedData) {
        const { cached, file: f } = cachedData;
        if (cached) {
          await deleteOldCaches(cacheName);
        }
        return f;
      }
    }

    const res = await fetch(url);
    if (data && 'diary' in data) {
      file = await res.arrayBuffer();
      file = new Blob([file], { type: 'audio/mpeg' });
    } else {
      file = await res.blob();
    }
    return URL.createObjectURL(file);
  } catch (error) {
    if (data && 'diary' in data) {
      return null;
    }
    return `${SITE_URL}/image/img_thumb.png`;
  }
}
