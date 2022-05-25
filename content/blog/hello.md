---
title: Modifying software without source code - Part 1
description: In this series of blog posts I'll try to explain the process of modifying existing proprietary software without cooperation of the original developer.
---

In this series of blog posts I'll try to explain the process of modifying existing proprietary software without cooperation of the original developer.
You can do a bunch of things with this like making tweaks to games, Windows kernel & userland components and basically whatever software you feel comfortable reverse engineering.

In the first episode I'd like to explain a way to get our code inside your target program, assuming it's a normal Windows program, and show relevant code.

## Dynamic library injection
The simpelest way to get your code into an existing process is through DLL injection, to explain how it works we need to know how dynamic linking works.

Dynamic linking allows code to be split into multiple modules, that can then be loaded in either at load time or whenever they are required. They are often used for plugin systems because they are an incredibly easy way to load code. On Windows, this is done using the `LoadLibraryA(LPCSTR  lpLibFileName)` function. Sadly this function only allows us to load a dll into our own process, not into an already existing process, so how can we work around this?

## Plan of attack?
We have two options, either reimplement `LoadLibrary` (basically manual mapping), which isn't that difficult. But it does take quite a bunch of code and goes outside of the scope of this article. Instead what if there was a function that allows us to call other functions in the context of another process?

Introducing `CreateRemoteThread(HANDLE hProcess, ..., LPTHREAD_START_ROUTINE lpStartAddress, LPVOID lpParameter, ...)`, a function which allows you to spawn a new thread inside an already existing process, setting it's initial address to whatever function pointer you want and even allowing you to pass a single argument via lpParameter, this is perfect for calling `LoadLibrary`.

Now there are some more problems we have to solve, first of all we can't just pass a pointer to a string as the argument of `LoadLibrary` because that pointer will exist inside our process's memory space, not our target process meaning LoadLibrary would basically be fed a garbage pointer. Instead we need to allocate some memory inside our target process, copy our dll path inside of it and then we can call `LoadLibrary` using `CreateRemoteThread`.

This can be done using `VirtualAllocEx` & `WriteProcessMemory`.

This should be enough information to develop a tiny injector. The only thing left to figure out is how to obtain a process handle and that's up to you. You might want to make your injector target it's application based on pid or maybe process executable name. 

If you'd like to see some source code that implements this method of injection check out [modloader's win32 implementation](https://github.com/daanhenke/mods/blob/master/modloader/win32/inject.cc)

## Creating a DLL to inject
When LoadLibrary is done loading your DLL file it will execute the dll's main function, usually called `DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpReserved)`. This function will get called on load, unload, and whenever a thread get's created or destroyed.

We can use this as our entrypoint. Try creating a DllMain that calls `MessageBox` and inject it onto a program, you'll notice the window is part of the target process / program.

This obviously doesn't get you all the way there, you still aren't able to modify the program in a meaningful way but it is the first step into creating a mod.
