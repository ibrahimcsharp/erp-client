import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { KeyBoardService } from "../service/KeyBoard.service";

@Directive({
  selector: "[arrow-div]",
})
export class ArrowDivDirective {
  constructor(
    private keyboardService: KeyBoardService,
    public element: ElementRef,
    private render: Renderer2
  ) {
    this.render.setAttribute(this.element.nativeElement, "tabindex", "0");
  }

  @HostListener("keydown", ["$event"]) onKeyUp(e) {
    switch (e.keyCode) {
      case 38:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "UP",
        });
        break;
      case 37:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "LEFT",
        });
        break;
      case 40:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "DOWN",
        });
        break;
      case 39:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "RIGTH",
        });
        break;
      case 13:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "ENTER",
        });
        break;
      case 66:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "BACK",
        });
        break;
      case 27:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "ESC",
        });
        break;
      case 83:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "S",
        });
        break;
      case 17:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "CTRL",
        });
        break;
      case 107:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "+",
        });
        break;
      case 109:
        this.keyboardService.sendMessage({
          element: this.element,
          action: "-",
        });
        break;
    }
  }
}
