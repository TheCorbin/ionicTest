import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from '../app/app.component';
import {IonicStorageModule} from '@ionic/storage-angular';
import {MenuController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {UserData} from '../app/providers/user-data';
import {SwUpdate} from '@angular/service-worker';

describe('verify_pack.AppComponent [Verify]', () => {
  let menuSpy;
  let routerSpy;
  let userDataSpy;
  let statusBarSpy;
  let splashScreenSpy;
  let swUpdateSpy;
  let platformReadySpy;
  let platformSpy;

  beforeEach(() => {
    menuSpy = jasmine.createSpyObj('MenuController', ['toggle', 'enable']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    userDataSpy = jasmine.createSpyObj('UserData', ['isLoggedIn', 'logout']);
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    swUpdateSpy = jasmine.createSpyObj('SwUpdate', ['available', 'activateUpdate']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicStorageModule.forRoot()],
      providers: [
        {provide: MenuController, useValue: menuSpy},
        {provide: Router, useValue: routerSpy},
        {provide: UserData, useValue: userDataSpy},
        {provide: SwUpdate, useValue: swUpdateSpy},
        {provide: Platform, useValue: platformSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app verify_pack.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!

});
