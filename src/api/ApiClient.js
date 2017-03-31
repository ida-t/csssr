import 'whatwg-fetch';
import { settings } from '../utils/settings';

export class ApiClient {

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get = (url) => {
    const params = {
      method: 'GET',
      cache: 'no-cache',
      headers: ApiClient.getRequestHeaders(),
    };
    return fetch(`${this.apiUrl}${url}`, params)
      .then(ApiClient.processResponse);
  }

  post = (url, payload) => {
    const params = {
      method: 'POST',
      cache: 'no-cache',
      headers: ApiClient.getRequestHeaders(),
      body: JSON.stringify(payload),
    };
    return fetch(`${this.apiUrl}${url}`, params)
      .then(ApiClient.processResponse);
  }

  static getRequestHeaders() {
    return new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
  }

  static processResponse(response) {
    return response.json().then((json) => {
      if (response.status < 200 || response.status >= 400) {
        throw new Error((json && json.message) || response.statusText);
      }
      return json;
    });
  }
}

export const apiClient = new ApiClient(settings.apiUrl);
