/*
 * this service contains methods for dealing with api trainees,
 * the service inherit from base service, and then pass the end point to ctor of parent.
 * <author> Mostafa mohamed ibrahim </author>
*/

import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class TraineeService extends BaseService{
    constructor() {
        super("user/trainer");
    }

    get trainees() {
        const url = this._endPoint + "/students";
        return new Promise(async (resolve) => {
            resolve(await HTTP_REQUEST.get({target: url}));

        })
    }
    get trainees_list() {
        const url = this._endPoint + "?name=trainers-list";
        return new Promise(async (resolve) =>  {
            resolve ( await  HTTP_REQUEST.get({target: url}));

        })
    }
    get requests() {
        const url = this._endPoint + "/requests?name=trainers-requests";
        return new Promise(async (resolve) =>  {
            resolve ( await  HTTP_REQUEST.get({target: url}));

        })
    }
}

export  default  TraineeService;