import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class UserService extends BaseService {
    constructor() {
        super('user');
    }
    get imageDefaultPath () {
        return "https://testing.miranapp.com/media/";
    }
    get profile () {
        const url = this._endPoint + "/trainer-profile";
        return HTTP_REQUEST.get({target:url});
    }
    get faq () {
        const url = this._endPoint + "/faq";
        return HTTP_REQUEST.get({target:url});
    }
    addFaq = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/faq";
        return  HTTP_REQUEST.post({target:url , body : data});
    }

    get traineeList () {
        const url = this._endPoint + "/trainer/students";
        return HTTP_REQUEST.get({target:url});
    }
}

export default UserService;