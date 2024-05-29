function getRootPath() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return '/'
    } else {
        return '/FED1-PE1-sandygrandy/'
    }
}

export {
    getRootPath
}