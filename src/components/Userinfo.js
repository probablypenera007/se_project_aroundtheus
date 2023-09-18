class UserInfo { //repsonsible for rendering information from the user
    constructor(userNameSelector, jobNameSelector){//object with selectors of two elements
        this._nameSlct = document.querySelector(userNameSelector);
        this._jobnameSlct = document.querySelector(jobNameSelector);
    }
    getUserinfo(){
        return {
            name: this._nameSlct.textContent,
            job: this._jobnameSlct.textContent,
        };

    }
    setUserInfo({name, job}){
        this._nameSlct.textContent = name;
        this._jobnameSlct.textContent = job;
    }
   
}