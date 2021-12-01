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

  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two volunteer lists', () => {
    const list = fixture.nativeElement.querySelectorAll('app-volunteer-list');
    expect(list.length).toBe(2);
  });

  describe('adding and removing volunteers', () => {

    it('should add a volunteer', () => {
      spyOn(component,'add');
      const inputs = fixture.nativeElement.querySelectorAll('app-volunteer-list ion-input');
      expect(inputs.length).toBe(2);
      const input = inputs[0];
      input.value = 'Anne';
      input.dispatchEvent(new Event('ionChange'));
      input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
      fixture.detectChanges();

      expect(component.add).toHaveBeenCalledWith(component.workshopList,'Anne');
    });

    it('should add a volunteer at the beginning of the list', () => {
      const inputs = fixture.nativeElement.querySelectorAll('app-volunteer-list ion-input');
      expect(inputs.length).toBe(2);
      const input = inputs[0];
      input.value = 'Anne';
      input.dispatchEvent(new Event('ionChange'));
      input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
      fixture.detectChanges();

      expect(component.workshopList[0].label).toBe('Anne');
    });

    it('should call remove method when delete icon is clicked', () => {
      spyOn(component,'remove');
      const removed = component.workshopList[0];
      const icon = fixture.nativeElement.querySelector('app-volunteer-list ion-icon');

      icon.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.remove).toHaveBeenCalledWith(component.workshopList,removed);
    });

    it('should remove first volunteer when delete icon is clicked', () => {
      const originalSize = component.workshopList.length;
      const second = component.workshopList[1];
      const icon = fixture.nativeElement.querySelector('app-volunteer-list ion-icon');

      icon.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.workshopList.length).toBe( originalSize - 1);
      expect(component.workshopList[0]).toBe(second);

    });
  });

  describe('performance', () => {
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

});
