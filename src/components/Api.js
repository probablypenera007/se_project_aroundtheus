export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
}

    //getInitialCards() {
    //    return fetch("https://around-api.en.tripleten-services.com/v1", {
    //        headers: {
    //          authorization:atoken 
    //        }
    //      })
    //        .then(res => {
     //         if (res.ok) {
     //           return res.json();
     //         }
     //         // if the server returns an error, reject the promise
     //         return Promise.reject(`Error: ${res.status}`);
     //       });
 // }
