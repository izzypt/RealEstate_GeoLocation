function debounce(func, timeout = 2000) {
	let timer;
	return function() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			console.log("finish debounce");
			func();
		}, timeout);
	};
}

export default debounce;