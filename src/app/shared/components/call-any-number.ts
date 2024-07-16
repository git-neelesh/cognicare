import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-call-any-number',
    templateUrl: './call-any-number.html',
    styleUrls: ['./call-any-number.scss'],
  })
export class CallAnyNumber {
    @Input() number: string = '';
    constructor() {}
}