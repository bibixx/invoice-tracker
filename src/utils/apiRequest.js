const getAccessToken = () => '';
const createQueryParams = () => '';

export class FetchError extends Error {
  constructor(status, errors) {
    super(errors[0].title);
    this.name = 'FetchError';
    this.status = status;
    this.errors = errors;
  }
}

const getAuth = auth => (auth ? { Authorization: `Bearer ${getAccessToken()}` } : {});
const getMethod = (method, body) => {
  if (!body) {
    return method || 'GET';
  }

  return method || 'POST';
};

const getBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    return {
      body: JSON.stringify(body),
    };
  }

  return { body };
};

const getUrl = (url, query) => (query && Object.keys(query).length > 0 ? `${url}${createQueryParams(query)}` : url);

const apiRequest = (
  url,
  {
    body, headers, method, withAuth = true, query, isLogout, ...options
  } = {},
) => fetch(getUrl(url, query), {
  headers: {
    'content-type': 'application/json',
    ...getAuth(withAuth),
    ...headers,
  },
  method: getMethod(method, body),
  ...getBody(body),
  ...options,
}).then((response) => {
  const contentType = response.headers.get('content-type') || '';
  const parseResponseData = () => (contentType.includes('json') ? response.json() : response.text());

  return parseResponseData().then((data) => {
    if (!response.ok) {
      throw new FetchError(response.status, data.errors);
    }

    return data;
  });
});

export default apiRequest;
