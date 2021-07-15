---
title: How Is Memory Allocated in Javascript?
description: The second post is the least memorable.
date: 2021-01-28T11:00:00.000Z
---
When writing javascript code, you usually don't have to worry about memory management. This is because javascript automatically allocates the memory when we create variables, objects and functions and releases the memory when they are not being used any more(the release of memory is known as garbage collection). Knowing how the memory is allocated is therefore not always necessary but it will help you gain more understanding of how javascript works and that is what you want, right?

### Memory Life Cycle

The memory life cycle is comprised of three steps, common across most programming languages. These steps are memory allocation, memory use and memory release.

### Memory Allocation

When you assign a variable, create an object or declare a function, some amount of memory has to be allocated.

```js
// allocating memory via a variable
const assignMemory = 'memory is assigned'

// allocating memory for an object and its values
const myObject = {
 name:'Kevin'
 title:'Programmer'
}
//memory allocation for functions
const getSum = (a,b) => a + b
}
```
### Memory use

Memory is used every time we work with data in our code, either read or write. When we change the value of an object or pass an argument to a function, we are basically using memory, cool!

### Memory Release

When we no longer use the variables and objects, javascript automatically relieves this memory for us. It is, however, difficult to determine when the allocated memory is no longer needed. Javascript uses some form of memory management known as garbage collection to monitor memory allocation and determine when allocated memory is no longer needed and release it. There is no method which can predict with complete accuracy which values are ready for release and as such the garbage collection process is mostly an approximation.

### Garbage Collection
Since it's not possible to entirely decide which memory is needed or not, garbage collectors use two algorithms to evaluate which objects can be removed from memory. Let's look at these algorithms and their limitations.

### Reference

In the reference counting algorithm, an object is evaluated as garbage if no other part of the code reference to it. Let's look at this code in order to get this concept clearly.

```js
//create an object in the global scope
const toWatch = { showName:'Big Bang Theory'}
//javascript allocates memory for the showName object
// the toWatch variable becomes reference for this object
//this existing reference prevents showName from being
//being removed by the garbage collector
```
The only existing reference to the showName object above is the toWatch variable. If you remove this variable, the garbage collector will know the object it pointed to is no longer needed and it will release it from the memory.

```js
const toWatch = null
//garbage collector will detect that
//the showName object is no longer reachable and
//not needed and it will release it from memory
```
The major drawback of this algorithm is that it does not pick up on circular reference. If two variables reference each other but are not needed on any other part of the code, the garbage collector will not remove them from memory as they are referenced and thus 'needed' as per the standards of this method.

```js
//create a function that has a circular reference
function circularRef(){
 const foo = {}
 const bar = {}
 foo.a = bar
 bar.a = foo
}
circularRef()
//though variables foo and bar don't exist outside
//this function, garbage collector will not count 
//them as ready for collection because they
//reference each other
```
### Mark and Sweep algorithm

This algorithm views an object as ready for collection if it is not connected to the root. In javascript, the root is the global object. The garbage collector visits all objects connected to the root(global object) and marks them as reachable or live. It then marks all objects that are connected to the root. This approach solves the circular reference problem because all elements not connected to the global object will not be marked as live, regardless of if it's referenced by other non-live elements.
Those elements that are not marked are considered unreachable and safe for collection.

### Conclusion

Memory allocation and garbage collection works automatically, as developers we do not have to trigger it or prevent it but I hope this article gave you a good grasp of the process and what happens on the background.