import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    'name': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]]
  }, { validator: this.matchingPassword});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  matchingPassword(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if (password1 == password2) {
        return null;
      }
    }
    return {matching: false}
  }

  onSubmit() {
    console.log(this.formRegister.value);
    let u: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1};
    this.authService.register(u)
      .subscribe(
        (u) => {
          this.snackBar.open(
            'Successfuly registered. Use your credentials to sing in',
            'OK', {duration: 2000});
          this.router.navigateByUrl('/login');
        },
        (err) => {
          console.error(err);
          this.snackBar.open(err.error.message,'OK', {duration: 2000});
        }
      )
  }

}
