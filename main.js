setTimeout(() => {
  console.log(1);
}, 1);

setTimeout(() => {
  console.log(2);
}, 2);

Promise.resolve(3).then(() => {
  console.log(3);
});
// Promise.resolve(console.log(4));
// Promise.resolve(console.log(5));

console.log(6);
