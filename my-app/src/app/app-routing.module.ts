import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NormalRangeComponent} from "./normal-range/normal-range.component";
import {FixedRangeComponent} from "./fixed-range/fixed-range.component";

const routes: Routes = [
  { path: '', redirectTo: 'exercise1', pathMatch: 'full' },
  { path: 'exercise1', component: NormalRangeComponent},
  { path: 'exercise2', component: FixedRangeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
