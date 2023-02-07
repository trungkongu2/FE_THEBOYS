import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../../shared/service/storage.service';
import {ToastrService} from 'ngx-toastr';
import { SellingService } from '../../shared/service/selling/selling.service';
import { AuthService } from '../../shared/service/auth/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide: boolean = true;

    formGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly sellingService: SellingService,
                private readonly storageService: StorageService,
                private readonly toastService: ToastrService,
                private readonly authService: AuthService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            void this.router.navigate(['/dashboard']);
            return;
        }
    }

    onLogin() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }


        let username = this.formGroup.value.username;

        let password = this.formGroup.value.password;
        console.log(username);
        console.log(password);

        const USER_ID = 'admin_theboys_id';

                const USER_FULLNAME = 'admin_theboys_fullname';

                window.localStorage.setItem(USER_ID, username);
                window.localStorage.setItem(USER_FULLNAME, password);
                this.router.navigate(['/selling']);

        // this.sellingService.login(username, password).subscribe({
        //     next: res =>{

        //         let fullname = res.firstName + ' ' + res.lastName;

        //         // this.storageService.saveUserSelling(res.id,fullname);

        //         const USER_ID = 'admin_theboys_id';

        //         const USER_FULLNAME = 'admin_theboys_fullname';

        //         window.localStorage.setItem(USER_ID, 'tesst_id');
        //         window.localStorage.setItem(USER_FULLNAME, 'tesst_fullname');

        //         this.router.navigate(['/selling'])
        //     },
        //     error: err =>{
        //         if (err.error.code == 'LOGIN_INVALID') {
        //                             this.toastService.error(err.error.message);
        //                             return;
        //                         }
        //                         this.toastService.error('Đăng nhập thất bại !');
        //     }
        // })
        

        // this.authService.login(this.formGroup.getRawValue().email, this.formGroup.getRawValue().password)
        //     .subscribe({
        //         next: (res) => {
        //             this.storageService.saveUserToken(res);
        //             console.log(this.storageService.getRoleFromToken())
        //             if(this.storageService.getRoleFromToken() === 'ROLE_ADMIN'){
        //                 this.router.navigate(['/selling'])
        //             }else{
        //                 this.router.navigate(['/dashboard'])
        //                     .then(() => this.authService.reloadPage())
        //             }
        //         },
        //         error: (err) => {
        //             if (err.error.code == 'LOGIN_INVALID') {
        //                 this.toastService.error(err.error.message);
        //                 return;
        //             }
        //             this.toastService.error('Đăng nhập thất bại !');
        //         }
        //     })
    }
}
