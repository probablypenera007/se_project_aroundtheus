export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({ name, link }),
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((card) => {
        console.log("CARD CHECK! please work T_T.", card);
        return card;
      });
  }
  updateEditProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cardId) => {
        console.log("DELETE CHECK! please work T_T.", cardId);
        return cardId;
      });
  }
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((like) => {
        console.log("LIKE CHECK! please work T_T.", like);
        return like;
      });
  }
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((unlike) => {
        console.log("LIKE CHECK! please work T_T.", unlike);
        return unlike;
      });
  }
  updateAvatar(updatedAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: updatedAvatar }),
      headers: {
        authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((updatedAvatar) => {
        console.log("AVATAR CHECK! please work T_T.", updatedAvatar);
        return updatedAvatar;
      });
  }
}
