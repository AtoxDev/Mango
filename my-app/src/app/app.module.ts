import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { NgcRangeComponent } from './ngc-range/ngc-range.component';
import { NormalRangeComponent } from './normal-range/normal-range.component';
import {HttpClientModule} from "@angular/common/http";
import {ConfigServiceService} from "./api/config-service.service";
import { FixedRangeComponent } from './fixed-range/fixed-range.component';


@NgModule({
  declarations: [
    AppComponent,
    NgcRangeComponent,
    NormalRangeComponent,
    FixedRangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ConfigServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
