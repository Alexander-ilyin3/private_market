import { camelCase, snakeCase, isObject, isArray, reduce } from 'lodash';

export function onEachObjectProp(obj, cb, skipPropsUnder = [], skipCurrentProp) {
    if (!isObject(obj)) {
        return obj;
    }
    if (isArray(obj)) {
        return obj.map((v) => onEachObjectProp(v, cb, skipPropsUnder));
    }
    return reduce(
        obj,
        (r, v, k) => ({
            ...r,
            [skipCurrentProp ? k : cb(k)]: onEachObjectProp(v, cb, skipPropsUnder, skipPropsUnder.includes(k)),
        }),
        {},
    );
}

export function convertToCamelcase(obj, skipPropsUnder) {
    return onEachObjectProp(obj, camelCase, skipPropsUnder);
}

export function convertToSnakecase(obj, skipPropsUnder) {
    return onEachObjectProp(obj, snakeCase, skipPropsUnder);
}