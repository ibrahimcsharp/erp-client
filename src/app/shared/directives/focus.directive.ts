import {
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appFocus]",
})
export class FocusDirective implements OnInit {
  @Input("appFocus") eventEmitter: EventEmitter<string>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.eventEmitter.subscribe((elementId) => {
      try {
        this.renderer.selectRootElement(elementId).focus();
      } catch (ex) {
        // If the element doesn't exist or if the element disappears when this called then no need to do anything
      }
    });
  }
}
