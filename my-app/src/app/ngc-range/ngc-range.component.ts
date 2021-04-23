import {Component, OnInit, Output, Input, EventEmitter, ElementRef, Inject, forwardRef, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/forms';
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
  @Input('max') max: any
  public rangeValues: any
  public rango_min: any;
  public rango_max: any;
  public msg_err: any;
  public readonly_min: boolean;
  public show_err: boolean;
  public elRef: ElementRef;

  constructor(@Inject(ElementRef) elRef: ElementRef) {
    this.elRef = elRef;
    this.rango_min = 1;
    this.rango_max = 10000;
    this.show_err = false;
    this.readonly_min = true;
    this.rangeValues = {
      'min' : 0,
      'max' : 0
    };
  }

  slider(min: any, max: any) {
    $(this.elRef.nativeElement).find(".slider").slider({
      range: true,
      min: this.rango_min,
      max: this.rango_max,
      values: [ min, max ],
      slide: (event: any, ui: { values: any; }) => {
        if(ui.values[0] === ui.values[1]) {
          this.msgs_errors(4);
        } else {
          this.show_err = false;
          this.rangeValues.min = ui.values[0];
          this.rangeValues.max = ui.values[1];
          this.rangeChange.emit(this.rangeValues);
        }
      }
    });
  }

  emitRange(val: any) {
    const min = this.rangeValues.min;
    const max = this.rangeValues.max;
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
        this.slider(min, max);
      }
    } else {
      this.msgs_errors(1);
    }
  }

  msgs_errors(code: any) {
    this.show_err = true;
    switch (code) {
      case 0 :
        this.msg_err = 'El valor mínimo no puede ser mayor que el valor máximo';
        break;
      case 1:
        this.msg_err = 'El valor máximo no puede superar el rango permitido ('+this.rango_max+')';
        break;
      case 2:
        this.msg_err = 'Los valores introducidos tienen que ser número para mostrarse en el rango';
        break;
      case 3:
        this.msg_err = 'El valor mínimo no puede ser inferior al rango mínimo permitido ('+this.rango_min+')';
        break;
      case 4:
        this.msg_err = 'Los valores no pueden ser iguales';
        break;
      case 5:
        this.msg_err = 'El valor máximo no pueder menor que el valor mínimo';
        break;
    }
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val: string){
    if( val !== undefined && this.rangeValues !== val){
      this.rangeValues = val;
      this.slider(this.rangeValues.min, this.rangeValues.max);
      this.rangeChange.emit(this.rangeValues);
      this.onChange(val);
      this.onTouch(val);
    }

  }

  writeValue(value: any){
    if(value !== undefined || value !== null) {
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


