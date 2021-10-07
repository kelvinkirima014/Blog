---
title: Generating the nth Fibonacci using Rust.
description: Learn How to code a program that takes an integer and generates its corresponding Fibonacci.
date: 2021-05-15T11:00:00.000Z
---

I committed myself to learn Rust since April, mainly because I am so psyched about the [Solana](https://solana.com/) ecosystem which uses Rust for [solana programs](https://hackernoon.com/an-introduction-to-building-on-the-solana-network) and is also built on Rust. The [Book](https://doc.rust-lang.org/book/ch00-00-introduction.html) is a great resource to learn from and after going through the basics, one challenge they ask you to try out is coding a program that generates numbers in a Fibonacci sequence. I thought it would be cool to document my journey by sharing walkthroughs of what I am building. 

### What’s a Fibonacci sequence?

Fibonacci numbers are numbers that form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.  
The Fibonacci sequence
> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

Written as an expression, 

> Fn = Fn-1 + Fn-2

### Getting Started.
You need to have Rust installed on your computer, for Linux or macOS run the following command in your terminal,
```
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```
If the install is successful, the following line will appear:

> Rust is installed now. Great!

 For those on windows, see the [Rust docs](https://www.rust-lang.org/tools/install).
Now run this command to create a new Rust project.
```
cargo new rust_fibonacci
```
Then
```
cd rust_fibonacci
```
Open the directory in your IDE
You’ll find that Rust generates a `main.rs` file for you, this is our entry point to Rust, open the file. It looks like this:
```rust
fn main () {
    println!(“Hello world”);
}
```
Now let’s go ahead and edit the code..

### Fibonacci Function
Let’s create a function below the `main` function that  generates a fibonacci sequence
```rust
fn fib (n: u32) -> u32 {
    if n <= 0 {
          return 0;
    } else if n== 1{
          return 1;
} else {
    return fib (n-1)  + fib(n-2);
 }
}
```
Here is what’s happening. First, we create a function (fn) named `fib` and pass variable `n` as a parameter. In Rust, we have to specify the type of the parameter and its return value. I specify it’s a `u32`, meaning it can only accept unsigned/positive integers of 32 bits and the `->` is specifying the return type of the function which is also a `u32` integer. 
Next, I use an `if` expression followed by a condition that checks if the value of `n` is less or equal to `0` and returns `0` if that’s the case. We then check to see if the value of `n` is `1` and return `1`. In the `else` part, we implement the logic of the Fibonacci sequence by recursively calling the function with a different integer.
### Printing the Values on the screen.
Now let’s go back to our `main` function and modify it to look like this...
```rust
fn main( ){
    for int in 0..15 {
         println! ( “fibonacci ({}) => {}”, int, fib(int));
     }
}
```
Inside the `main` function is a [for](https://doc.rust-lang.org/rust-by-example/flow_control/for.html) loop that loops over every integer from 0 to 15 and we use the `println!` to print each integer we pass and its corresponding Fibonacci value.
Type `cargo run` in your terminal and the output should look like this...
![fibonacci](fibseq.png)

### Accept User Input.
 We want our program to allow the user to input a number and gets its corresponding Fibonacci. Edit the `main` function to look like so,
```rust
use std::io;
fn main ( ) {
    println! (“To quit the program type `exit` “);
    loop {
         println! (“TYPE A POSITIVE NUMBER”)
         let mut int = String::new;
         io::stdin( )
	.read_line(& mut int)
	.expect (“Failed to read your input”);
	if int.trim( ) == “exit” {
	    break;
        }
        let int: u32 = match int.trim()
         .parse() {
          Ok(int) => int,
          Err(_) => continue,
          };
        println!("Fibonacci ({}) => {}", int, 
        fib(int));    
}
```
Let’s go over the above code line by line. 
First, we import a library that allows us to handle user input.
`use std::io;`
Rust brings only a few types into the scope of every program in the [prelude](https://doc.rust-lang.org/std/prelude/index.html). If a type you want to use isn’t in the prelude, bring that type into scope explicitly with a `use` statement. 
Inside the `main` function, we first let the user know how to quit the program by using the println! Macro to print a string to the screen.
### Inside the Loop.
Next, we create a [loop](https://doc.rust-lang.org/rust-by-example/flow_control/loop.html) using the `loop` keyword that will keep running until you break out by typing *exit*(we’ll see how that happens in a moment). We then let the user know how to interact with the game each loop by using `println!` again to print a string on the screen.
```Rust
         println! (“TYPE A POSITIVE NUMBER”);
```
### variables and mutability
Each time through the loop, we create a mutable variable called `int`
```rust
let mut int = String::new;
```
Variables in Rust are immutable by default so we have to add the `mut` keyword when we are creating a mutable variable. 
On the other side of the equal sign `(=)` is the value that `int` is bound to, which is the result of calling `String::new`, a function that returns a new instance of a String. So, what we are doing is creating a mutable variable that is currently bound to a new, empty instance of a String. 
We then use the `std::io` library that we imported by calling the `stdin` function from the `io `module…
```rust
  io::stdin( )
     .read_line( &mut int)
```
The next line, `.read_line(&mut int)`, calls the `read_line` method on the standard input handle to get input from the user.`read_line` takes whatever the user types  into standard input and append that into a string. We’re also passing one argument `( &mut int) `to the method. The `&` indicates that the argument is a [reference](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html), *references* are also immutable by default so you need to write  `&mut int` to make it mutable.

The next part is this method:
```rust
.expect("Failed to read line");
```
Is a Result type that represents either success (Ok) or failure (Err). AS I mentioned,`read_line` puts what the user types into the string we’re passing it, but it also returns a value — in this case, an [io::Result](https://doc.rust-lang.org/std/io/type.Result.html). The [Result](https://doc.rust-lang.org/std/result/enum.Result.html) types are enumerations/enums. An [enumeration](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html) is a type that can have a fixed set of values, and those values are called the enum’s variants.

If this instance of `io::Result` is an [Err](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err) value, [expect](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect) will cause the program to crash and display the message that you passed as an argument to `expect`. If this instance of `io::Result` is an [Ok](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Ok) value, `expect` will take the return value that `Ok` is holding and return just that value to you so you can use it.

Our next piece of code is:
```rust 
if int.trim( ) == “exit” {
	    break;
            }
```
That checks to see if a user types *exit* to `break` out of the program. The `.trim( )` method is passed to eliminate any whitespace at the beginning and the end.
In the next block of code,
```rust
let int: i32 = match int.trim( )
	    .parse ( ){ 
	    Ok (int)=> int,
	    Err( _ )  => continue,
     }
```
We create a variable named `int`, Rust allows us to [shadow](https://en.wikipedia.org/wiki/Variable_shadowing) the previous value of `int` with a new one. We often use this feature in situations in which we want to convert a value from one type to another type.
We bind `int` to the expression `int.trim().parse()`. The `int` in the expression refers to the original `int` that was a String with the input in it. The `.trim()` method on a String instance will eliminate any whitespace at the beginning and end. We use the `.parse()` method to turn the string into an integer.  `parse` returns a *Result* type and Result is an *enum* that has the variants `Ok` or `Err`, remember? We use a [`match`](https://doc.rust-lang.org/rust-by-example/flow_control/match.html?highlight=match#match) expression to decide what to do next based on which variant of Result that was returned. If the user typed in a number, we get `Ok` and store the number in `int`. If not, we call `continue` and instruct the user to pass in a positive integer again. The program basically ignores all errors that parse might encounter!
We finally print each integer the user passes and its corresponding Fibonacci value.
```Rust
println!(“fibonacci({ }) => { }”, int, fib(int));
```
The entire code should now look like this,
```rust
use std::io;
fn main () {
   println!("To end the program, type `exit` ");
   loop {
       println!("Type a positive integer");
       let mut int = String::new();
        io::stdin()
       .read_line(&mut int)
       .expect("");
       if int.trim() == "exit"{
           break;
       }
       let int: u32= match int.trim()
       .parse() {
           Ok(int) => int,
           Err(_) => continue,
       };
       println!("Fibonacci ({}) => {}", int, fib(int));
 
   }
  
}
 
fn fib (n: u32) -> u32 {
   if n <= 0 {
       return 0;
   } else if n == 1 {
       return 1;
   }   fib(n - 1) + fib(n - 2)
}
```
### Conclusion
This was a great exploration of several Rust concepts like variables, loops, match, conditionals and data types. You could also go through the [guessing game](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html) in the Rust book which I borrowed most concepts of this program from. Am looking forward to tackling more challenges and building better programs especially in the crypto space. Bye bye!

