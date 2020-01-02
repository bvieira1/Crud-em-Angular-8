import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  })

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
  }

  onSubmit() {
    const crendentials = this.loginForm.value;
    this.loading = true;
    this.authService.login(crendentials)
      .subscribe(
        (user) => {
          console.log(user);
          this.snackBar.open(
            'Logged in successfuly. Welcome ' + user.name + '!', 'OK',
            {duration: 2000});
          this.router.navigateByUrl('/header');
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.snackBar.open(
            'Login Error', 'OK', {duration: 2000});
            this.loading = false;
        }
      )
  }
}
