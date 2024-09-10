self.__uv$config = {
    prefix: '/static/tiw/',
    bare: ['https://bare.benrogo.net', "https://25bcompanyvsglitch.sytes.com", "https://glitchnetwork.sytes.com"],
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/static/uv/uv.handler.js',
    bundle: '/static/uv/uv.bundle.js',
    config: '/static/uv/uv.config.js',
    sw: '/static/uv/uv.sw.js',
};