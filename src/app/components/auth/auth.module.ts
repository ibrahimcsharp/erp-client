import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";
import { AuthService } from "src/app/shared/service/auth.service";
import { TokenService } from "src/app/shared/service/token.service";
import { SharedModule } from "../../shared/shared.module";
import { MerchandisingModule } from "../merchandising/merchandising.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LogOutComponent } from "./log-out/log-out.component";
import { LoginComponent } from "./login/login.component";
import { SigninFromSaraComponent } from "./signin-from-sara/signin-from-sara.component";
import { SingleLoginComponent } from "./single-login/single-login.component";
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { SingleLoginEternallyComponent } from './single-login-eternally/single-login-eternally.component';

@NgModule({
  declarations: [
    LoginComponent,
    SingleLoginComponent,
    LogOutComponent,
    SigninFromSaraComponent,
    UnauthorizedComponent,
    SingleLoginEternallyComponent,
  ],
  imports: [
    AuthRoutingModule,
    NgbModule,
    CarouselModule,
    SharedModule,
    MerchandisingModule,
  ],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
