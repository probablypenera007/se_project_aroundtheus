export default class UserInfo { //repsonsible for rendering information from the user
    constructor(userNameSelector, jobNameSelector){//object with selectors of two elements
        this._nameElement = document.querySelector(userNameSelector);
        this._jobElement = document.querySelector(jobNameSelector);
    }
    getUserInfo(){
        const userInput = {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        };
        return userInput;
    }
    setUserInfo(data){
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.job;
    }
}