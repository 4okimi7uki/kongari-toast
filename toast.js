class Toast {
    constructor(message, type = "default", duration = 3000) {
        this.message = message;
        this.type = type;
        this.duration = duration;
        this.toast = null;
        this.toastElements = {};
        this.root = document.documentElement;

        this.createToast();
    }
    createElement(tag, className, innerHTML = "") {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    }

    applyTypeStyle() {
        const iconMap = {
            success: "☺️",
            error: "😵‍💫",
            promise: '<img src="90-ring-with-bg.svg" />',
            default: "",
        };

        const colorMap = {
            success: "#10b27f",
            error: "#f93a1d",
            default: "linear-gradient(to right, #eef947, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)",
        };

        this.toastElements.icon.innerHTML = iconMap[this.type] || iconMap.default;

        const color = this.type === "promise" ? null : colorMap[this.type] || colorMap.default;

        if (color) {
            this.toast.style.setProperty("--color-progress", color, "important");
        }
    }

    createToast() {
        const toast = this.createElement("div", "toast");
        const inner = this.createElement("div", "toast-inner");
        const contents = this.createElement("div", "toast-inner-contents");
        const icon = this.createElement("div", "icon-area");
        const msg = this.createElement("div", "msg-area", this.message);
        const progress = this.createElement("div", "toast-progressbar");
        const bar = this.createElement("div", "toast-progressbar-bar");

        this.toast = toast;
        this.toastElements = { icon, msg, bar };
        // スタイル適応
        this.applyTypeStyle();
        // DOM構造くむ
        contents.append(icon, msg);
        inner.append(contents);
        progress.append(bar);
        toast.append(inner, progress);

        // 表示
        if (!document.querySelector("#toast-container")) {
            const container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }
        document.querySelector("#toast-container").appendChild(toast);
        // document.body.appendChild(toast);
        toast.classList.add("show");
        toast.style.animation = "toast-in 0.5s";

        setTimeout(() => {
            bar.style.animation = `bar ${this.duration / 1000}s linear`;
            bar.addEventListener("animationend", () => this.removeToast(), { once: true });
        }, 10);
    }

    removeToast() {
        if (!this.toast) return;
        this.toast.style.animation = "toast-out .8s forwards";
        this.toast.addEventListener(
            "animationend",
            (e) => {
                if (e.animationName === "toast-out") {
                    this.toast.remove();
                }
            },
            { once: true }
        );
    }

    static promise(promise, message = {}) {
        const loadingToast = new Toast(message.loading || "loading...", "promise");

        loadingToast.toastElements.bar.style.display = "none";
        promise
            .then((res) => {
                loadingToast.update(message.success || "成功！", "success");
                return res;
            })
            .catch((err) => {
                loadingToast.update(message.error || "エラーが発生しました", "error");
                throw err;
            });

        return promise;
    }

    update(newMessage, newType = "default", duration = 3000) {
        this.toastElements.msg.innerHTML = newMessage;
        this.type = newType;
        this.applyTypeStyle();
        this.duration = duration;

        const bar = this.toastElements.bar;

        bar.style.display = "block";
        bar.style.animation = "none"; //reset
        void bar.offsetWidth;
        bar.style.animation = `bar ${this.duration / 1000}s linear`;

        // 自動で remove
        bar.addEventListener(
            "animationend",
            (e) => {
                if (e.animationName === "bar") {
                    this.removeToast();
                }
            },
            { once: true }
        );
    }
}

document.querySelector("#showBtn").addEventListener("click", () => {
    const successToast = new Toast("保存しました！", "success", 2000);
});
document.querySelector("#errorBtn").addEventListener("click", () => {
    const successToast = new Toast("失敗しました", "error", 2000);
});
document.querySelector("#defaultBtn").addEventListener("click", () => {
    const successToast = new Toast("Hello!", "", 3000);
});
document.querySelector("#promiseBtn").addEventListener("click", () => {
    const fakeApi = new Promise((resolve, reject) => {
        // fetch("https://133.18.227.73:9445/fastapi/get_capture?doc_id=3")
        //     .then((res) => {
        //         if (res.ok) {
        //             return res.json();
        //         } else {
        //             reject("error");
        //         }
        //     })
        //     .then((data) => {
        //         resolve(data);
        //     })
        //     .catch((er) => reject(er));
        setTimeout(() => {
            // resolve("OK");
            reject("NO");
        }, 5000);
    });
    Toast.promise(fakeApi, {
        loading: "保存中...",
        success: "保存成功🎉",
        error: "保存に失敗しました😭",
    });
});
