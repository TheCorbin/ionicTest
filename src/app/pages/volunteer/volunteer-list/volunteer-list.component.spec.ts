import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {VolunteerListComponent} from './volunteer-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

describe('VolunteerListComponent', () => {
  let component: VolunteerListComponent;
  let fixture: ComponentFixture<VolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolunteerListComponent],
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

  it('should render a list of volunteers', () => {
    component.data = [{label: 'Joe', num: 10}, {label: 'Anne', num: 10}];
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('ion-card-content ion-item');
    expect(items?.length).toBe(3);
  });

});
