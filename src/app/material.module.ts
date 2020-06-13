import {NgModule} from '@angular/core';

import {
    MatToolbarModule,
    MatInputModule
  } from '@angular/material';

@NgModule({
  imports: [
    // MatSidenavModule,
    MatToolbarModule,
    // MatIconModule,
    // MatListModule,
    MatInputModule
  ],
  exports: [
    // MatSidenavModule,
    MatToolbarModule,
    // MatIconModule,
    // MatListModule,
    MatInputModule
  ]
})
export class MaterialModule {}