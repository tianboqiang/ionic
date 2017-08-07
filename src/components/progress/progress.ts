import { Component, ElementRef, Input, Renderer, ViewEncapsulation } from '@angular/core';
import { Ion } from '../ion';
import { Config } from '../../config/config';

export type progressIndicator = 'determinate' | 'indeterminate' | 'buffer' | 'query';

@Component({
  selector: 'ion-progress',
  template : `
    <div class="progress-bar" [style.width.%]="value"></div>
    <div class="progress-animatable"></div>
    <div class="progress-buffer-circles"></div>
    <div class="progress-buffer" [style.width.%]="buffer"></div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class Progress extends Ion {

  constructor(config: Config, public elementRef: ElementRef, public renderer: Renderer) {
    super(config, elementRef, renderer, 'progress');

    this.indicator = this._indicator;
   }

  /**
   * @input {'determinate' | 'indeterminate' | 'buffer' | 'query'} The current mode of the progress indicator
   */
  _indicator: progressIndicator = 'determinate';

  @Input()
  set indicator(val: progressIndicator) {
    if (this._indicator) {
      this.setElementClass(`progress-${this._indicator}`, false);
    }
    if (val) {
      this.setElementClass(`progress-${val}`, true);
      this._indicator = val;
    }
  }

  get indicator(): progressIndicator {
    return this._indicator;
  }


  /**
   * @input {number} The value of the progress indicator, as a percentage (out of 100)
   */
  @Input() value: number = 0;

  /**
   * @input {number} The current buffer value of the progress indicator
   */
  @Input() buffer: number = 100;

}
