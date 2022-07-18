import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFromGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email o Contraseña errónea'

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private localStorageService: LocalstorageService,
              private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm()
  }

  private _initLoginForm(){
    this.loginFromGroup = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginFromGroup.invalid){
      return;
    }

    this.authService.login( this.loginForm.email.value, this.loginForm.password.value).subscribe(user =>{
      this.authError = false;
      this.localStorageService.setToken(user.token)
      this.router.navigate(['/'])
    },(error: HttpErrorResponse)=>{
      console.log(error);
      this.authError = true;
      if(error.status !==400){
        this.authMessage="Error en el servidor, por favor intenta más tarde"
      }
    })
  }

  get loginForm(){
    return this.loginFromGroup.controls
  }
}
