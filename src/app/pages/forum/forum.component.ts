import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { BaseComponent } from './../../core/abstracts/base-component';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss'],
})
export class ForumComponent extends BaseComponent implements OnInit {

    @ViewChild('main')
    private mainRef!: ElementRef<HTMLElement>;

    public assetsUrl = environment.assetsUrl;
    public form = new FormControl(null, Validators.required);
    public selectedIndex = 0;
    public forums = [
        {
            name: 'Bem-vindo(a)',
        },
        {
            name: 'Domínio dos Deuses',
            backgroundImage: 'gods.webp',
            subForums: [
                {
                    name: 'Sala dos Doze Tronos',
                    description: 'A principal sala de reuniões do Olimpo, onde ocorre o Conselho Olimpiano.',
                },
                {
                    name: 'Sala dos Deuses',
                    description: 'Fique sempre atentos Olimpianos e Menores. Esta sala contém informações, questionamentos, atualizações e regras importantes para todos os Deuses.',
                },
                {
                    name: 'Sala dos Deuses',
                    description: 'Fique sempre atentos Olimpianos e Menores. Esta sala contém informações, questionamentos, atualizações e regras importantes para todos os Deuses.',
                },
                {
                    name: 'Sala dos Deuses',
                    description: 'Fique sempre atentos Olimpianos e Menores. Esta sala contém informações, questionamentos, atualizações e regras importantes para todos os Deuses.',
                },
            ],
        },
        {
            name: 'O Mural Divino',
            backgroundImage: 'libray.jpg',
        },
        {
            name: 'Arenas',
            backgroundImage: 'arena.jpg',
        },
        {
            name: 'Acampamentos',
            backgroundImage: 'camp.webp',
        },
    ];

    constructor(
        private readonly scrollDispatcher: ScrollDispatcher,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.listenScroll();
        this.synchronizeStepperWithScroll();
    }

    /** Escuta 'scrolladas', impede o comportamento padrão e chama {@link handleScrollables}. */
    private listenScroll(): void {

        // Listener para botão 3 do mouse (scroll)
        document.body.addEventListener('wheel', (event: WheelEvent) => {
            event.preventDefault();
            this.handleScrollables((event.deltaY < 0), this.mainRef);
        }, { passive: false });

        // Listener para teclado (up/down/pageUp/pageDown)
        document.body.addEventListener('keydown', (event: KeyboardEvent) => {
            const keys: { [key: string]: boolean } = {
                ArrowUp: true,
                PageUp: true,
                ArrowDown: false,
                PageDown: false,
            }

            const isScrollingUp = keys[event.key];

            if (isScrollingUp !== undefined) {
                event.preventDefault();
                this.handleScrollables(isScrollingUp, this.mainRef);
            }
        });
    }

    /**
     * Trata as tentativas de scrollar a página via mouse/teclado.
     *
     * De acordo com a direção da 'scrollada' (baixo ou cima),
     * define qual será a próxima section (as com atributo 'scroll') a ser scrollada.
     * Em seguida chama {@link scrollPage}
     *
     * @param isScrollingUp direção da 'scrollada'.
     * @param mainRef referência para tag main que engloba as tags section.
     */
    private handleScrollables(isScrollingUp: boolean, mainRef: ElementRef<HTMLElement>): void {
        const sectionsNodes = mainRef.nativeElement.querySelectorAll('section[scroll]');
        const sections = isScrollingUp
            ? Array.from<HTMLElement>(sectionsNodes as any)
            : Array.from<HTMLElement>(sectionsNodes as any).reverse();

        sections.find((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const condition = isScrollingUp ? (sectionTop < 0) : (sectionTop > 0);

            if (condition) {
                this.scrollPage(sectionTop + window.scrollY);
            }
        });
    }

    /**
     * Scrolla a página/viewport.
     *
     * @param top número (pixels) de onde o topo da página/viewport deve parar.
     */
    private scrollPage(top: number): void {
        window.scroll({
            top,
            behavior: 'smooth'
        });
    }

    /**
     * Scrolla para o section baseado no indice do mesmo.
     * Utilizado ao clicar em um step.
     *
     * @param nextStepIndex índice do step/section a ser scrollado.
     */
    public scrollToSection(nextStepIndex: number): void {
        const sectionsNodes = this.mainRef.nativeElement.querySelectorAll('section[scroll]');
        const sectionTop = sectionsNodes[nextStepIndex].getBoundingClientRect().top;
        this.scrollPage(sectionTop + window.scrollY);
    }

    /** Após scrollar, atualiza o step ativo baseado no section recém scrollado. */
    private synchronizeStepperWithScroll(): void {
        this.scrollDispatcher
            .scrolled()
            .pipe(
                debounceTime(70),
                takeUntil(this.onDestroy),
            )
            .subscribe(() => {
                const sectionsNodes = this.mainRef.nativeElement.querySelectorAll('section[scroll]');
                const sections = Array.from<HTMLElement>(sectionsNodes as any);
                const selectedSectionIndex = sections.findIndex((section) =>
                    section.getBoundingClientRect().top === 0);

                this.selectedIndex = selectedSectionIndex > -1
                    ? selectedSectionIndex
                    : this.selectedIndex;

                this.changeDetectorRef.detectChanges();
            });
    }

}
