class CSPClientValidator {
    constructor(options = {}) { this.debug = options.debug === true; }
    getValidationStats() { return { validationChecks: 0, debug: this.debug }; }
}
module.exports = CSPClientValidator;
