# Another Love Letter to Rust

By know everyone knows about the crab, and the ownership, and the borrowing, and the performance. But to me... rust is not only about that.

## eXpRessIvE tYpIng
It's about expressive types. I don't really care if it's garbage collected or not, for my use-cases. And it's about simplicity. `cargo init my-awesome-project` and you're all set. Lot's of utility functions for iterating in different ways. 
You don't have to use a HashMap as a Set, you don't have to use a Vector as a Deque, you have all those collections, which can be converted between each other with no gotchas. If it's a `mut` it is mutable. If you want to clone it, you can `.clone()` it.

## It is complex...
But it's also fun to learn it. Everyone has said it. But as you get better, you start to get more and more productive. I'd say by now I can write Rust about half as fast as python. But I'll need double the test cases for my python code.


## You can build everything in it
- with web assembly + yew you get a React look-alike all in Rust https://yew.rs/docs/getting-started/build-a-sample-app
- lots of web servers https://rocket.rs/, https://actix.rs/
- run python on rust https://rustpython.github.io/
- create python modules and call python from rust https://github.com/PyO3/pyo3
- create lua libraries https://github.com/khvzak/mlua

## Async
Rust has async/await support. It's essentially syntatic sugar for the `Future` trait, which is somewhat similar to scala's `Future`, Js `Promise`...

So it has the problem of 'I wanted to use this async function and now my whole code needs to be async'. Golang does not have this problem https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/.

To me it's Ok, since we get a bit of referential transparency (the type of the thing explain what it does). If this function is IO bound, it should be a Future :). Though a function that returns a Future can have compute-heavy steps in it. Imagine we fetch a web page and hash it, for some reason?. We lack the types to express this mix... but whatever, it's way better than nothing.

But you could say that a good function name can be considered referential transparency... True, I agree. A function named "downloadTheInternet" should do IO. and maybe golang's approach to asynchrony really is better........

## Wrapping it up
Why are you still reading? Go do some https://adventofcode.com challenges and be happy :)