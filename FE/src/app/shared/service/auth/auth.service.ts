import {Injectable} from '@angular/core';
import {AuthApiService} from './auth-api.service';
import {Observable} from 'rxjs';
import {StorageService} from '../storage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private readonly authService: AuthApiService,
                private readonly storageService: StorageService,
                private readonly router: Router
                ) {
    }

    login(email: string, password: string): Observable<any> {
        return this.authService.login(email, password);
    }

    logout() {
        this.storageService.logout();
        // this.router.navigate(['/login']);
        this.reloadPage();
    }

    reloadPage() {
        window.location.reload();
    }

}
