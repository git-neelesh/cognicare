import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AnimationController, IonModal, Platform } from '@ionic/angular';
import { randJobArea, randSuperheroName, randTextRange } from '@ngneat/falso';
import { demoList } from '../../models/demo-list';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

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
  textRange20 = randTextRange({ min: 10, max: 20, length: 10 })
  textRange100 = randTextRange({ min: 10, max: 100, length: 10 })
  title = randSuperheroName()
  courses = demoList;
  randJobArea = randJobArea()
  constructor(
    public platform: Platform,
    private animationCtrl: AnimationController,
    private route: Router,
    public authService:AuthService
  ) {
  // this.textRange = randTextRange
  // this.title = randSuperheroName
if (this.authService.isLoggedIn()) {
      this.route.navigateByUrl('/dashboard')

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
    }, 800);
  }

  onCloseOnBoarding() {
    this.closeOnBoardingEvent.emit();
  }

  onSignInClose() {
    this.signInModal?.dismiss();
    if (localStorage.getItem('type') === 'patient') {
    this.route.navigateByUrl('/patient-dashboard')
    } else if (localStorage.getItem('type') === 'family') {
    this.route.navigateByUrl('/family-dashboard')
    }  else {
    this.route.navigateByUrl('/dashboard')

    }
    setTimeout(() => {
    //location.reload()
    }, 50);
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const containerEl = this.containerRef?.nativeElement;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0.5', transform: 'translateY(-100vh)' },
        { offset: 1, opacity: '1', transform: 'translateY(0vh)' },
      ]);

    const onBoardingContent = this.animationCtrl
      .create()
      .addElement(containerEl!)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(-50px)' },
      ]);
    const closeBtnAnim = this.animationCtrl
      .create()
      .addElement(this.closeBtnRef?.nativeElement!)
      .fromTo('transform', 'translateY(0)', 'translateY(-150px)');

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-in-out')
      .duration(500)
      .addAnimation([
        backdropAnimation,
        wrapperAnimation,
        onBoardingContent,
        closeBtnAnim,
      ]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
