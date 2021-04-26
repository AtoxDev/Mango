import { Component, OnInit } from '@angular/core';
import {ConfigServiceService} from "../api/config-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-normal-range',
  templateUrl: './normal-range.component.html',
  styleUrls: ['./normal-range.component.css']
})
export class NormalRangeComponent implements OnInit {

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

  public goToFixed() {
    this.router.navigate(['/exercise2']);
  }

  public onChangeRange(obj: any) {
    this.rangeValues.min = obj.min;
    this.rangeValues.max = obj.max;
  }
}


