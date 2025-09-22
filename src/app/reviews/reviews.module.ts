// reviews.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ✅ Make sure these are all imported
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewsService } from './reviews.service';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewAgentComponent } from './review-agent/review-agent.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  
  declarations: [ReviewFormComponent,ReviewListComponent, ReviewAgentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ✅ Add all required Angular Material modules here
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
//   exports: [ReviewFormComponent,ReviewListComponent],
    providers: [
    ReviewsService // ✅ Add the service to the providers array
  ],
  exports: [
    // Export components so AppModule can use them in its template
    ReviewFormComponent,
    ReviewListComponent,
    ReviewAgentComponent
  ]
})
export class ReviewsModule {}