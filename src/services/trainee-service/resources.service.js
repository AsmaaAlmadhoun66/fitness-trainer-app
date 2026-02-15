import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class ResourcesService extends BaseService{
    constructor() {
        super("resources");
    }
    get meal() {
        const url = this._endPoint + "/meal";
       return new Promise(async (resolve) =>  {
           resolve ( await  HTTP_REQUEST.get({target: url}));

       })
    }
    get food() {
        const url = this._endPoint + "/food?name=food_list";
       return new Promise(async (resolve) =>  {
           resolve ( await  HTTP_REQUEST.get({target: url}));

       })
    }

    addMeal = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/meal/add";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
}

export  default  ResourcesService;