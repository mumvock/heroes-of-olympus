import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    public form!: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            search: [null, [Validators.required, Validators.min(3)]],
        });
    }

    public submit(): void {

        if (this.form.invalid) {
            return;
        }

        // ** Efetuar pesquisa.
    }
}
