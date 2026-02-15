import HTTP_REQUEST from "../http-service/httpService";


class BaseService  {
    _endPoint;
    constructor(endPoint) {
        if(!endPoint)
            throw new Error("endpoint must be pass");
        this._endPoint = endPoint;
    }


}

export  default  BaseService;