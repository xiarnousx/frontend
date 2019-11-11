import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "../../auth/services/auth-http.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.token;
    const req = request.clone({
      url: environment.apiURL + "/" + request.url,
      headers: request.headers.set("Authorization", `Bearer ${token}`)
    });

    return next.handle(req);
  }
}
