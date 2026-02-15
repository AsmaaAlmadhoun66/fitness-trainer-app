import BaseService from "../base-service/base.service";
import {HTTP_REQUEST} from "../http-service/httpService";

class TemplateService extends BaseService{
    constructor() {
        super('template');
    }
    get getAll() {
        const url = this._endPoint;
        return HTTP_REQUEST.get({target:url});
    }
    getTemplateForDay(tempId, day) {
        const url = this._endPoint + "/"+tempId+"?day="+day;
        return HTTP_REQUEST.get({target:url});
    }
    createTemplate({name}) {
        const url = this._endPoint  + "/";
        return HTTP_REQUEST.post({target:url , body : {name}})
    }
    updateTemplate(id , data) {
        if(!id || !data)
            return;
        const url = this._endPoint + "/" + id;
        return HTTP_REQUEST.put({target:url, body:data});
    }
    deleteTemplate(id) {
        if(!id)
            return;
        const url = this._endPoint+"/" + id;
        return HTTP_REQUEST._delete({target:url});
    }

    addTemplateBreakDay = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/break_day/";
        return  HTTP_REQUEST.put({target:url , body : data});
    }
    templateCopyExercise = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/copy-exercise/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    templateCopyExerciseDay = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/copy-exercise-day/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    templateCopyMeal = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/copy-meal/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    templateCopyMaelDay = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/copy-meal-day/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }

    addExerciseToTemplate = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/exercise/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    deleteMealTemplate = async (data) =>{
        if(!data)
            return ;
        const url = this._endPoint+"/meal/"  ;
        return HTTP_REQUEST._delete({target:url, body : data});
    }
    deleteExerciseTemplate = async (data) =>{
        if(!data)
            return;
        const url = this._endPoint+"/exercise/" ;
        return HTTP_REQUEST._delete({target:url, body : data});
    }
    addTemplateDay = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/day/";
        return  HTTP_REQUEST.post({target:url , body : data});
    }
    removeTemplateDay = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/day/";
        return  HTTP_REQUEST._delete({target:url , body : data});
    }

}

export  default  TemplateService;