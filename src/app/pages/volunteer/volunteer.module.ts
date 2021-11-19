import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {VolunteerPageRoutingModule} from './volunteer-routing.module';
import {VolunteerPage} from './volunteer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerPageRoutingModule
  ],
  declarations: [VolunteerPage, ],
  bootstrap: [VolunteerPage],
})
export class VolunteerModule {}
