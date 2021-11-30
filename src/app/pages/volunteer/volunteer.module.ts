import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {VolunteerPageRoutingModule} from './volunteer-routing.module';
import {VolunteerPage} from './volunteer';
import {VolunteerListComponent} from './volunteer-list/volunteer-list.component';
import { CalculatePipe } from './calculate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerPageRoutingModule
  ],
  declarations: [VolunteerPage, VolunteerListComponent, CalculatePipe],
  bootstrap: [VolunteerPage],
})
export class VolunteerModule {}
