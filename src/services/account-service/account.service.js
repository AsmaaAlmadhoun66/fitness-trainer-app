import {HTTP_REQUEST} from "../http-service/httpService";
import BaseService from "../base-service/base.service";

const { SodiumPlus } = require('sodium-plus');

class AccountService extends BaseService {
    constructor() {
        super("user");
    }


    login = async (data) => {
        if(!data)
            return ;
        const url =   this._endPoint + "/trainer-login";
       return  HTTP_REQUEST.post({target:url , body : data});
    }

    register = async (data) => {
        if(!data)
            return ;

        const url = this._endPoint  + "/register/trainer" ;
      return await  HTTP_REQUEST.post({target:url , body : data});
    }



    forgetPassword = async (data) => {
        if(!data) return ;
        const url =   this._endPoint + "/request-reset-password?email=" + data
       return  await HTTP_REQUEST.get({target:url });
    }


    /*
    * purpose of this function to Retrieve language from API;
    */

    get languages () {
        const url = "languages";
        return  HTTP_REQUEST.get({target :url});
    }

    /*
    * purpose of this function is Retrieve Nationalities from API.
    */
     get  nationalities() {
        const url = this._endPoint + "/nationalities";
        return  HTTP_REQUEST.get({target:url});
    }



    addProfile = async(data) => {
         if(!data) return ;
         const url = this._endPoint + "/trainer-profile";
         return await HTTP_REQUEST.Post_As_Form_Data({target:url , body:data});
    }


    /*
    * <summary> add token in local storage </summary>
    * <params> take token as string , param is mandatory </params>
    * <returns> true : if success , false : if token undefined </returns>
    */
    becomeAuthorize = async (token ) => {
        if(!token)
        {
            return false;
        }
        return new Promise(((resolve) =>  {
            localStorage.setItem('miran-token' , token);
            resolve();
        }));


    }

    set userData (val) {
        localStorage.setItem('miran-user-data' , JSON.stringify(val));
    }

    get userData () {
        return localStorage.getItem('miran-user-data');
    }

    /*
    * <summary> purpose of this func to check if current user is authorize or not </summary>
    * <returns> true : if authorize  , false : if not authorize </returns>
    */
    isAuthorize = () => {
       const token =  localStorage.getItem('miran-token');
       return !!token;
    }



    // encryptTest = async () => {
    //     debugger;
    //
    //
    //     let key = 'Is_Active';
    //     // Message can be a string, buffer, array, etc.
    //
    //     let keyCiphertext = await this.sodium.crypto_secretbox(key, this.nonce, this.key);
    //     console.log(keyCiphertext);
    //     let decrypted = await sodium.crypto_secretbox_open(ciphertext, nonce, key);
    //     console.log(decrypted.toString('utf-8'));
    // }
    //
    becomeActive = async (value) => {


        localStorage.setItem('IS_ACTIVE' , value);
    }
    isAccountActivated = () => {


            return  localStorage.getItem('IS_ACTIVE');
        }


    /*
       * <summary> Purpose of the func is logout from  app </summary>
       * <returns> return promise  </returns>
     */
    logout = () => {
      return new Promise(resolve =>  {
            const token =  localStorage.getItem('miran-token');
            if(token) {
                localStorage.removeItem('miran-token');
                resolve();
            }
        })
    }



    /*
    * value must be one of: SAS or Trainer type
    */
   set Account_Type (value) {
       debugger;
        const values = ["SAS","Miran"];
        if(!values.includes(value))
            throw new Error("value must be SAS or Trainer");

        const _key = "Account_Type";
        localStorage.setItem(_key , value);
    }
    /*
    * return account_type from localstorage;
    */
    get Account_Type() {
        const _key = "Account_Type";
        return localStorage.getItem(_key);
    }


    /*
    * get trainees of current User (Trainer).
    */
    get trainees() {
        const _url = this._endPoint + "/trainer/students";
        return  HTTP_REQUEST.get({target:_url});
    }


    /*
    *  get Invitation Requests
    */
    get invitation() {
        const _url = `v1/${this._endPoint}/saas-invitation`;
        return HTTP_REQUEST.get({target:_url});
    }

     setinvitation(data) {
        const _url = `v1/${this._endPoint}/saas-invitation/`;
        return HTTP_REQUEST.post({target:_url , body: data})
    }

}


export default AccountService;