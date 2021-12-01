import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {VolunteerListComponent} from './volunteer-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CalculatePipe} from "../calculate.pipe";

describe('VolunteerListComponent', () => {
  let component: VolunteerListComponent;
  let fixture: ComponentFixture<VolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolunteerListComponent, CalculatePipe],
      imports: [IonicModule.forRoot(),
        CommonModule,
        FormsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerListComponent);
    component = fixture.componentInstance;
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

  describe('volunteer input', () => {
    let fnAdd;
    beforeEach(() => {
      component.data = [{label: 'Joe', num: 10}];
      fixture.detectChanges();
    });

    it('should have an input', () => {
      const items = fixture.nativeElement.querySelectorAll('ion-card-content ion-item ion-input');
      expect(items?.length).toBe(1);
    });

    it('should dispatch add event when enter key is pressed', () => {
      const input = fixture.nativeElement.querySelector('ion-card-content ion-item ion-input');
      spyOn(component.add, 'emit');
      input.value = 'Anne';
      input.dispatchEvent(new Event('ionChange'));
      input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
      fixture.detectChanges();

      expect(component.add.emit).toHaveBeenCalledWith('Anne');
    });

    it('should not dispatch add event when enter key is pressed with empty input', () => {
      const input = fixture.nativeElement.querySelector('ion-card-content ion-item ion-input');
      spyOn(component.add, 'emit');
      input.value = '';
      input.dispatchEvent(new Event('ionChange'));
      input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
      fixture.detectChanges();
      expect(component.add.emit).not.toHaveBeenCalled();
    });

    it('should dispatch add event when button is pressed', () => {
      const input = fixture.nativeElement.querySelector('ion-card-content ion-item ion-input');
      spyOn(component.add, 'emit');
      input.value = 'Anne';
      input.dispatchEvent(new Event('ionChange'));
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('ion-card-content ion-item ion-button');
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.add.emit).toHaveBeenCalledWith('Anne');
    });

    it('should not dispatch add event when button is clicked with empty input', () => {
      const input = fixture.nativeElement.querySelector('ion-card-content ion-item ion-input');
      spyOn(component.add, 'emit');
      input.value = '';
      input.dispatchEvent(new Event('ionChange'));
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('ion-card-content ion-item ion-button');
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.add.emit).not.toHaveBeenCalled();
    });
  });

  describe('volunteer list', () => {
    beforeEach(() => {
      component.data = [{label: 'Joe', num: 10}, {label: 'Anne', num: 10}];
      fixture.detectChanges();
    });

    it('should render a list of volunteers', () => {
      const items = fixture.nativeElement.querySelectorAll('ion-card-content ion-item');
      expect(items?.length).toBe(3);
    });

    it('should have a "remove" icon', () => {
      const items = fixture.nativeElement.querySelectorAll('ion-card-content ion-item ion-icon');
      expect(items?.length).toBe(2);

      const icon = items[0];
      expect(icon.getAttribute('name')).toBe('trash');
    });

    it('should have an icon in the correct item spot', () => {
      const items = fixture.nativeElement.querySelectorAll('ion-card-content ion-item ion-icon');
      expect(items?.length).toBe(2);

      const icon = items[0];
      expect(icon.getAttribute('slot')).toBe('end');
    });

    it('should dispatch remove event when icon is clicked', () => {
      spyOn(component.remove, 'emit');
      const items = fixture.nativeElement.querySelectorAll('ion-card-content ion-item ion-icon');
      expect(items?.length).toBe(2);
      const icon = items[0];

      icon.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(component.remove.emit).toHaveBeenCalledWith(component.data[0]);
    });
  });

});
