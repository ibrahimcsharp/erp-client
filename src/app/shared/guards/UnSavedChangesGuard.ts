import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

export interface CanComponantLeave {
  canLeave: () => boolean;
}
@Injectable({
  providedIn: "root",
})
export class UnSavedChangesGuard implements CanDeactivate<CanComponantLeave> {
  canDeactivate(component: CanComponantLeave) {
    if (component.canLeave) {
      return component.canLeave();
    }
    return true;
  }
}
