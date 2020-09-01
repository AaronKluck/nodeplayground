# Node.js SOLID Playground

I had never written a line of TypeScript or JavaScript in my life before making this playground project. So if you're looking for an idiomatic Node application, that's not what you'll find (unless I got lucky). What you you *will* find is a dependency-injected, 100% unit-tested application that does adheres to the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles of object-oriented software.

## What is SOLID?

SOLID is an acronym that I've become a fan of in recent years. Believe me, I had my doubts at first, but every time I've seen this done right, it has resulted in code that has been easier to understand, maintain, and extend. I'm sure you could Google it (or click one of my Wikipedia links) and find all sorts of information, but I'll still go through each letter of the acronym and give my take.

I've included quotes of how each principle of how each is formally defined, but a lot of them are gobbledegook or boil down to something much simpler in modern programming, so I redefine them after.

### S - [Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)

> A class should only have a single responsibility, that is, only changes to one part of the software's specification should be able to affect the specification of the class.

Decompose your application into small pieces, each of which knows as little about the world outside it as possible. Your database layer doesn't need to know part of a web application serving cat pictures.

- The code is less specialized to its use case within your application and is thus a lot more reusable.
- Changes to one component of a system are isolated to that component (and potentially to those that directly depend on it).
- The less a component has to care about the world outside it, the easier it is for a human being to understand what's going on inside it.
- Testing becomes more focused and easier to do *well*.

I think it's the most important part of SOLID. In my opinion, a lot of the other principles merely serve to reinforce **S** or make it more actionable.

### O - [Open–closed principle](https://en.wikipedia.org/wiki/Open-closed_principle)

> Software entities should be open for extension, but closed for modification.

A wordy way to say: use interfaces between the layers/components of your system. 

- This forces you to define the interaction between layers up front.
	- Once defined, these layers can be *written and tested in a vacuum*.
- Implementations can be swapped out without breaking the layers that use them.
- You can truly test your components in isolation, because you don't have to use the *real* dependencies while testing.
	- Making fake implementations of interfaces to test with is okay, and sometimes even the right thing to do, but now you have to maintain something that behaves consistently with the real thing for testing purposes.
	- Usually, it's better to use a mocks. Mocks are generated using mocking libraries and let you create simple implementations that behave *exactly* how you want

### L - [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

> Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.

The original principle warned to be careful with inheritance, but nowadays it boils down to: don't use inheritance.  Instead use composition.

I had trouble succinctly describing why this is important, but Google came to the [rescue](http://neethack.com/2017/04/Why-inheritance-is-bad/).

A notable exception is interfaces - it's okay to extend or combine interfaces by defining a larger interface that inherits from smaller ones.

### I - [Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)

> Many client-specific interfaces are better than one general-purpose interface.

Don't make giant interfaces. Make lots of small ones. Even a single method is fine! This does NOT mean that the *implementations* should be so numerous - a single concrete class can implement any number of interfaces, as makes sense.

As noted above for **L**, it will sometimes make sense to combine interfaces into larger ones. Some classes may depend on `IReader`, while others need `IWriter`, while still others would need both, so it makes sense to create `IReaderWriter` that inherits from both.

Just how far you decompose interfaces into smaller ones is a matter of preference. If you think it's excessive to separate `Read()` from `Write()`, that's fine. A lot depends on how the interface is being consumed.

### D - [Dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

> One should depend upon abstractions, not concretions.

Use dependency injection (DI), which means your high-level objects shouldn't construct the lower-level objects they depend on, but instead they should be *injected* into the high-level object's constructor. If any of your components `new` up something other than a dumb data structure, it probably should have been injected instead.

This ends up making your `main()` be  one big injection-fest. It gets ugly. But that ugliness allows the beautiful simplicity throughout the rest of your application to flourish!

This doesn't necessarily mean using a DI "framework", though those can make things easier if you can stomach the use of reflection. A DI framework lets you register a type of object as 

## Dependency Injection

The more decomposed your application, the crazier your `main()` will need to be. 
