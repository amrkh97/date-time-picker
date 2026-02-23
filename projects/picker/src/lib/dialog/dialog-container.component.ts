/**
 * dialog-container.component
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  DOCUMENT
} from '@angular/core';

import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import {
    BasePortalOutlet,
    CdkPortalOutlet,
    ComponentPortal,
    TemplatePortal
} from '@angular/cdk/portal';
import { OwlDialogConfigInterface } from './dialog-config.class';
import { OwlAnimationEvent } from '../utils/owl-animation-event';

@Component({
    selector: 'owl-dialog-container',
    templateUrl: './dialog-container.component.html',
    styleUrls: ['./dialog-container.component.scss'],
    host: {
        '[class.owl-dialog-container]': 'owlDialogContainerClass',
        '[attr.tabindex]': 'owlDialogContainerTabIndex',
        '[attr.id]': 'owlDialogContainerId',
        '[attr.role]': 'owlDialogContainerRole',
        '[attr.aria-labelledby]': 'owlDialogContainerAriaLabelledby',
        '[attr.aria-describedby]': 'owlDialogContainerAriaDescribedby',
        '[class.owl-dialog-enter]': 'state === "enter"',
        '[class.owl-dialog-exit]': 'state === "exit"',
    },
    standalone: false
})
export class OwlDialogContainerComponent extends BasePortalOutlet
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet | null = null;

    /** The class that traps and manages focus within the dialog. */
    private focusTrap: FocusTrap;

    /** ID of the element that should be considered as the dialog's label. */
    public ariaLabelledBy: string | null = null;

    /** Emits when an animation state changes. */
    public animationStateChanged = new EventEmitter<OwlAnimationEvent>();

    public isAnimating = false;

    private _config: OwlDialogConfigInterface;
    get config(): OwlDialogConfigInterface {
        return this._config;
    }

    public state: 'void' | 'enter' | 'exit' = 'enter';

    // for animation purpose
    private params: any = {
        x: '0px',
        y: '0px',
        ox: '50%',
        oy: '50%',
        scale: 0
    };

    // A variable to hold the focused element before the dialog was open.
    // This would help us to refocus back to element when the dialog was closed.
    private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    private animationStartListener: (() => void) | null = null;
    private animationEndListener: (() => void) | null = null;

    get owlDialogContainerClass(): boolean {
        return true;
    }

    get owlDialogContainerTabIndex(): number {
        return -1;
    }

    get owlDialogContainerId(): string {
        return this._config.id;
    }

    get owlDialogContainerRole(): string {
        return this._config.role || null;
    }

    get owlDialogContainerAriaLabelledby(): string {
        return this.ariaLabelledBy;
    }

    get owlDialogContainerAriaDescribedby(): string {
        return this._config.ariaDescribedBy || null;
    }

    constructor(
        private changeDetector: ChangeDetectorRef,
        private elementRef: ElementRef,
        private focusTrapFactory: FocusTrapFactory,
        private ngZone: NgZone,
        @Optional()
        @Inject(DOCUMENT)
        private document: any
    ) {
        super();
    }

    public ngOnInit() {}

    public ngAfterViewInit(): void {
        const el = this.elementRef.nativeElement as HTMLElement;
        this.ngZone.runOutsideAngular(() => {
            const onAnimationStart = (e: AnimationEvent) => {
                this.ngZone.run(() => {
                    this.isAnimating = true;
                    if (e.animationName === 'owlDialogSlideIn') {
                        this.animationStateChanged.emit({
                            phaseName: 'start',
                            fromState: 'void',
                            toState: 'enter'
                        });
                    } else if (e.animationName === 'owlDialogSlideOut') {
                        this.animationStateChanged.emit({
                            phaseName: 'start',
                            fromState: 'enter',
                            toState: 'exit'
                        });
                    }
                });
            };
            const onAnimationEnd = (e: AnimationEvent) => {
                this.ngZone.run(() => {
                    if (e.animationName === 'owlDialogSlideIn') {
                        this.trapFocus();
                        this.animationStateChanged.emit({
                            phaseName: 'done',
                            fromState: 'void',
                            toState: 'enter'
                        });
                    } else if (e.animationName === 'owlDialogSlideOut') {
                        this.restoreFocus();
                        this.animationStateChanged.emit({
                            phaseName: 'done',
                            fromState: 'enter',
                            toState: 'exit'
                        });
                    }
                    this.isAnimating = false;
                });
            };
            el.addEventListener('animationstart', onAnimationStart);
            el.addEventListener('animationend', onAnimationEnd);
            this.animationStartListener = () => el.removeEventListener('animationstart', onAnimationStart);
            this.animationEndListener = () => el.removeEventListener('animationend', onAnimationEnd);
        });
    }

    public ngOnDestroy(): void {
        if (this.animationStartListener) {
            this.animationStartListener();
        }
        if (this.animationEndListener) {
            this.animationEndListener();
        }
    }

    /**
     * Attach a ComponentPortal as content to this dialog container.
     */
    public attachComponentPortal<T>(
        portal: ComponentPortal<T>
    ): ComponentRef<T> {
        if (this.portalOutlet.hasAttached()) {
            throw Error(
                'Attempting to attach dialog content after content is already attached'
            );
        }

        this.savePreviouslyFocusedElement();
        return this.portalOutlet.attachComponentPortal(portal);
    }

    public attachTemplatePortal<C>(
        portal: TemplatePortal<C>
    ): EmbeddedViewRef<C> {
        throw new Error('Method not implemented.');
    }

    public setConfig(config: OwlDialogConfigInterface): void {
        this._config = config;

        if (config.event) {
            this.calculateZoomOrigin(config.event);
        }

        this.applyZoomOriginStyles();
    }

    public startExitAnimation() {
        this.state = 'exit';
        this.changeDetector.markForCheck();
    }

    /**
     * Calculate origin used in the zoom animation
     */
    private calculateZoomOrigin(event: any): void {
        if (!event) {
            return;
        }

        const clientX = event.clientX;
        const clientY = event.clientY;

        const wh = window.innerWidth / 2;
        const hh = window.innerHeight / 2;
        const x = clientX - wh;
        const y = clientY - hh;
        const ox = clientX / window.innerWidth;
        const oy = clientY / window.innerHeight;

        this.params.x = `${x}px`;
        this.params.y = `${y}px`;
        this.params.ox = `${ox * 100}%`;
        this.params.oy = `${oy * 100}%`;
        this.params.scale = 0;

        return;
    }

    /**
     * Apply zoom origin as CSS custom properties on host element
     */
    private applyZoomOriginStyles(): void {
        const el = this.elementRef.nativeElement as HTMLElement;
        el.style.setProperty('--owl-dialog-x', this.params.x);
        el.style.setProperty('--owl-dialog-y', this.params.y);
        el.style.setProperty('--owl-dialog-ox', this.params.ox);
        el.style.setProperty('--owl-dialog-oy', this.params.oy);
        el.style.setProperty('--owl-dialog-scale', this.params.scale);
    }

    /**
     * Save the focused element before dialog was open
     */
    private savePreviouslyFocusedElement(): void {
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = this.document
                .activeElement as HTMLElement;

            Promise.resolve().then(() => this.elementRef.nativeElement.focus());
        }
    }

    private trapFocus(): void {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(
                this.elementRef.nativeElement
            );
        }

        if (this._config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        }
    }

    private restoreFocus(): void {
        const toFocus = this.elementFocusedBeforeDialogWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }

        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
}
