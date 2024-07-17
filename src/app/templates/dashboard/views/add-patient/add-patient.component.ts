import { Component, OnInit } from '@angular/core';
import { demoList } from '../../models/demo-list';
import { randHex, randUser,randProductDescription, randSoonDate  } from '@ngneat/falso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  constructor(private route: Router) {
    console.log(randUser({length:10}), randHex({length:10}))
  }

  ngOnInit() {}

  user = {
    firstname: 'John',
    lastname: 'Smith',
    mobile: '+1(876)778 6987'
  };

  submitForm() {
    console.log('Form submitted with:', this.user);
  }
  gotoDashboard(){
    this.route.navigate(['/']);
  }
}
