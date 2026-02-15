import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class ExerciseService extends BaseService{
    constructor() {
        super("resources");
    }
    get exercise() {
        const url = this._endPoint + "/exercise";
       return new Promise(async (resolve) =>  {
           resolve ( await  HTTP_REQUEST.get({target: url}));

       })
    }
    exercise_muscle(muscle_title) {
        const url = this._endPoint + "/exercise?muscle__title=" + muscle_title;
       return new Promise(async (resolve) =>  {
           resolve ( await  HTTP_REQUEST.get({target: url}));

       })
    }
}

export  default  ExerciseService;