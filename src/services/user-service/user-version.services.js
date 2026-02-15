import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class UserVersionServices extends BaseService {
    constructor() {
        super('v1/user');
    }

    note (id) {
        const url = this._endPoint + "/trainer-notes-list/" + id;
        return HTTP_REQUEST.get({target:url});
    }
    addNote = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/trainer-notes/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
}

export default UserVersionServices;