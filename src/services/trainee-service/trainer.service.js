/*
 * this service contains methods for dealing with api trainees,
 * the service inherit from base service, and then pass the end point to ctor of parent.
 * <author> Mostafa mohamed ibrahim </author>
*/

import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class TrainerService extends BaseService{
    constructor() {
        super("user/trainee");
    }

    acceptRequest = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/accept-reject";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
}

export  default  TrainerService;