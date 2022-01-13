import { Observable, of, from, timer, interval } from 'rxjs';
import {
    withLatestFrom, skip,
    throttle, groupBy, map, take, mapTo, mergeMap, zipAll, reduce, switchAll,
    switchMapTo, tap, toArray, switchMap, scan
} from 'rxjs/operators';

export const mapNumberToChar = () =>
    map((val: number) => String.fromCharCode(val + 97));

export function getRandomId(): string {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

let input = timer(0, 20).pipe(take(50));
let output = input.pipe(
    scan((acc, curr) => acc + curr, 0),
    toArray(),
    tap(x => {x})
    );

output