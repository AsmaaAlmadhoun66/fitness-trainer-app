import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class MusclesService extends BaseService{
    constructor() {
        super("resources");
    }
    get muscles() {
        const url = this._endPoint + "/muscles";
       return new Promise(async (resolve) =>  {
           resolve ( await  HTTP_REQUEST.get({target: url}));

       })
    }
}

export  default  MusclesService;