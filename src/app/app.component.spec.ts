import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {SwUpdate} from '@angular/service-worker';
import {TestBed } from '@angular/core/testing';

import {MenuController, Platform} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage-angular';
import {AppComponent} from './app.component';
import {UserData} from './providers/user-data';


describe('AppComponent', () => {
  let menuSpy;
  let routerSpy;
  let userDataSpy;
  let statusBarSpy;
  let splashScreenSpy;
  let swUpdateSpy;
  let platformReadySpy;
  let platformSpy;
  let app;
  let fixture;

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MenuController, useValue: menuSpy},
        {provide: Router, useValue: routerSpy},
        {provide: UserData, useValue: userDataSpy},
        {provide: SwUpdate, useValue: swUpdateSpy},
        {provide: Platform, useValue: platformSpy}
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });
});
