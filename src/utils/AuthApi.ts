import { getCookie } from "./helpers";

class AuthApi {
  _url: any;
  
  constructor(url) {
    this._url = url;
  }
  response(res) {
    return res.json();
  }

  handleResponse(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      console.log(res.status);
      return Promise.reject(res);
    }
  }

  handleResponseError(e: Event) {
    console.log(e);
    return Promise.reject(e);
  }
  
  registerUser(email: string, password: string, name: string) {
    return fetch(`${this._url}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        name: `${name}`,
      }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }

  loginUser(email: string, password: string) {
    return fetch(`${this._url}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }

  forgetPassword(email: string) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: `${email}` }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }

  resetPassword(password: string, code: string) {
    return fetch(`${this._url}/password-reset/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: `${password}`, token: `${code}` }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }

  logout(refreshToken: string) {
    return fetch(`${this._url}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: `${refreshToken}`,
      }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }

  refreshToken(refreshToken: string) {
    return fetch(`${this._url}/auth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: `${refreshToken}`,
      }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }

  getUserInfo() {
    return fetch(`${this._url}/auth/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => (res.json()))
      .catch(this.handleResponseError);
  }
  updateUserInfo(name: string, email: string, password: string) {
    return fetch(`${this._url}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
      }),
    })
      .then(this.handleResponse)
      .catch(this.handleResponseError);
  }
}

export default AuthApi;