import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { randAddress, randEmail, randFullAddress, randPassword, randTextRange } from '@ngneat/falso';
import { RiveSMInput } from 'ng-rive';

@Component({
  selector: 'cr-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  email = randEmail();
  password = randPassword();
  address = randFullAddress();
  type='patient'
  isLoading = false;

  constructor(private route: Router) {
  }

  ngOnInit() {}

  signIn(
    success: RiveSMInput,
    failure: RiveSMInput,
    reset: RiveSMInput,
    confetti: RiveSMInput
  ) {
    this.isLoading = true;
    const isValid = this.email.trim() !== '' && this.password.trim() !== '';

    // setTimeout(() => {
    //   if (isValid) {
    //     success?.fire()
    //     localStorage.setItem('isLoggedIn', JSON.stringify(true))
    //     localStorage.setItem('type', this.type)

    //   } else {
    //     failure?.fire()
    //   }
    // }, 1000);

    // setTimeout(() => {
    //   this.isLoading = false;
    //   reset?.fire();
    //   isValid && confetti?.fire();
    // }, 3000);

    isValid &&
        success?.fire()
        confetti?.fire();
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        localStorage.setItem('type', this.type)
        this.onSignInClose();
        this.email = '';
        this.password = '';
        this.type = '';
        this.address = '';
      }, 3000);
  }

  onSignInClose() {
    this.onClose.emit();
  }
}
