export const toastIconMap = {
    promise: {
        color: "",
        svg: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_ajPY{transform-origin:center;animation:spinner_AtaB .75s infinite linear}@keyframes spinner_AtaB{100%{transform:rotate(360deg)}}</style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_ajPY"/></svg>`,
    },
    success: {
        color: "#10b27f",
        svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#21BE91"/>
                <path d="M5.59998 11.4L10.2 16.6L18.6 7.6" stroke="#0D5843" stroke-width="3"/>
                </svg>`,
    },
    error: {
        color: "#f93a1d",
        svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#D8422B"/>
                <path d="M7.59998 16.8L16.8 7.6" stroke="#611F15" stroke-width="3"/>
                <path d="M16.8 16.8L7.59999 7.6" stroke="#611F15" stroke-width="3"/>
                </svg>`,
    },
    default: {
        color: "linear-gradient(to right, #eef947, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)",
        svg: "",
    },
};
