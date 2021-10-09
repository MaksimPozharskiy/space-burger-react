// import { getCookie } from "./func";

class AuthApi {
  _url: any;
  
  constructor(url) {
    this._url = url;
  }
  response(res) {
    return res.json();
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log(res.status);
      return Promise.reject(res);
    }
  }

  handleResponseError(e) {
    console.log(e);
    return Promise.reject(e);
  }
  
  registerUser(email, password, name) {
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
}

export default AuthApi;