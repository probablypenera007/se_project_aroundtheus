export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
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
    updateEditProfile({name, job}) {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me ", {
            method: "PATCH",
            body: JSON.stringify({name, job}),
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
    }
    deleteCard(cardId) {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId", {
            method: "DELETE",
            headers: {
            authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
            },
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((dlt) => {
            console.log("DELETE CHECK! please work T_T.", dlt);
            return dlt;
        })
    }
    likeCard(cardId) {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
            method: "PUT",
            headers: {
            authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
            },
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((like) => {
            console.log("LIKE CHECK! please work T_T.", like);
            return like;
        })
    }
    unlikeCard(cardId) {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
            method: "DELETE",
            headers: {
            authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
            },
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((unlike) => {
            console.log("LIKE CHECK! please work T_T.", unlike);
            return unlike;
        })
    }
    updateAvatar(avatarLink) {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify({avatar: avatarLink}),
            headers: {
            authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
            "Content-Type": "application/json",
            },
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((avtr) => {
            console.log("AVATAR CHECK! please work T_T.", avtr);
            return avtr;
        })
    }
}
