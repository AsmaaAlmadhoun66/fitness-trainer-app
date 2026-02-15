import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class MealService extends BaseService{
    constructor() {
        super("template/meal");
    }

    addMealToTemplateDay = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    addFood = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/";
        return  HTTP_REQUEST.put({target:url , body : data});
    }
}

export  default  MealService;