import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';

@NgModule({
    declarations: [ForumComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ForumRoutingModule,
        MatStepperModule,
        MatIconModule,
        ScrollingModule,
    ],
    providers: [

    ]
})
export class ForumModule {}
