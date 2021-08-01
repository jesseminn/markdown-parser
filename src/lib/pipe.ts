export const pipe = <T, R>(fn1: (a: T | R) => R, ...fns: Array<(a: T | R) => R>) =>
    fns.reduce((prevFn, nextFn) => value => nextFn(prevFn(value)), fn1);
