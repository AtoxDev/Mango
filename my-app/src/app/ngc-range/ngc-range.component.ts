import {Component, OnInit, Output, Input, EventEmitter, ElementRef, Inject, forwardRef, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/forms';
import {ConfigServiceService} from "../api/config-service.service";
declare var $ : any;

@Component({
  selector: 'ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgcRangeComponent),
      multi: true
    }
  ]
})

export class NgcRangeComponent implements ControlValueAccessor{

  @Output() rangeChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('min') min: any;
  @Input('max') max: any;
  @Input('type') type: any;
  @Input('values') values: any;
  public arraysRange: any = [];
  public rangeValues: any;
  public rango_min: any;
  public rango_max: any;
  public msg_err: any;
  public readonly_min: boolean;
  public show_err: boolean;
  public elRef: ElementRef;

  constructor(@Inject(ElementRef) elRef: ElementRef, private api: ConfigServiceService) {
    this.elRef = elRef;
    this.rango_min = 1;
    this.rango_max = 10000;
    this.show_err = false;
    this.readonly_min = true;
    this.rangeValues = {
      'min' : 0,
      'max' : 0
    }

    this.api.getRangeArray().subscribe(
      res => {
        res.body.arrayRange.forEach((myObject: number, index: number) => {
          this.arraysRange.push(myObject);
        });
      }, error => {
        console.log(error);
      });

  }

  sliderFixed(min: any, max: any) {
    let minTmp = 0;
    let maxTmp = 0;
    this.arraysRange.forEach((myObject: any, index: any) => {
      if(min === myObject) {
        minTmp = index;
      }
      if(max === myObject) {
        maxTmp = index;
      }
    });
    $(this.elRef.nativeElement).find(".slider").slider({
      range: true,
      min: 0,
      max: this.arraysRange.length - 1,
      values: [ minTmp, maxTmp ],
      slide: (event: any, ui: { values: any; }) => {
        if(ui.values[ 0 ] === ui.values[ 1 ]){
          return false;
        } else {
          this.show_err = false;
          this.rangeValues.min = this.arraysRange[ui.values[0]];
          this.rangeValues.max = this.arraysRange[ui.values[1]];
          this.rangeChange.emit(this.rangeValues);
          return true;
        }
      }
    });
  }

  sliderNormal(min: any, max: any) {
    $(this.elRef.nativeElement).find(".slider").slider({
      range: true,
      min: this.rango_min,
      max: this.rango_max,
      tooltips: true,
      values: [ min, max ],
      slide: (event: any, ui: { values: any; }) => {
        if(ui.values[ 0 ] + 150 >= ui.values[ 1 ]){
          return false;
        } else {
          this.show_err = false;
          this.rangeValues.min = ui.values[0];
          this.rangeValues.max = ui.values[1];
          this.rangeChange.emit(this.rangeValues);
          return  true;
        }
      }
    });
  }

  emitRange(val: any) {
    if(this.type !== 'fixed') {
      this.readonly_min = false;
      let min = this.rangeValues.min;
      let max = this.rangeValues.max;
      if(val.code.search('Digit') == 0 || val.code.search('Backspace') == 0 || val.code.search('Enter') == 0 ) {
        this.show_err = false;
        if(min > max) {
          this.msgs_errors(0);
        } else if( max > this.rango_max) {
          this.msgs_errors(1);
        } else if(min < this.rango_min) {
          this.msgs_errors(3);
        } else if(min == max || max == min) {
          this.msgs_errors(4);
        } else if(max < min) {
          this.msgs_errors(5);
        } else {
          this.sliderNormal(min, max);
        }
      } else {
        this.msgs_errors(1);
      }
    } else {
      this.readonly_min = true;
    }
  }

  msgs_errors(code: any) {
    this.show_err = true;
    switch (code) {
      case 0 :
        this.msg_err = 'El valor m??nimo no puede ser mayor que el valor m??ximo';
        break;
      case 1:
        this.msg_err = 'El valor m??ximo no puede superar el rango permitido ('+this.rango_max+')';
        break;
      case 2:
        this.msg_err = 'Los valores introducidos tienen que ser n??mero para mostrarse en el rango';
        break;
      case 3:
        this.msg_err = 'El valor m??nimo no puede ser inferior al rango m??nimo permitido ('+this.rango_min+')';
        break;
      case 4:
        this.msg_err = 'Los valores no pueden ser iguales';
        break;
      case 5:
        this.msg_err = 'El valor m??ximo no pueder menor que el valor m??nimo';
        break;
    }
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val: string){
    if( val !== undefined && this.rangeValues !== val && this.type !== 'fixed'){
      this.rangeValues = val;
      this.sliderNormal(this.rangeValues.min, this.rangeValues.max);
      this.rangeChange.emit(this.rangeValues);
      this.onChange(val);
      this.onTouch(val);
    } else {
      this.rangeValues = val;
      this.sliderFixed(this.rangeValues.min, this.rangeValues.max);
      this.rangeChange.emit(this.rangeValues);
      this.onChange(val);
      this.onTouch(val);
    }

  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

}


