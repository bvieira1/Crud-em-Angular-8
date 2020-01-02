import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  ngOnInit() {

  }

  authenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router)  {
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}


