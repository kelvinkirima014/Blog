---
title: Understanding JavaScript Runtime and Event Loop.
description: Why is JavaScript single threaded but can still perfom asynchronous tasks?
date: 2020-11-21T11:00:00.000Z
---
Javascript is single-threaded, i.e, it executes only one operation at a time. This process of executing only one operation at a time on a single thread is the reason we say javascript is synchronous. But then what happens if a task takes too long to complete? Will all the other tasks be halted as we wait for this particular task to complete? This could clearly slow down our applications. To avoid such implications, javascript has a concurrency model based on the event loop that provides it with the ability to process multiple tasks asynchronously.
This article will help you understand why javascript is single-threaded and yet asynchronous by learning about the javascript runtime environment, the event loop and the mechanisms behind it.

## Javascript Runtime
Each browser has a Javascript runtime environment.
Here is an illustration to help us visualize the runtime.

![JSruntime](jsruntime.png)
So, the Javascript runtime consists of

### JavaScript Engine
Each browser uses its different version of the javascript engine. Some of the popular ones are V8(Chrome), Quantum(Firefox) and Webkit(Safari). Inside the engine, we have a memory heap and a call stack.

#### Memory Heap

Memory is allocated every time we create objects, declare functions or assign variables. This memory is stored in the heap.

#### Call Stack

The single-threaded nature of javascript is because it has only one call stack. Within the call stack, your javascript code is read and executed line by line. The call stack follows the First In Last Out (FILO) principle, the function that is first added is executed last. once a function gets executed it's then get popped off the stack. Let's look at some code to clear the concept.

```js
const getMovie = () =>{
	console.log ('Avengers')
}
getMovie()
// Avengers 
```
Here is how the JS engine handles this code...

- first, it parses the code to check for syntax errors and once it finds none, it goes on to execute the code.
- it sees the getMovie() call and it pushes it to the stack.

![cl](getmovies.png)

- getMovie() calls console.log() which then gets pushed to the top of the stack...

![cl2](getmovielog.png)

- JS engine executes that function and returns Avengers to the console. The log is then popped off the stack.

![cl3](eventloop3.png)

- The javascript engine then moves back to the getMovie() function, gets to its closing brackets and pops it off the stack(as it's done executing).
  
![cl3](eventloopk.png)

  As illustrated, the functions are added to the stack, executed and later deleted. Note that the function at the top of the stack is the one on focus and the JS engine only moves to the next frame(each entry in the call stack is called a stack frame) when the one above is returned and popped off the stack. This process of the call stack returning the frame at the top first before moving on to the next is why we say the JS engine runs **synchronously**.

Now suppose you want to fetch some data from an external file or you want to call an API that takes a while before it returns, You want the users to be able to continue using the program while waiting for the response, you cannot afford for your code to stop executing, javascript has a way to make this possible and here is where we introduce the **Web APIs**.

### Web APIs

The Web APIs are provided by the browser, they live inside the browser's javascript runtime environment but outside the javascript engine. HTTP, AJAX, Geolocation, DOM events and setTimeout are all examples of the web APIs. Let's use a code example to help us figure out how web APIs help us in writing asynchronous code.

```js
console.log ('1') // outputs 1 in the console
const getNumber = () =>{
//in this setTimeout, we set the timer to 1s (1000ms = 1s)
//and pass a callback that returns after 1s
setTimeout((cb)=>{
console.log('2')
}, 1000)
}
getNumber()
console.log('3')
//1
//3
//2
```

Let's evaluate how javascript runs this code and its output

- as usual, first, it parses the code looking for syntax errors and on finding none, it continues to execute the code.
- he first console.log is pushed to the stack, 1 is returned and its popped off the stack.
- the next function, getNumber(), is pushed to the stack
- getNumber() calls the setTimeout which is part of the web APIs, remember?
  
![cl4](eventloop1.png)

- When the setTimeout is called to the stack, the callback with the timer is added to the appropriate web API where the countdown starts. The setTimeout is popped out of the stack.
- getNumber() is done returning and consequently removed from the stack.
- the last console.log is added to the stack, returns 3 to the console, and removed from the stack.
  
![eloop](eloop.png)

  So, what happens after 1s and the timer countdown is finished? You would think that the callback is popped back from the web API to the call stack, but if it did this, the callback would randomly appear in the middle of some other code being executed, to prevent such a scenario, web API adds the callback to the *message queue* instead

The **message queue** is basically a data structure that javascript runtime uses to list messages that need to be processed. Unlike the call stack, the message queue uses the First In First Out(FIFO) principle, The first function added to the queue is processed first.

![cl5](eventloop2.png)

Now, how does javascript runtime know that the stack is empty? or how do events get pushed from the message queue to the call stack? enter the **event loop**.
The job of the event loop is to constantly monitor the call stack and the message queue. If the call stack is empty, it takes the first event on the message queue and pushes it to the call stack. Both the call stack and the message queue may be empty for some time, but the event loop never stops checking.

Back to our code, the **event loop** checks and sees that the call stack is empty, so it pushes our callback (cb) to the stack where it returns 2 to the console and is then removed from the stack. Our code is done executing.

### In addition
What would happen if we passed 0 milliseconds to setTimeout?

```js
const getCurrency = ()=>{
 setTimeout(()=>{
 console.log('dollar')
}, 0)
}
getCurrency()
const name = () =>{
console.log('Frank')
}
name()
// Frank
// dollar
```
If you copy the above code and view it in the console, you shall notice that Frank is printed first and then dollar. Here is how JS handles this code:
- first, it parses the code looking for syntax errors before going on to execute it.
- getCurrency() is pushed to the stack.
- getCurrency() calls setTimeout, JS engine sees its a web API and thus adds it to the web APIs and setTimeout is popped off the stack. getCurrency() is also removed from the stack.
- Since the timer is set to 0s, web API immediately pushes the callback to the message queue, consequently, the event loop checks to see if the stack is empty, but it's not because
- as soon as setTimeout was removed from the stack, name() got pushed to the stack immediately.
- name() calls console.log which returns Frank and pops off the stack.
- name() is done returning and is removed from the stack too.
- The event loop notices that the call stack is now empty and pushes the callback from the message queue to the call stack.
- The callback calls console.log, which returns dollar and pops off the stack. The callback is done executing and is removed from the stack. Our code is finally done executing.

This code shows us that calling the setTimeout with a delay of 0 milliseconds doesn't execute the callback after the specified interval, the delay is the minimum time required by the runtime to execute the callback and not a guaranteed time.
The callback has to wait for other queued messages to complete and the stack to clear before it's pushed to the stack and returned.

### Conclusion
Knowledge of the javascript runtime helps you understand how javascript runs under the hood and how different pieces fit together to make javascript the great language as we know it. I hope this article gave you a solid grasp of this fundamental concept. See yah!


