import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(private route: Router) { }

  isLoggedIn(): boolean {
    return JSON.parse(JSON.stringify(localStorage.getItem('isLoggedIn'))) ?? false;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.clear();
    this.route.navigate(['on-boarding']);
  }

  isPatient(): boolean {
    return localStorage.getItem('type') === 'patient';
  }
}
