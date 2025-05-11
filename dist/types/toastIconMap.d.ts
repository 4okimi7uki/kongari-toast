export interface ToastIcon {
    color: string;
    svg?: string;
}
export type ToastType = "default" | "success" | "error" | "warning" | "info" | "promise";
export declare const toastIconMap: Record<ToastType, ToastIcon>;
