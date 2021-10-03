import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export abstract class BaseComponent implements OnDestroy {

    /** Subject utilizado para encerrar Subscriptions no hook OnDestroy. */
    protected onDestroy = new Subject<void>();

    /**
     * Hook executado na destruição do componente.
     */
    public ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
