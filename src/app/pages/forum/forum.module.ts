import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';

@NgModule({
    declarations: [ForumComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ForumRoutingModule,
        ScrollingModule,
        MatStepperModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [

    ]
})
export class ForumModule {}
