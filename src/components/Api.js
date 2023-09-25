export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    getInitialCards() {
      return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
        headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce"
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          // if the server returns an error, reject the promise
          return Promise.reject(`Error: ${res.status}`);
        });
    }
    getUserInfo() {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
           headers:{
            authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce"
           } 
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    createCard({ name, link}) {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            method: "POST",
            body: JSON.stringify({name, link}),
            headers: {
            authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
            "Content-Type" : "application/json", 
            },
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((card) => {
            console.log("CARD CHECK! please work T_T.", card);
            return card;
        })
    }
}
