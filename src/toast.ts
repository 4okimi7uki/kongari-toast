import { toastIconMap, ToastType, ToastIcon } from "./toastIconMap.js";

export interface ToastOptions {
    duration?: number;
    position?: string;
    mode?: "light" | "dark" | "auto";
}

export class Toast {
    private toast!: HTMLElement;
    private toastElements!: Partial<{
        icon: HTMLElement;
        msg: HTMLElement;
        bar: HTMLElement;
    }>;
    private position!: ReturnType<typeof Toast.getPosition>;

    constructor(private message: string, private type: ToastType, private options: ToastOptions = {}) {
        this.position = Toast.getPosition(this.options.position ?? null);
        this.removeToast = this.removeToast.bind(this);
        this.createToast();
    }

    createElement(tag: string, className: string, innerHTML: string = "") {
        const el: HTMLElement = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    }

    applyTypeStyle() {
        const iconInfo: ToastIcon = toastIconMap[this.type] || toastIconMap.default;

        if (this.toastElements.icon) {
            this.toastElements.icon.innerHTML = iconInfo.svg || "";
        }

        const color = this.type === "promise" ? null : iconInfo.color || toastIconMap.default.color;

        if (color) {
            this.toast.style.setProperty("--color-progress", color, "important");
        }
    }

    static getPosition(position: string | null) {
        switch (position) {
            case "top-right":
                return {
                    container: "position-tr",
                    enter: "toast-in-r",
                    exit: "toast-out-r",
                };
            case "top-left":
                return {
                    container: "position-tl",
                    enter: "toast-in-l",
                    exit: "toast-out-l",
                };
            case "bottom-right":
                return {
                    container: "position-br",
                    enter: "toast-in-r",
                    exit: "toast-out-r",
                };
            case "bottom-left":
                return {
                    container: "position-bl",
                    enter: "toast-in-l",
                    exit: "toast-out-l",
                };
            default:
                return {
                    container: "position-br",
                    enter: "toast-in-r",
                    exit: "toast-out-r",
                };
        }
    }

    private createStructure() {
        const toast = this.createElement("div", "toast");
        const inner = this.createElement("div", "toast-inner");
        const contents = this.createElement("div", "toast-inner-contents");
        const icon = this.createElement("div", "icon-area");
        const msg = this.createElement("div", "msg-area", this.message);
        const progress = this.createElement("div", "toast-progressbar");
        const bar = this.createElement("div", "toast-progressbar-bar");

        this.toast = toast;
        this.toastElements = { icon, msg, bar };

        this.applyTypeStyle();

        const { mode } = this.options;
        if (mode) {
            switch (mode) {
                case "auto":
                    break;
                case "dark":
                    toast.classList.add("dark");
                    progress.classList.add("dark");
                    break;
                case "light":
                    toast.classList.add("light");
                    progress.classList.add("light");
                    break;
            }
        }

        contents.append(icon, msg);
        inner.append(contents);
        progress.append(bar);
        this.toast.append(inner, progress);
    }

    private attachToDOM() {
        const containerSelector = `.toast-container.${this.position.container}`;
        let container = document.querySelector(containerSelector);

        if (!container) {
            container = document.createElement("div");
            container.classList.add("toast-container", this.position.container);
            document.body.appendChild(container);
        }

        container.appendChild(this.toast);
        this.toast.classList.add("show");
        this.toast.style.animation = `${this.position.enter} 0.5s`;
    }

    private setupAnimation() {
        const bar = this.toastElements.bar;
        const duration = this.options.duration ?? 3000;

        if (!bar) return;

        setTimeout(() => {
            bar.style.animation = `bar ${duration / 1000}s linear`;
            bar.addEventListener(
                "animationend",
                () => (this.toast.style.animation = `${this.position.exit} 0.8s forwards`),
                {
                    once: true,
                }
            );
            this.toast.addEventListener("animationend", (e) => {
                this.removeToast(e);
            });
        }, 10);
    }

    createToast() {
        this.createStructure();
        this.attachToDOM();
        this.setupAnimation();
    }

    removeToast(e: AnimationEvent) {
        if (!this.toast) return;
        if (e.animationName.startsWith("toast-out-")) {
            this.toast.remove();
        }

        // コンテナにトーストがないなら削除
        const container = document.querySelector(`.toast-container.${this.position.container}`);
        if (container && container.children.length === 0) {
            container.remove();
        }
    }
    static isPromise<T = unknown>(obj: unknown): obj is Promise<T> {
        return (
            !!obj &&
            typeof (obj as { then?: unknown; catch?: unknown }).then === "function" &&
            typeof (obj as { then?: unknown; catch?: unknown }).catch === "function"
        );
    }

    static promise<T>(
        promise: Promise<T>,
        message = { loading: "loading...", success: "success", error: "error" },
        options: ToastOptions = {}
    ) {
        if (!Toast.isPromise(promise)) {
            new Toast("Warning: this function requires a Promise as input", "warning", options);
            return promise;
        }

        const loadingToast = new Toast(message.loading, "promise", options);

        if (loadingToast.toastElements.bar) {
            loadingToast.toastElements.bar.style.display = "none";
        }
        promise
            .then((res) => {
                loadingToast.update(message.success, "success");
                return res;
            })
            .catch((err) => {
                loadingToast.update(message.error, "error");
                throw err;
            });

        return promise;
    }

    update(newMessage: string, newType: ToastType = "default", duration = 3000) {
        if (this.toastElements.msg) {
            this.toastElements.msg.innerHTML = newMessage;
        }
        this.type = newType;
        this.applyTypeStyle();
        this.options.duration = this.options.duration ?? duration;

        const bar = this.toastElements.bar;
        if (bar) {
            bar.style.display = "block";
            bar.style.animation = "none"; //reset
            void bar.offsetWidth;
            bar.style.animation = `bar ${this.options.duration / 1000}s linear`;

            bar.addEventListener(
                "animationend",
                (e) => {
                    if (e.animationName === "bar") {
                        this.removeToast(e);
                    }
                },
                { once: true }
            );
        }
    }
}
