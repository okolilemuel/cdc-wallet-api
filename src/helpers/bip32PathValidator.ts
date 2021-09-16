const bippath = require('bip32-path')

const validateBIP32Path = (path: string): boolean => {
    return bippath.validateString(path, true)
}

export { validateBIP32Path }
