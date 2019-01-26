// https://github.com/ReactiveX/rxjs

const { range } = require('rxjs');
const { map, filter } = require('rxjs/operators');

range(1, 200).pipe(
  filter(x => x % 13 === 1),
  map(x => x + x)
).subscribe(x => console.log(x));
