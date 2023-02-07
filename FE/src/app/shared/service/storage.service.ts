import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const USER_TOKEN = 'admin-token';

const USER_ID = 'admin_theboys_id';

const USER_FULLNAME = 'admin_theboys_fullname';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private jwtHelper = new JwtHelperService();

    constructor() {
    }

    public saveUserSelling(id: any, fullname: any) {
        window.localStorage.removeItem(USER_ID);
        window.localStorage.setItem(USER_TOKEN, id);
        window.localStorage.removeItem(USER_FULLNAME);
        window.localStorage.setItem(USER_TOKEN, fullname);
    }

    public getUserFullName(){
        return window.localStorage.getItem(USER_FULLNAME);
    }

    public getUserID(){
        const user_id = window.localStorage.getItem(USER_ID);
        // console.log(user_id);

        // console.log(window.localStorage.getItem(USER_ID));
        
        return user_id;
    }

    public isLogged() :boolean{
        const authToken = this.getUserID();
        console.log(authToken !== null);
        
        return authToken !== null;
    }

    logout() {
        window.localStorage.removeItem(USER_FULLNAME);
        window.localStorage.removeItem(USER_ID);
    }

    /**Xoá token cũ ở Local Storage và lưu token mới*/
    public saveUserToken(userToken: any) {
        window.localStorage.removeItem(USER_TOKEN);
        window.localStorage.setItem(USER_TOKEN, JSON.stringify(userToken));
    }

    /**Lấy token ở local storage*/
    public getUserToken() {
        const userToken = window.localStorage.getItem(USER_TOKEN);
        if (userToken) {
            return JSON.parse(userToken);
        }
        return {};
    }

    /**Check user đã đăng nhập */
    public isLoggedIn() :boolean{
        const authToken = this.getUserToken();
        return authToken !== undefined && authToken?.token !== undefined;
    }

    /**Lấy token*/
    getToken() {
        const authToken = this.getUserToken();
        return authToken !== null && authToken?.token !== null ? authToken?.token : null;
    }

    /**Xoá token*/
    clearToken() {
        window.localStorage.removeItem(USER_TOKEN);
    }

    clean() {
        window.localStorage.clear();
    }

    reloadPage() {
        window.location.reload();
    }

    /**Decode token ở storage*/
    decode() {
        try {
            const decode = this.jwtHelper.decodeToken(this.getToken());
            return decode !== null ? decode : null;
        } catch (e) {
            this.clearToken();
            this.reloadPage();
        }
    }

    /**Decode và lấy id của người dùng ở local storage */
    getIdFromToken() {
        const decode = this.decode();
        return decode !== null && decode?.role !== null ? decode?.id : null;
    }

    getRoleFromToken() {
        const decode = this.decode();
        return decode !== null && decode?.role !== null ? decode?.role : null;
    }

    getFullNameFromToken() {
        const decode = this.decode();
        return decode !== null && decode?.role !== null ? decode?.fullname : null;
    }

    /**Decode và lấy thời gian hết hạn của token  ở local storage */
    getExpiration() {
        return this.jwtHelper.isTokenExpired(this.getToken());
    }

}
