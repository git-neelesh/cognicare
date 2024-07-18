import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { randAddress, randEmail, randFullAddress, randPassword, randTextRange } from '@ngneat/falso';
import { RiveSMInput } from 'ng-rive';
import { LangService } from 'src/app/lang.service';

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
  textRange: any
  lang: string = 'English'
  translateData: any


  constructor(private route: Router,private langService: LangService) {
    this.langService.makeRequest([{
      "text": "Sign in"
    }, {
      "text": "Navigating Dementia Together"
    }, {
      "text": "Email"
    }, {
      "text": "Password"
    },{
      "text": "Caretaker"
    },{
      "text": "Patient"
    },{
      "text": "Sign In"
    },{
      "text": "Sign up with Email, Apple or Google"
    }], localStorage.getItem('lang'), this.translateData).then((data: any) => {
      this.translateData = JSON.parse(data)
    })
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
      }, 200);
  }

  onSignInClose() {
    this.onClose.emit();
  }
  triggerLangEvent(){
    localStorage.setItem('lang', this.lang)
  }
}
