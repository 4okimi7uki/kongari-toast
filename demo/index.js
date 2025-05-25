import { Toast } from "./toast.js";

const handleCoding = () => {
    const demoCode = `new Toast('Toast is ready!', "${
        document.querySelector("input[name=type]:checked")?.id ?? "default"
    }", {
        position: "${document.querySelector("input[name=position]:checked")?.id ?? "bottom-right"}",
        duration: ${document.querySelector("#js-duration").value},
        mode: "${document.querySelector("input[name=mode]:checked")?.id ?? "auto"}"
    })`;
    return demoCode;
};
const handlePromiseCoding = () => {
    const demoCode = `Toast.promise(fetchData(), {
        loading: "Toasting...",
        success: "Toast is ready!",
        error: "Oops! The toast burned!"
    }, {
        position: "${document.querySelector("input[name=position]:checked")?.id ?? "bottom-right"}",
        duration: ${document.querySelector("#js-duration").value},
        mode: "${document.querySelector("input[name=mode]:checked")?.id ?? "auto"}"
    })`;
    return demoCode;
};
const handleMakeToast = () => {
    const type = document.querySelector("input[name=type]:checked")?.id ?? "default";
    const options = {
        position: document.querySelector("input[name=position]:checked")?.id ?? "bottom-right",
        duration: document.querySelector("#js-duration").value,
        mode: document.querySelector("input[name=mode]:checked")?.id ?? "auto",
    };
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() < 0.5 ? resolve("ok") : reject("ng");
            }, 1500);
        });
    };

    if (type === "promise") {
        Toast.promise(
            fetchData(),
            {
                loading: "Toasting...",
                success: "Toast is ready!",
                error: "Oops! The toast burned!",
            },
            options
        );
    } else {
        let msg;
        switch (type) {
            case "success":
                msg = "Toast is ready";
                break;
            case "error":
                msg = "Oops! The toast burned!";
                break;
            case "info":
                msg = `Ingredients: <br/>
                    Flour (40%), Eggs (25%), Milk (20%), <br/>Butter (14%), Love (1%).`;
                break;
            case "warning":
                msg = "Caution: Toast is approaching maximum crispiness!";
                break;
            default:
                msg = "This is Kongari-Toast!";
                break;
        }
        new Toast(msg, type, options);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const codeArea = document.querySelector("#js-insert");
    document.addEventListener("change", (e) => {
        if (document.querySelector("input[name=type]:checked")?.id === "promise") {
            codeArea.innerHTML = handlePromiseCoding();
            Prism.highlightElement(codeArea);
        } else if (e.target.type === "radio" || e.target.type === "number") {
            codeArea.innerHTML = handleCoding();
            Prism.highlightElement(codeArea);
        }
    });

    document.querySelector("#makeToast").addEventListener("click", () => {
        handleMakeToast();
        console.log("click");
    });
});
