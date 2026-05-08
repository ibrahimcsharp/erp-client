import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { RightSidebarComponent } from "./components/right-sidebar/right-sidebar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ArrowDivDirective } from "./directives/ArrowDiv.directive";
import { AutoFocusDirective } from "./directives/auto-focus.directive";
import { DebounceClickDirective } from "./directives/decounce-click-directive.directive";
import { FocusDirective } from "./directives/focus.directive";
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { ErrorCatchingInterceptor } from "./interceptors/error-catching.interceptor";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { AgePipe } from "./pipe/age.pipe";
import { AmountToWordPipe } from "./pipe/amount-to-word-pipe.pipe";
import { KeyBoardService } from "./service/KeyBoard.service";
import { NavService } from "./service/nav.service";
import { WINDOW_PROVIDERS } from "./service/windows.service";

@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    AmountToWordPipe,
    AgePipe,
    DebounceClickDirective,
    ArrowDivDirective,
    FocusDirective,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    InputTextModule,
    InputSwitchModule,
  ],
  providers: [
    NavService,
    WINDOW_PROVIDERS,
    KeyBoardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
  ],
  exports: [
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    InputTextModule,
    InputSwitchModule,
    AmountToWordPipe,
    DebounceClickDirective,
    FocusDirective,
    ArrowDivDirective,
    AutoFocusDirective,
  ],
})
export class SharedModule {}
