import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Energy meter';
  formGrp: FormGroup;

  cost$: Observable<any>;

  constructor() {
    this.initForm();
  }

  private initForm() {
    this.formGrp = new FormGroup({
      units: new FormControl('')
    });
    this.cost$ = this.formGrp.get('units').valueChanges;
    this.formGrp.get('units').valueChanges.subscribe(v=> {
      console.log(v);
    });
  }
}
