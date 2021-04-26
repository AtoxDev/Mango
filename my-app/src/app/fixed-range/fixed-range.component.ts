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
  fixed: any;

  constructor(private api: ConfigServiceService, private router: Router) {
    this.rangeValues = {
      'min' : 0,
      'max' : 0
    }
    this.fixed = 'fixed';
  }


  ngOnInit(): void {
    this.api.getFixedRange().subscribe(res => {
      if(res.status == 200) {
        this.rangeValues = res.body.rangeValues[0];
      }
    }, error => {
      console.log(error);
    });
  }

  public goToNormal() {
    this.router.navigate(['/exercise1']);
  }

  public onChangeRange(obj: any) {
    this.rangeValues.min = obj.min;
    this.rangeValues.max = obj.max;
  }
}
