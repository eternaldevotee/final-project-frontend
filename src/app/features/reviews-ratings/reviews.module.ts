
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ReviewFormComponent } from './review-form/review-form.component';

import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewAgentComponent } from './review-agent/review-agent.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ReviewAdminComponent } from './review-admin/review-admin.component';
import { ReviewsService } from '../../core/services/reviews/reviews.service';



@NgModule({

  declarations: [ReviewFormComponent, ReviewListComponent, ReviewAgentComponent, ReviewAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [
    ReviewsService
  ],
  exports: [
    ReviewFormComponent,
    ReviewListComponent,
    ReviewAgentComponent,
    ReviewAdminComponent,
  ]
})
export class ReviewsModule { }