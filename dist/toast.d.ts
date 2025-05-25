type ToastType = "default" | "success" | "error" | "warning" | "info" | "promise";

interface ToastOptions {
    duration?: number;
    position?: string;
    mode?: "light" | "dark" | "auto";
    withoutMsg?: boolean;
}
declare class Toast {
    private message;
    private type;
    private options;
    private toast;
    private toastElements;
    private position;
    constructor(message: string, type: ToastType, options?: ToastOptions);
    createElement(tag: string, className: string, innerHTML?: string): HTMLElement;
    applyTypeStyle(): void;
    static getPosition(position: string | null): {
        container: string;
        enter: string;
        exit: string;
    };
    private createStructure;
    private attachToDOM;
    private setupAnimation;
    createToast(): void;
    removeToast(e: AnimationEvent): void;
    static isPromise<T = unknown>(obj: unknown): obj is Promise<T>;
    static promise<T>(promise: Promise<T>, message?: {
        loading: string;
        success: string;
        error: string;
    }, options?: ToastOptions): Promise<T>;
    update(newMessage: string, newType?: ToastType, duration?: number): void;
}

export { Toast, type ToastOptions };
