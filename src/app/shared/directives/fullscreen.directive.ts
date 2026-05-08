import { Directive, HostListener } from '@angular/core';

import { Screenfull } from 'screenfull';
import * as screenfull from 'screenfull';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[toggleFullscreen]'
})
export class ToggleFullscreenDirective {
  public screenfull: Screenfull;
  @HostListener('click') onClick() {
    if ((screenfull as Screenfull).isEnabled) {
      (screenfull as Screenfull).toggle();
    }
  }
}
