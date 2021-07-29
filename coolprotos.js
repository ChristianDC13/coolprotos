Array.prototype.isEqual = function (arr) {
    return this <= arr && this >= arr;
};

Object.prototype.differences = function (obj) {
    const differences = [];
    for (let key in this) {
        let deepDiff;
        if (typeof this[key] === 'object' && !Array.isArray(this[key])) {
            deepDiff = this[key].differences(obj[key]);
        } else if (Array.isArray(this[key]) && !this[key].isEqual(obj[key])) {
            differences.push(key);
        }
        if (!Array.isArray(this[key]) && this[key] !== obj[key]) {
            const diff = deepDiff ? [key, deepDiff].join('.') : key;
            differences.push(diff);
        }
    }
    return differences;
};

Object.prototype.symetricDifferences = function (obj) {
    const res = [...this.differences(obj), ...obj.differences(this)];
    return Array.from(new Set(res));
};