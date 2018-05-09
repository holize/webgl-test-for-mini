export const defineReadOnlyProperty = (obj, name, value) => {
    Reflect.defineProperty(obj, name, {
        value: value,
        enumerable: true
    });
}