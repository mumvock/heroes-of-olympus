import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchModule } from './components/search/search.module';

import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        SearchModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [HeaderComponent],
})
export class HeaderModule {}
