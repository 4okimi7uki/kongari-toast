# こんな感じで埋め込むと動くよ

```
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
		setTimeout(() => {
			resolve("OK");
			// reject("NO");
		}, 5000);
	});
	Toast.promise(fakeApi, {
		loading: "保存中...",
		success: "保存成功🎉",
		error: "保存に失敗しました😭",
	});
});
```
