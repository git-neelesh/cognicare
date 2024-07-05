import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return JSON.parse(JSON.stringify(localStorage.getItem('isLoggedIn'))) ?? false;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
