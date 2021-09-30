import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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
