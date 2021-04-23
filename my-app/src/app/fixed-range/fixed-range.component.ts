import { Component, OnInit } from '@angular/core';
import {ConfigServiceService} from "../api/config-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fixed-range',
  templateUrl: './fixed-range.component.html',
  styleUrls: ['./fixed-range.component.css']
})
export class FixedRangeComponent implements OnInit {
  public rangeValues: any;

  constructor(private api: ConfigServiceService, private router: Router) {
    this.rangeValues = {
      'min' : 0,
      'max' : 0
    }
  }


  ngOnInit(): void {
    this.api.getNormalRange().subscribe(res => {
      if(res.status == 200) {
        this.rangeValues = res.body;
      }
    }, error => {
      console.log(error);
    });
  }

  public redirectTo(uri: any) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  public goToNormal() {
    this.redirectTo('exercise1');
  }

  public goToFixed() {
    this.redirectTo('exercise2');
  }

  public onChangeRange(obj: any) {
    this.rangeValues.min = obj.min;
    this.rangeValues.max = obj.max;
  }
}