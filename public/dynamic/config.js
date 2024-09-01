self.__dynamic$config = {
	prefix: "/x/",
	encoding: "xor",
	mode: "production",
	logLevel: 0,
	bare: {
		version: 2,
		path: "/bare/",
	},
	tab: {
		title: null,
		icon: null,
		ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
	},
	assets: {
		prefix: "/assets/dynamic/",
		files: {
			handler: "handler.js",
			client: "client.js",
			worker: "worker.js",
			config: "config.js",
			inject: "",
		},
	},
	block: [],
};
