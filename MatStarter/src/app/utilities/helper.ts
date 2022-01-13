const { timer } = require('rxjs');
const { take, map, tap, toArray } = require('rxjs/operators');


// create a timer with 3 events
const source$ = timer(0, 5).pipe(
  take(5),
  tap((x: any) => {
    x
  }),
  map((x: any) => x * 4),
  tap((x: any) => {
    x
  })
);

// collapse all events into one array
const result$ = source$.pipe(
  toArray()
).subscribe(console.log)
