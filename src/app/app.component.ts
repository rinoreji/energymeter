import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

const telescopicRates: [number, number][] = [
  [50, 3.15],
  [100, 3.70],
  [150, 4.80],
  [200, 6.40],
  [250, 7.60],
];

const nonTelescopicRates: [number, number][] = [
  [300, 5.80],
  [350, 6.80],
  [400, 6.90],
  [500, 7.10],
  [-1, 7.50],
];

const fixedCharges: [number, number][] = [
  [50, 90],
  [100, 90],
  [150, 100],
  [200, 100],
  [250, 100],
  [300, 110],
  [350, 110],
  [400, 120],
  [500, 130],
  [-1, 150],
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Energy meter';
  formGrp: FormGroup;

  cost = 0;
  fixed = 0;
  slab = '';
  total = 0;

  constructor() {
    this.initForm();
  }

  private initForm() {
    this.formGrp = new FormGroup({
      units: new FormControl('')
    });
    this.formGrp.get('units').valueChanges.subscribe(v => {
      //console.log('Cost:', this.getNonTelescopicRate(v), 'fixed', this.getFixedCharges(v));
      this.calculate(v);
    });
  }

  private calculate(units: number): void {
    this.slab = '';
    this.cost = 0.0;
    this.total = 0.0;
    this.fixed = 0.0;

    this.slab = this.isTelescopic(units) ? 'Telescopic slab' : 'Non telescopic';
    if (!this.isTelescopic(units)) {
      this.cost = this.getNonTelescopicRate(units);
      this.fixed = this.getFixedCharges(units);
      this.total = this.cost + this.total;
    }
  }

  private isTelescopic(totalUnits: number): boolean {
    const lastSlab = telescopicRates[telescopicRates.length - 1];
    return totalUnits <= lastSlab[0];
  }

  private getNonTelescopicRate(units: number): number {
    const slab = nonTelescopicRates.find(s => s[0] >= units && s[0] !== -1);
    if (slab) {
      return slab[1] * units;
    }
    return nonTelescopicRates[nonTelescopicRates.length - 1][1] * units;
  }

  private getFixedCharges(units: number): number {
    const slab = fixedCharges.find(s => s[0] >= units && s[0] !== -1);
    if (slab) {
      return slab[1];
    }
    return fixedCharges[fixedCharges.length - 1][1];
  }
}
