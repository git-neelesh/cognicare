import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  patient: any;
  colors = ['#7676ab', '#059ab4', '#f03d81', '#064167', '#7b8b49', '#0aade4', '#008d99', '#925fb1', '#445269']
  backgroundColor = '#7676ab';

  constructor(private route: Router) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.patient = navigation.extras.state['patient'];
    }
   }

  ngOnInit() {
    this.setBackgroundColor();
  }

  setBackgroundColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.backgroundColor = this.colors[randomIndex];
  }


  backToDashboard(){
    this.route.navigate(['/dashboard']);
  }
}
