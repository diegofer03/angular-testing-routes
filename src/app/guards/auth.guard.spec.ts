import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { fakeActivatedStateSnapshot, fakeParamMap, fakeRouterStateSnapshot, mockObservable } from '@testing';
import { generateOneUser } from '../models/user.model';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>
  let router: jasmine.SpyObj<Router>
  let authService: jasmine.SpyObj<AuthService>

  beforeEach(() => {
    const spyTokenService = jasmine.createSpyObj<TokenService>('TokenService', ['getToken'])
    const spyRouter = jasmine.createSpyObj<Router>('Router', (['navigate']))
    const spyAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['getUser'])
    TestBed.configureTestingModule({
      providers: [
        {provide: TokenService, useValue: spyTokenService},
        {provide: Router, useValue: spyRouter},
        {provide: AuthService, useValue: spyAuthService}
      ]
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true with session', (doneFn) => {
    const activatedRoute = fakeActivatedStateSnapshot({
      paramMap: fakeParamMap({
        idProduct: '1212'
      })
    })
    const routerState = fakeRouterStateSnapshot({})

    const userMock = generateOneUser()
    authService.getUser.and.returnValue(mockObservable(userMock))

    guard.canActivate(activatedRoute, routerState).subscribe(
      data => {
        expect(data).toBeTruthy()
        doneFn()
      }
    )
  })

  it('should return false with session', (doneFn) => {
    const activatedRoute = fakeActivatedStateSnapshot({
      paramMap: fakeParamMap({
        idProduct: '1212'
      })
    })
    const routerState = fakeRouterStateSnapshot({})

    authService.getUser.and.returnValue(mockObservable(null))

    guard.canActivate(activatedRoute, routerState).subscribe(
      (data) => {
        expect(data).toBeFalsy()
        doneFn()
      }
    )
  })
});
