export default class UserInfo { //repsonsible for rendering information from the user
    constructor(userNameSelector, jobNameSelector){//object with selectors of two elements
        this._nameElement = document.querySelector(userNameSelector);
        this._jobElement = document.querySelector(jobNameSelector);
    }
    getUserinfo(){
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        };

    }
    setUserInfo({name, job}){
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
   
}