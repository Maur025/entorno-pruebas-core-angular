import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       /*  const currentUser = this.authenticationService.currentUserValue();
        if (currentUser && currentUser.authorisation && currentUser.authorisation.token) { */
            request = request.clone({
                setHeaders: {
                 /*  Authorization: `Bearer ${currentUser.authorisation.token}`,
                  session: currentUser.authorisation.session, */
                //  'Content-Type':  'application/json',
               //   'Access-Control-Allow-Headers': 'Content-Type',
              //    'Access-Control-Allow-Methods': 'GET',

                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                }
            });
            console.log("request",request);
        /* } */
        return next.handle(request);
    }
}
