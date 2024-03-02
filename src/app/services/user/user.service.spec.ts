import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from '../token/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';

describe('UserService', () => {
  let service: UserService;
  let tokenService: TokenService
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });
    service = TestBed.inject(UserService);
    tokenService = TestBed.inject(TokenService)
    httpController = TestBed.inject(HttpTestingController)

    spyOn(tokenService, 'getToken').and.returnValue('123')
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
