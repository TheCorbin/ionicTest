import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {VolunteerPage} from './volunteer';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {VolunteerPageRoutingModule} from './volunteer-routing.module';
import {VolunteerListComponent} from './volunteer-list/volunteer-list.component';
import {CalculatePipe} from './calculate.pipe';
import {VolunteerService} from './volunteer.service';


describe('VolunteerPage ', () => {
  let component: VolunteerPage;
  let fixture: ComponentFixture<VolunteerPage>;
  let volunteerService;

  beforeEach(waitForAsync(() => {
    volunteerService = jasmine.createSpyObj('VolunteerService', ['pureFunctionBusinessRule']);
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        VolunteerPageRoutingModule
      ],
      declarations: [VolunteerPage, VolunteerListComponent, CalculatePipe],
      providers: [{
        provide: VolunteerService, useValue: volunteerService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two volunteer lists', () => {
    const list = fixture.nativeElement.querySelectorAll('app-volunteer-list');
    expect(list.length).toBe(2);
  });

  it('should run pureFunctionBusinessRule no more than 200 times ', () => {
    expect(volunteerService.pureFunctionBusinessRule).toHaveBeenCalledTimes(200);
  });

  it('should not run pureFunctionBusinessRule in response to new Keyboard Events', () => {
    volunteerService.pureFunctionBusinessRule.calls.reset();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    fixture.detectChanges();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    fixture.detectChanges();
    expect(volunteerService.pureFunctionBusinessRule).toHaveBeenCalledTimes(0);
  });

});
