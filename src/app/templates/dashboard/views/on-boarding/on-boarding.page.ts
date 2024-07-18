import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { randJobArea, randSuperheroName, randTextRange } from '@ngneat/falso';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { demoList } from '../../models/onboarding-demo-list';

@Component({
  selector: 'cr-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild(IonModal) signInModal?: IonModal;
  @ViewChild('container', { read: ElementRef }) containerRef?: ElementRef;
  @ViewChild('closeBtn', { read: ElementRef }) closeBtnRef?: ElementRef;

  @Output() closeOnBoardingEvent = new EventEmitter();

  buttonToggle = true;
  showRiveAsset = false;
  textRange20 = randTextRange({ min: 10, max: 30, length: 10 })
  textRange100 = randTextRange({ min: 10, max: 30, length: 10 })
  title = randSuperheroName()
  courses = demoList;
  randJobArea = randJobArea()
  splashScreen: boolean = true
  img = 'assets/logo.jpeg'
  constructor(
    public platform: Platform,
    private route: Router,
    public authService: AuthService
  ) {
    setTimeout(() => {
      this.splashScreen = false
    }, 2000);
    if (this.authService.isLoggedIn()) {

      if (localStorage.getItem('type') === 'patient') {
        this.route.navigateByUrl('/patient-dashboard')
      } else if (localStorage.getItem('type') === 'family') {
        this.route.navigateByUrl('/family-dashboard')
      } else {
        this.route.navigateByUrl('/dashboard')

      }

    }

  }

  ngOnInit() {
    // Temporary solution to fix the rive asset loading issue causing "Binding Error",
    // which fails for most if rendered together, so This will load them all with a delay,
    setTimeout(() => (this.showRiveAsset = true), 1000);
  }

  startCoursePressed() {
    this.buttonToggle = !this.buttonToggle;
    setTimeout(() => {
      this.signInModal?.present();
    }, 200);
  }

  onCloseOnBoarding() {
    this.closeOnBoardingEvent.emit();
  }

  onSignInClose() {
    this.signInModal?.dismiss();
    console.log(localStorage.getItem('type'), localStorage.getItem('type') === 'patient')
    if (localStorage.getItem('type') === 'patient') {
      this.route.navigateByUrl('/patient-dashboard')
    } else if (localStorage.getItem('type') === 'family') {
      this.route.navigateByUrl('/family-dashboard')
    } else {
      this.route.navigateByUrl('/dashboard')

    }
    setTimeout(() => {
      //location.reload()
    }, 50);
  }

}
