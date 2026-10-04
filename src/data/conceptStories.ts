import { SpiderNode } from "./concepts";

export interface TakeawayPrompt {
  id: string;
  text: string;          // Strictly <= 100 characters!
  searchPrompt: string;  // Google search prompt triggered when clicked
  emoji: string;         // Primary reaction emoji (🔥, 🤯, 💡, 🚀, ⚡, 🎯)
  reactionCount: string; // e.g. "3.5k", "2.1k"
  commentCount: number;  // e.g. 240, 160
}

export interface ConceptTakeaways {
  id: string;
  title: string;
  badge?: string;
  tagline: string;
  takeaways: TakeawayPrompt[]; // 3 Key Takeaways ranked by max reaction
}

export const HANDCRAFTED_TAKEAWAYS: Record<string, ConceptTakeaways> = {
  // ==========================================
  // ROOT / MASTER NODES
  // ==========================================
  "root-all": {
    id: "root-all",
    title: "Node.js & JavaScript",
    badge: "Master Web",
    tagline: "Single-threaded JS engine backed by asynchronous C++ libuv workers",
    takeaways: [
      {
        id: "all-1",
        text: "Single-threaded JS delegates heavy I/O to libuv C++ threads for massive concurrency.",
        searchPrompt: "Node.js architecture single thread JavaScript libuv asynchronous non-blocking",
        emoji: "🔥",
        reactionCount: "4.2k",
        commentCount: 312,
      },
      {
        id: "all-2",
        text: "Non-blocking event loop prevents server freeze while handling thousands of sockets.",
        searchPrompt: "how Node.js event loop handles thousands of concurrent connections",
        emoji: "🚀",
        reactionCount: "2.9k",
        commentCount: 194,
      },
      {
        id: "all-3",
        text: "Browser JS handles DOM UI while Node.js expands runtime to filesystem and network APIs.",
        searchPrompt: "difference between browser JavaScript runtime and Node.js server runtime",
        emoji: "💡",
        reactionCount: "1.7k",
        commentCount: 86,
      },
    ],
  },

  "root-v8": {
    id: "root-v8",
    title: "V8 Engine",
    badge: "Core Engine",
    tagline: "Google's open-source C++ high-performance JavaScript & WebAssembly engine",
    takeaways: [
      {
        id: "v8-1",
        text: "TurboFan compiles hot JavaScript functions directly into raw machine instructions.",
        searchPrompt: "Google V8 TurboFan hot path machine code optimization explained",
        emoji: "🔥",
        reactionCount: "3.5k",
        commentCount: 245,
      },
      {
        id: "v8-2",
        text: "Monomorphic function calls run 10x faster because V8 skips polymorphic type checks.",
        searchPrompt: "V8 monomorphic vs polymorphic inline cache JavaScript performance",
        emoji: "🤯",
        reactionCount: "2.3k",
        commentCount: 162,
      },
      {
        id: "v8-3",
        text: "Generational GC splits memory into Young Scavenger and Old Mark-Sweep spaces.",
        searchPrompt: "Google V8 garbage collection scavenge mark-sweep compaction heap",
        emoji: "💡",
        reactionCount: "1.6k",
        commentCount: 98,
      },
    ],
  },

  "v8-js-exec": {
    id: "v8-js-exec",
    title: "JavaScript Execution Pipeline",
    badge: "9 Sequential Steps",
    tagline: "From raw source text down to optimized native binary machine instructions",
    takeaways: [
      {
        id: "v8-pipe-1",
        text: "Parser converts code into AST, then Ignition generates and executes bytecode.",
        searchPrompt: "V8 JavaScript execution pipeline parser AST bytecode Ignition",
        emoji: "⚙️",
        reactionCount: "4.6k",
        commentCount: 320,
      },
      {
        id: "v8-pipe-2",
        text: "Hot code paths are compiled into optimized CPU machine instructions via TurboFan.",
        searchPrompt: "V8 TurboFan JIT compiler optimization hot code path",
        emoji: "🔥",
        reactionCount: "3.2k",
        commentCount: 215,
      },
      {
        id: "v8-pipe-3",
        text: "Deoptimization bails back to Ignition if type assumptions suddenly change.",
        searchPrompt: "V8 deoptimization bailout mechanism when types change",
        emoji: "⚡",
        reactionCount: "2.1k",
        commentCount: 140,
      },
    ],
  },

  "root-scope": {
    id: "root-scope",
    title: "Scope & Closures",
    badge: "Language Core",
    tagline: "Lexical scope hierarchies and function closure variable preservation",
    takeaways: [
      {
        id: "scope-1",
        text: "Lexical scope is determined by where variables and blocks are authored in code.",
        searchPrompt: "JavaScript lexical scope chain boundary explained with examples",
        emoji: "🔥",
        reactionCount: "3.2k",
        commentCount: 220,
      },
      {
        id: "scope-2",
        text: "Closures preserve references to outer variables even after the parent function exits.",
        searchPrompt: "JavaScript closures how inner functions retain outer scope variables",
        emoji: "🤯",
        reactionCount: "2.7k",
        commentCount: 189,
      },
      {
        id: "scope-3",
        text: "let and const provide true block-level scoping delimited by curly braces.",
        searchPrompt: "let const block scope vs var function scope JavaScript difference",
        emoji: "💡",
        reactionCount: "1.5k",
        commentCount: 84,
      },
    ],
  },

  "root-node": {
    id: "root-node",
    title: "Node.js Runtime",
    badge: "System Runtime",
    tagline: "Asynchronous event-driven JavaScript runtime built on Chrome's V8 engine",
    takeaways: [
      {
        id: "node-1",
        text: "Node.js combines Chrome V8 engine with libuv for event-driven asynchronous I/O.",
        searchPrompt: "Node.js architecture single thread event loop libuv worker threads",
        emoji: "🔥",
        reactionCount: "3.9k",
        commentCount: 340,
      },
      {
        id: "node-2",
        text: "Asynchronous APIs hand operations to kernel or threadpool without blocking JS.",
        searchPrompt: "non-blocking IO asynchronous architecture Node.js benefits",
        emoji: "🚀",
        reactionCount: "2.4k",
        commentCount: 162,
      },
      {
        id: "node-3",
        text: "Synchronous CPU loops block the event loop, freezing all concurrent client requests.",
        searchPrompt: "how CPU intensive tasks block Node.js event loop worker threads solution",
        emoji: "🤯",
        reactionCount: "2.0k",
        commentCount: 135,
      },
    ],
  },

  // ==========================================
  // V8 PILLARS & CONCEPTS
  // ==========================================
  "v8-stack-pillar": {
    id: "v8-stack-pillar",
    title: "Execution Stack (Call Stack)",
    badge: "Call Stack",
    tagline: "The LIFO stack frame structure tracking active JavaScript execution context",
    takeaways: [
      {
        id: "stack-1",
        text: "Call stack strictly follows Last In First Out (LIFO) to manage active function frames.",
        searchPrompt: "JavaScript call stack LIFO execution stack frames explained",
        emoji: "🔥",
        reactionCount: "2.8k",
        commentCount: 180,
      },
      {
        id: "stack-2",
        text: "Unterminated recursion triggers RangeError: Maximum call stack size exceeded.",
        searchPrompt: "JavaScript maximum call stack size exceeded RangeError cause and fix",
        emoji: "🤯",
        reactionCount: "1.9k",
        commentCount: 115,
      },
      {
        id: "stack-3",
        text: "Stack frames store local variables, arguments, and return pointer addresses.",
        searchPrompt: "JavaScript stack frame activation record memory allocation",
        emoji: "💡",
        reactionCount: "1.2k",
        commentCount: 64,
      },
    ],
  },

  "v8-lifo": {
    id: "v8-lifo",
    title: "LIFO Execution Order",
    badge: "Mechanism",
    tagline: "Last In, First Out processing order governing synchronous calls",
    takeaways: [
      {
        id: "lifo-1",
        text: "The newest function added to the call stack must finish executing before parent resumes.",
        searchPrompt: "Last In First Out LIFO JavaScript call stack execution order",
        emoji: "🔥",
        reactionCount: "2.4k",
        commentCount: 132,
      },
      {
        id: "lifo-2",
        text: "Inner nested callbacks resolve first while parent execution contexts wait in pause.",
        searchPrompt: "nested function call stack execution order JavaScript LIFO",
        emoji: "💡",
        reactionCount: "1.7k",
        commentCount: 90,
      },
      {
        id: "lifo-3",
        text: "LIFO architecture is the foundational data structure behind browser undo and redo.",
        searchPrompt: "LIFO stack data structure real world applications undo history",
        emoji: "🚀",
        reactionCount: "950",
        commentCount: 52,
      },
    ],
  },

  "v8-jit": {
    id: "v8-jit",
    title: "JIT (Just-In-Time Compilation)",
    badge: "Compiler",
    tagline: "Runtime machine code translation powered by Ignition and TurboFan",
    takeaways: [
      {
        id: "jit-1",
        text: "TurboFan compiles optimized native CPU machine code dynamically at runtime.",
        searchPrompt: "V8 JIT compilation how TurboFan optimizes JavaScript at runtime",
        emoji: "🔥",
        reactionCount: "3.6k",
        commentCount: 280,
      },
      {
        id: "jit-2",
        text: "Passing unexpected argument types triggers deoptimization back to bytecode.",
        searchPrompt: "JavaScript JIT deoptimization bailouts how to prevent",
        emoji: "🤯",
        reactionCount: "2.5k",
        commentCount: 174,
      },
      {
        id: "jit-3",
        text: "Maglev acts as a high-speed mid-tier compiler between Sparkplug and TurboFan.",
        searchPrompt: "V8 Maglev mid tier compiler architecture explained",
        emoji: "⚡",
        reactionCount: "1.8k",
        commentCount: 105,
      },
    ],
  },

  "scope-closure": {
    id: "scope-closure",
    title: "Closure Mechanism",
    badge: "Core Feature",
    tagline: "Persistent lexical scope references preserved after function lifecycle ends",
    takeaways: [
      {
        id: "cls-1",
        text: "Closures keep referenced parent variables alive in the heap after function returns.",
        searchPrompt: "how JavaScript closures keep variables in memory heap memory leak",
        emoji: "🔥",
        reactionCount: "2.9k",
        commentCount: 205,
      },
      {
        id: "cls-2",
        text: "Enables private state encapsulation and factory functions without class syntax.",
        searchPrompt: "JavaScript module pattern using closures for data privacy",
        emoji: "💡",
        reactionCount: "1.8k",
        commentCount: 118,
      },
      {
        id: "cls-3",
        text: "Every function instance holds an internal [[Environment]] reference to outer scope.",
        searchPrompt: "ECMAScript internal Environment record slot closure mechanism",
        emoji: "🚀",
        reactionCount: "1.1k",
        commentCount: 67,
      },
    ],
  },

  "node-eventloop-pillar": {
    id: "node-eventloop-pillar",
    title: "The Event Loop",
    badge: "Core Loop",
    tagline: "Single-threaded orchestrator processing non-blocking asynchronous callbacks",
    takeaways: [
      {
        id: "evl-1",
        text: "Cycles through 6 phases: Timers, Pending I/O, Idle, Poll, Check, and Close callbacks.",
        searchPrompt: "Node.js event loop 6 phases timers pending poll check close",
        emoji: "🔥",
        reactionCount: "3.7k",
        commentCount: 290,
      },
      {
        id: "evl-2",
        text: "process.nextTick queue drains completely between every single phase transition.",
        searchPrompt: "process.nextTick vs Promise.then microtask queue priority Event loop",
        emoji: "🤯",
        reactionCount: "2.9k",
        commentCount: 210,
      },
      {
        id: "evl-3",
        text: "setImmediate executes during Check phase, right after incoming I/O poll events.",
        searchPrompt: "setImmediate vs setTimeout 0 execution order Node.js Event loop",
        emoji: "💡",
        reactionCount: "1.6k",
        commentCount: 95,
      },
    ],
  },

  "node-libuv-pillar": {
    id: "node-libuv-pillar",
    title: "libuv Asynchronous I/O",
    badge: "C++ Engine",
    tagline: "Multi-platform asynchronous I/O engine with thread pool and event notification",
    takeaways: [
      {
        id: "uv-1",
        text: "libuv provides a 4-thread worker pool for disk files, DNS queries, and crypto.",
        searchPrompt: "libuv thread pool default size UV_THREADPOOL_SIZE Node.js",
        emoji: "🔥",
        reactionCount: "3.4k",
        commentCount: 230,
      },
      {
        id: "uv-2",
        text: "Sockets and network I/O use kernel epoll/kqueue without using worker pool threads.",
        searchPrompt: "how libuv handles network IO epoll kqueue without threadpool",
        emoji: "🤯",
        reactionCount: "2.2k",
        commentCount: 145,
      },
      {
        id: "uv-3",
        text: "Set UV_THREADPOOL_SIZE up to 128 to scale throughput for heavy disk read workloads.",
        searchPrompt: "how to increase Node.js UV_THREADPOOL_SIZE for crypto and fs performance",
        emoji: "🚀",
        reactionCount: "1.4k",
        commentCount: 80,
      },
    ],
  },

  "node-apis-pillar": {
    id: "node-apis-pillar",
    title: "Node.js Built-in APIs",
    badge: "Core System APIs",
    tagline: "C++ backed system modules for file I/O, network sockets, timers, and microtasks",
    takeaways: [
      {
        id: "n-api-1",
        text: "Core modules (fs, http, timers) wrap native OS system calls via C++ bindings.",
        searchPrompt: "Node.js built in modules fs http timers C++ bindings",
        emoji: "📦",
        reactionCount: "3.8k",
        commentCount: 260,
      },
      {
        id: "n-api-2",
        text: "fs.readFile offloads disk I/O to libuv threadpool so the main stack stays non-blocking.",
        searchPrompt: "how fs.readFile works asynchronously libuv threadpool Node.js",
        emoji: "⚡",
        reactionCount: "2.9k",
        commentCount: 185,
      },
      {
        id: "n-api-3",
        text: "process.nextTick schedules high-priority microtasks between event loop phase ticks.",
        searchPrompt: "process.nextTick priority over setTimeout setImmediate Node.js",
        emoji: "🚀",
        reactionCount: "1.9k",
        commentCount: 120,
      },
    ],
  },

  "node-phases-pillar": {
    id: "node-phases-pillar",
    title: "Event Loop 5 Phases",
    badge: "Tick Cycle Order",
    tagline: "Sequential callback execution order across the event loop ticking cycle",
    takeaways: [
      {
        id: "n-ph-1",
        text: "Loop ticks through Timers, Pending I/O, Poll, Check (setImmediate), and Close callbacks.",
        searchPrompt: "Node.js event loop 5 phases execution order explained",
        emoji: "🔄",
        reactionCount: "4.7k",
        commentCount: 340,
      },
      {
        id: "n-ph-2",
        text: "Poll phase retrieves incoming I/O events, followed immediately by setImmediate in Check.",
        searchPrompt: "Poll phase vs Check phase setImmediate Node.js Event Loop",
        emoji: "💡",
        reactionCount: "3.1k",
        commentCount: 210,
      },
      {
        id: "n-ph-3",
        text: "Microtasks (nextTick and Promise.then) drain completely after every phase boundary.",
        searchPrompt: "when microtasks run in Node.js event loop phases",
        emoji: "🔥",
        reactionCount: "2.2k",
        commentCount: 145,
      },
    ],
  },

  // ==========================================
  // OOP 4 PILLARS & ANALOGIES
  // ==========================================
  "root-oop": {
    id: "root-oop",
    title: "OOP (4 Pillars)",
    badge: "Design Paradigm",
    tagline: "Object-oriented architectures explained through intuitive real-world stories",
    takeaways: [
      {
        id: "oop-root-1",
        text: "OOP organizes complex software into modular objects containing state and behavior.",
        searchPrompt: "Object oriented programming 4 pillars principles JavaScript",
        emoji: "🔥",
        reactionCount: "4.5k",
        commentCount: 320,
      },
      {
        id: "oop-root-2",
        text: "Four pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction guide design.",
        searchPrompt: "encapsulation inheritance polymorphism abstraction JavaScript examples",
        emoji: "💡",
        reactionCount: "3.2k",
        commentCount: 210,
      },
      {
        id: "oop-root-3",
        text: "Real-world stories: Cookie cutters, piggy banks, robots, buttons, and car pedals.",
        searchPrompt: "funny real world analogies for OOP object oriented programming",
        emoji: "🍪",
        reactionCount: "2.1k",
        commentCount: 140,
      },
    ],
  },

  "oop-pillars-pillar": {
    id: "oop-pillars-pillar",
    title: "4 Pillars of OOP & Analogies",
    badge: "5 Design Concepts",
    tagline: "Cookie cutters, piggy banks, robots, game buttons, and gas pedals make OOP intuitive",
    takeaways: [
      {
        id: "oop-pil-1",
        text: "The 4 pillars (Encapsulation, Inheritance, Polymorphism, Abstraction) structure clean code.",
        searchPrompt: "4 pillars of OOP object oriented programming JavaScript",
        emoji: "🔥",
        reactionCount: "4.8k",
        commentCount: 340,
      },
      {
        id: "oop-pil-2",
        text: "Cookie cutter creates objects, piggy bank guards data, robot shares traits, pedal hides engine.",
        searchPrompt: "funny real world analogies for OOP JavaScript beginner",
        emoji: "🍪",
        reactionCount: "3.5k",
        commentCount: 220,
      },
      {
        id: "oop-pil-3",
        text: "Combining all four pillars prevents spaghetti code and scales enterprise architectures.",
        searchPrompt: "OOP design patterns clean code JavaScript enterprise",
        emoji: "🚀",
        reactionCount: "2.1k",
        commentCount: 140,
      },
    ],
  },

  "oop-class-obj": {
    id: "oop-class-obj",
    title: "Class & Object",
    badge: "🍪 Cookie Cutter",
    tagline: "The cookie cutter is the class; the cookie is the real object in memory",
    takeaways: [
      {
        id: "oop-co-1",
        text: "A cookie cutter (class) is the shape blueprint; the cookie is the real object baked in heap.",
        searchPrompt: "class and object cookie cutter analogy JavaScript",
        emoji: "🍪",
        reactionCount: "3.9k",
        commentCount: 260,
      },
      {
        id: "oop-co-2",
        text: "JavaScript 'new' keyword creates a fresh instance linked to constructor prototype.",
        searchPrompt: "JavaScript new keyword prototype chain instance creation",
        emoji: "💡",
        reactionCount: "2.4k",
        commentCount: 165,
      },
      {
        id: "oop-co-3",
        text: "Classes share identical method blueprints while each object stores unique state properties.",
        searchPrompt: "class methods vs object instance properties JavaScript memory",
        emoji: "🚀",
        reactionCount: "1.7k",
        commentCount: 95,
      },
    ],
  },

  "oop-encapsulation": {
    id: "oop-encapsulation",
    title: "Encapsulation",
    badge: "🪙 Piggy Bank",
    tagline: "Coins stay hidden inside; you only interact through the safe coin slot",
    takeaways: [
      {
        id: "oop-enc-1",
        text: "Piggy bank story: internal coins stay hidden; you can only interact via the safe coin slot.",
        searchPrompt: "OOP Encapsulation piggy bank private properties JavaScript",
        emoji: "🪙",
        reactionCount: "4.1k",
        commentCount: 290,
      },
      {
        id: "oop-enc-2",
        text: "Use private fields (#balance) and getters/setters to guard internal state from tampering.",
        searchPrompt: "JavaScript private class fields hash symbol getters setters",
        emoji: "🔒",
        reactionCount: "2.8k",
        commentCount: 180,
      },
      {
        id: "oop-enc-3",
        text: "Hiding internal data boundaries prevents external components from causing unexpected state bugs.",
        searchPrompt: "why encapsulation prevents state corruption in complex systems",
        emoji: "💡",
        reactionCount: "1.9k",
        commentCount: 110,
      },
    ],
  },

  "oop-inheritance": {
    id: "oop-inheritance",
    title: "Inheritance",
    badge: "🤖 Base Robot",
    tagline: "Base robot abilities get reused for free by any new robot built on top of it",
    takeaways: [
      {
        id: "oop-inh-1",
        text: "Base robot story: abilities get reused for free by any new robot built on top of it.",
        searchPrompt: "JavaScript inheritance extends base robot analogy",
        emoji: "🤖",
        reactionCount: "3.7k",
        commentCount: 245,
      },
      {
        id: "oop-inh-2",
        text: "Subclasses use 'extends' and 'super()' to reuse parent behavior while adding custom upgrades.",
        searchPrompt: "JavaScript class extends super keyword prototype inheritance",
        emoji: "⚡",
        reactionCount: "2.3k",
        commentCount: 150,
      },
      {
        id: "oop-inh-3",
        text: "Avoid deeply nested inheritance hierarchies; favor composition when modularity is needed.",
        searchPrompt: "composition over inheritance JavaScript design patterns",
        emoji: "💡",
        reactionCount: "1.5k",
        commentCount: 88,
      },
    ],
  },

  "oop-polymorphism": {
    id: "oop-polymorphism",
    title: "Polymorphism",
    badge: "🎮 Same Button",
    tagline: "The same button press triggers different actions depending on the device receiving it",
    takeaways: [
      {
        id: "oop-poly-1",
        text: "Same button press story: triggers different actions depending on which device you press.",
        searchPrompt: "JavaScript Polymorphism method overriding same button analogy",
        emoji: "🎮",
        reactionCount: "4.3k",
        commentCount: 310,
      },
      {
        id: "oop-poly-2",
        text: "Multiple classes share the same method name (e.g. render()) with distinct implementations.",
        searchPrompt: "polymorphism method overriding JavaScript interfaces",
        emoji: "🤯",
        reactionCount: "2.7k",
        commentCount: 175,
      },
      {
        id: "oop-poly-3",
        text: "Eliminates messy if/else and switch type checks by letting objects execute their own logic.",
        searchPrompt: "replace conditional with polymorphism JavaScript refactoring",
        emoji: "🚀",
        reactionCount: "1.8k",
        commentCount: 105,
      },
    ],
  },

  "oop-abstraction": {
    id: "oop-abstraction",
    title: "Abstraction",
    badge: "🚗 Gas Pedal",
    tagline: "Press the gas pedal and car moves; you never need to know engine piston mechanics",
    takeaways: [
      {
        id: "oop-abs-1",
        text: "Car gas pedal story: press pedal and car goes; you never need to know how engine pistons fire.",
        searchPrompt: "OOP Abstraction car gas pedal complexity JavaScript",
        emoji: "🚗",
        reactionCount: "4.0k",
        commentCount: 275,
      },
      {
        id: "oop-abs-2",
        text: "Hides massive underlying complexity behind clear, minimalist public API interfaces.",
        searchPrompt: "software abstraction layer API design simplicity",
        emoji: "💡",
        reactionCount: "2.6k",
        commentCount: 160,
      },
      {
        id: "oop-abs-3",
        text: "Node.js fs.readFile() is abstraction: you read files without knowing OS disk track sectors.",
        searchPrompt: "how high level APIs abstract OS syscalls Node.js",
        emoji: "🔥",
        reactionCount: "1.9k",
        commentCount: 115,
      },
    ],
  },

  // ==========================================
  // DATA STRUCTURES
  // ==========================================
  "root-dsa": {
    id: "root-dsa",
    title: "DSA & Big O",
    badge: "CS Foundations",
    tagline: "Fundamental storage structures and asymptotic runtime complexity tiers",
    takeaways: [
      {
        id: "dsa-root-1",
        text: "Data structures determine memory layout; Big O measures how runtime scales with data size.",
        searchPrompt: "data structures and algorithms Big O notation JavaScript",
        emoji: "🔥",
        reactionCount: "4.8k",
        commentCount: 350,
      },
      {
        id: "dsa-root-2",
        text: "Pick structures to match access patterns: O(1) hash maps for lookups, trees for hierarchy.",
        searchPrompt: "choosing the right data structure for performance JavaScript",
        emoji: "💡",
        reactionCount: "3.1k",
        commentCount: 220,
      },
      {
        id: "dsa-root-3",
        text: "Complexity tiers rank best to worst: O(1) constant down to O(n!) factorial blowout.",
        searchPrompt: "Big O time complexity chart best to worst order",
        emoji: "🚀",
        reactionCount: "2.4k",
        commentCount: 155,
      },
    ],
  },

  "dsa-structures-pillar": {
    id: "dsa-structures-pillar",
    title: "Data Structures & Analogies",
    badge: "7 Core Structures",
    tagline: "Parking lots, pancake stacks, coffee queues, clue hunts, family trees, and phonebooks",
    takeaways: [
      {
        id: "dsa-ds-1",
        text: "Data structures are memory containers tailored for specific access and lookup patterns.",
        searchPrompt: "Data structures JavaScript real world analogies explained",
        emoji: "📦",
        reactionCount: "4.7k",
        commentCount: 330,
      },
      {
        id: "dsa-ds-2",
        text: "Pick arrays for indexes, stacks for LIFO history, queues for FIFO jobs, maps for O(1) keys.",
        searchPrompt: "when to use which data structure JavaScript performance",
        emoji: "💡",
        reactionCount: "3.2k",
        commentCount: 215,
      },
      {
        id: "dsa-ds-3",
        text: "Trees model hierarchies like the DOM; graphs connect complex many-to-many relationships.",
        searchPrompt: "trees and graphs data structure real world examples",
        emoji: "🌳",
        reactionCount: "2.3k",
        commentCount: 150,
      },
    ],
  },

  "dsa-big-o-pillar": {
    id: "dsa-big-o-pillar",
    title: "Big O Time Complexity",
    badge: "7 Growth Tiers",
    tagline: "From O(1) instant phonebook lookups to O(n!) explosive permutation blowouts",
    takeaways: [
      {
        id: "dsa-bo-1",
        text: "Big O ranks algorithm efficiency: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).",
        searchPrompt: "Big O time complexity best to worst tier list",
        emoji: "⏱️",
        reactionCount: "5.1k",
        commentCount: 390,
      },
      {
        id: "dsa-bo-2",
        text: "Green tiers (O(1), O(log n), O(n)) scale cleanly; Red tiers (O(2ⁿ), O(n!)) crash servers.",
        searchPrompt: "Big O complexity chart green yellow red zones",
        emoji: "🔥",
        reactionCount: "3.6k",
        commentCount: 245,
      },
      {
        id: "dsa-bo-3",
        text: "Always benchmark nested loops and recursive forks to eliminate quadratic bottlenecks.",
        searchPrompt: "how to identify and fix high Big O bottlenecks in code",
        emoji: "🚀",
        reactionCount: "2.4k",
        commentCount: 160,
      },
    ],
  },

  "ds-array": {
    id: "ds-array",
    title: "Array / List",
    badge: "🚗 Numbered Parking",
    tagline: "Numbered parking lot: jump straight to any spot instantly by its index number",
    takeaways: [
      {
        id: "ds-arr-1",
        text: "Numbered parking lot story: jump straight to any spot instantly by its integer index number.",
        searchPrompt: "JavaScript Array numbered parking lot index lookup contiguous memory",
        emoji: "🚗",
        reactionCount: "3.6k",
        commentCount: 230,
      },
      {
        id: "ds-arr-2",
        text: "Contiguous memory grants O(1) random access by index, but middle insertions take O(n).",
        searchPrompt: "array contiguous memory O(1) access O(n) insertion shifting",
        emoji: "⚡",
        reactionCount: "2.2k",
        commentCount: 140,
      },
      {
        id: "ds-arr-3",
        text: "V8 optimizes arrays into packed C++ arrays; empty holes deoptimize into hash dictionaries.",
        searchPrompt: "V8 array elements kinds packed vs holey performance",
        emoji: "🤯",
        reactionCount: "1.6k",
        commentCount: 92,
      },
    ],
  },

  "ds-stack": {
    id: "ds-stack",
    title: "Stack (LIFO)",
    badge: "🥞 Pancake Plate",
    tagline: "Pancake plate: Last In First Out; you can only touch or eat from the very top",
    takeaways: [
      {
        id: "ds-stk-1",
        text: "Pancake plate story: LIFO (Last In First Out); you can only place or eat from the top plate.",
        searchPrompt: "Stack data structure pancake plate LIFO JavaScript",
        emoji: "🥞",
        reactionCount: "4.4k",
        commentCount: 315,
      },
      {
        id: "ds-stk-2",
        text: "Push and pop operate in ultra-fast O(1) constant time with zero memory element shifting.",
        searchPrompt: "stack push pop O(1) time complexity JavaScript",
        emoji: "⚡",
        reactionCount: "2.7k",
        commentCount: 170,
      },
      {
        id: "ds-stk-3",
        text: "The JavaScript Call Stack operates as a stack: active function calls pile on top of frames.",
        searchPrompt: "how JavaScript call stack uses LIFO stack data structure",
        emoji: "🔥",
        reactionCount: "1.8k",
        commentCount: 110,
      },
    ],
  },

  "ds-queue": {
    id: "ds-queue",
    title: "Queue (FIFO)",
    badge: "☕ Coffee Shop Line",
    tagline: "Coffee shop line: First In First Out; join at back, served from the front",
    takeaways: [
      {
        id: "ds-que-1",
        text: "Coffee shop line story: FIFO (First In First Out); join at back, served from the front.",
        searchPrompt: "Queue data structure coffee shop line FIFO JavaScript",
        emoji: "☕",
        reactionCount: "4.2k",
        commentCount: 295,
      },
      {
        id: "ds-que-2",
        text: "Enqueue adds to the tail and dequeue removes from head, guaranteeing fair processing order.",
        searchPrompt: "queue enqueue dequeue FIFO algorithms JavaScript",
        emoji: "💡",
        reactionCount: "2.5k",
        commentCount: 155,
      },
      {
        id: "ds-que-3",
        text: "The Event Loop uses queues (Microtask Queue, Task Queue) to order ready async callbacks.",
        searchPrompt: "Node.js event loop queues FIFO callback execution",
        emoji: "🚀",
        reactionCount: "1.9k",
        commentCount: 120,
      },
    ],
  },

  "ds-linked-list": {
    id: "ds-linked-list",
    title: "Linked List",
    badge: "🗺️ Treasure Hunt",
    tagline: "Treasure hunt clues: each clue box only knows the coordinates to the next box",
    takeaways: [
      {
        id: "ds-ll-1",
        text: "Treasure hunt story: each clue box only knows the coordinates where the next box is buried.",
        searchPrompt: "Linked List data structure treasure hunt pointers JavaScript",
        emoji: "🗺️",
        reactionCount: "3.8k",
        commentCount: 250,
      },
      {
        id: "ds-ll-2",
        text: "Nodes link via pointers; allows O(1) head/tail insertions without contiguous memory blocks.",
        searchPrompt: "singly doubly linked list insertion deletion O(1) time",
        emoji: "⚡",
        reactionCount: "2.3k",
        commentCount: 145,
      },
      {
        id: "ds-ll-3",
        text: "Searching takes O(n) because you must walk from the head node through every clue pointer.",
        searchPrompt: "linked list vs array lookup time sequential traversal",
        emoji: "💡",
        reactionCount: "1.5k",
        commentCount: 88,
      },
    ],
  },

  "ds-tree": {
    id: "ds-tree",
    title: "Tree",
    badge: "🌳 Family Tree",
    tagline: "Family tree: one parent at the top, branches downward, and never loops back up",
    takeaways: [
      {
        id: "ds-tr-1",
        text: "Family tree story: one root parent at top, branches downward, and never loops back up.",
        searchPrompt: "Tree data structure family tree binary search tree JavaScript",
        emoji: "🌳",
        reactionCount: "3.7k",
        commentCount: 240,
      },
      {
        id: "ds-tr-2",
        text: "Hierarchical parent-child nodes power the browser DOM, V8 AST, and file directories.",
        searchPrompt: "how DOM tree and AST use tree data structure",
        emoji: "💡",
        reactionCount: "2.4k",
        commentCount: 150,
      },
      {
        id: "ds-tr-3",
        text: "Binary Search Trees (BST) discard half the sub-tree on each step, offering fast O(log n) lookups.",
        searchPrompt: "binary search tree O(log n) search insertion JavaScript",
        emoji: "🚀",
        reactionCount: "1.7k",
        commentCount: 98,
      },
    ],
  },

  "ds-graph": {
    id: "ds-graph",
    title: "Graph",
    badge: "🕸️ Social Network",
    tagline: "Social network map: anyone connects to anyone via edges; no fixed top or parent",
    takeaways: [
      {
        id: "ds-gr-1",
        text: "Social network story: anyone connects to anyone; friends link via edges with no single top.",
        searchPrompt: "Graph data structure social network connections JavaScript",
        emoji: "🕸️",
        reactionCount: "4.1k",
        commentCount: 280,
      },
      {
        id: "ds-gr-2",
        text: "Vertices (people) and edges (friendships) model networks, GPS routes, and module imports.",
        searchPrompt: "graph vertices edges adjacency list JavaScript",
        emoji: "💡",
        reactionCount: "2.6k",
        commentCount: 165,
      },
      {
        id: "ds-gr-3",
        text: "Breadth-First Search (BFS) finds shortest paths; Depth-First Search (DFS) discovers cycles.",
        searchPrompt: "BFS vs DFS graph traversal algorithms JavaScript",
        emoji: "🚀",
        reactionCount: "1.9k",
        commentCount: 118,
      },
    ],
  },

  "ds-hashmap": {
    id: "ds-hashmap",
    title: "Hash Map / Object",
    badge: "📖 Phonebook",
    tagline: "Phonebook: look up by name (key) and get the telephone value instantly",
    takeaways: [
      {
        id: "ds-hm-1",
        text: "Phonebook story: look up a friend by name (key) and read their number (value) instantly.",
        searchPrompt: "Hash map data structure phonebook O(1) JavaScript",
        emoji: "📖",
        reactionCount: "4.6k",
        commentCount: 330,
      },
      {
        id: "ds-hm-2",
        text: "Hash function converts string keys to array bucket indices for instantaneous O(1) lookups.",
        searchPrompt: "how hash table hash function works bucket collision",
        emoji: "⚡",
        reactionCount: "2.9k",
        commentCount: 185,
      },
      {
        id: "ds-hm-3",
        text: "JavaScript Objects and Map instances are built on hash table lookup architectures.",
        searchPrompt: "JavaScript Map vs Object hash map implementation V8",
        emoji: "🔥",
        reactionCount: "2.1k",
        commentCount: 135,
      },
    ],
  },

  // ==========================================
  // BIG O TIME COMPLEXITY (BEST TO WORST)
  // ==========================================
  "big-o-1": {
    id: "big-o-1",
    title: "O(1) Constant",
    badge: "📖 Phonebook: Instant",
    tagline: "Same instant speed no matter whether searching 10 or 10,000,000 items",
    takeaways: [
      {
        id: "bo-1-1",
        text: "Phonebook story: same instant speed whether searching through 10 or 1,000,000 items.",
        searchPrompt: "Big O O(1) constant time phonebook lookup JavaScript",
        emoji: "📖",
        reactionCount: "4.7k",
        commentCount: 340,
      },
      {
        id: "bo-1-2",
        text: "Peak algorithmic efficiency: execution time is flat and unaffected by input size growth.",
        searchPrompt: "O(1) time complexity examples array index hash map",
        emoji: "⚡",
        reactionCount: "3.0k",
        commentCount: 190,
      },
      {
        id: "bo-1-3",
        text: "Array index access, hash map lookups, and stack push/pop all run in O(1) constant time.",
        searchPrompt: "O(1) operations in JavaScript V8 runtime",
        emoji: "🚀",
        reactionCount: "2.2k",
        commentCount: 140,
      },
    ],
  },

  "big-o-logn": {
    id: "big-o-logn",
    title: "O(log n) Logarithmic",
    badge: "🎯 Guessing Game",
    tagline: "Guessing game: cuts the remaining search pile in half with every single guess",
    takeaways: [
      {
        id: "bo-logn-1",
        text: "Guessing game story: binary search cuts the remaining search pile in half each step.",
        searchPrompt: "Big O O(log n) logarithmic binary search guessing game",
        emoji: "🎯",
        reactionCount: "4.3k",
        commentCount: 305,
      },
      {
        id: "bo-logn-2",
        text: "Searching 1,000,000 sorted items requires at most 20 checks because log2(1,000,000) ≈ 20.",
        searchPrompt: "logarithmic time complexity log2 n binary search",
        emoji: "🤯",
        reactionCount: "2.8k",
        commentCount: 180,
      },
      {
        id: "bo-logn-3",
        text: "Powers database index B-trees and balanced search trees; data must be sorted first.",
        searchPrompt: "database index B-tree logarithmic O(log n) search",
        emoji: "💡",
        reactionCount: "1.9k",
        commentCount: 115,
      },
    ],
  },

  "big-o-n": {
    id: "big-o-n",
    title: "O(n) Linear",
    badge: "🍬 Check Every Candy",
    tagline: "Check every candy once: scanning a list grows in direct 1:1 proportion to size",
    takeaways: [
      {
        id: "bo-n-1",
        text: "Candy check story: scan a candy bag by inspecting every single candy piece exactly once.",
        searchPrompt: "Big O O(n) linear search scan list once",
        emoji: "🍬",
        reactionCount: "3.9k",
        commentCount: 260,
      },
      {
        id: "bo-n-2",
        text: "Linear scaling: doubling the items doubles the time. Standard for single loops.",
        searchPrompt: "linear time complexity O(n) for loop array filter find",
        emoji: "💡",
        reactionCount: "2.4k",
        commentCount: 150,
      },
      {
        id: "bo-n-3",
        text: "Array.prototype.find, includes, and filter iterate all items, scaling at O(n).",
        searchPrompt: "JavaScript array methods time complexity find includes",
        emoji: "⚡",
        reactionCount: "1.7k",
        commentCount: 95,
      },
    ],
  },

  "big-o-nlogn": {
    id: "big-o-nlogn",
    title: "O(n log n) Linearithmic",
    badge: "✂️ Split & Merge",
    tagline: "Split the pile in half recursively, then merge sorted halves back together",
    takeaways: [
      {
        id: "bo-nlogn-1",
        text: "Split and merge story: divide the pile in half, sort the pieces, then merge them back.",
        searchPrompt: "Big O O(n log n) merge sort quick sort divide conquer",
        emoji: "✂️",
        reactionCount: "4.1k",
        commentCount: 285,
      },
      {
        id: "bo-nlogn-2",
        text: "The mathematical fastest possible speed for comparison-based sorting algorithms.",
        searchPrompt: "why comparison sorting lower bound is O(n log n)",
        emoji: "🤯",
        reactionCount: "2.6k",
        commentCount: 170,
      },
      {
        id: "bo-nlogn-3",
        text: "V8 Array.prototype.sort uses TimSort, scaling at smooth O(n log n) linearithmic speed.",
        searchPrompt: "V8 JavaScript Array sort TimSort time complexity",
        emoji: "🚀",
        reactionCount: "1.8k",
        commentCount: 110,
      },
    ],
  },

  "big-o-n2": {
    id: "big-o-n2",
    title: "O(n²) Quadratic",
    badge: "🔄 Nested Loop",
    tagline: "Loop inside a loop: compare every single person with every other person in a room",
    takeaways: [
      {
        id: "bo-n2-1",
        text: "Loop inside loop story: compare every single item with every other item in the dataset.",
        searchPrompt: "Big O O(n^2) quadratic bubble sort nested loops",
        emoji: "🔄",
        reactionCount: "4.0k",
        commentCount: 270,
      },
      {
        id: "bo-n2-2",
        text: "Quadratic danger: 1,000 items require 1,000,000 comparisons; freezes UI threads easily!",
        searchPrompt: "quadratic time complexity bottleneck nested loops",
        emoji: "⚠️",
        reactionCount: "2.7k",
        commentCount: 180,
      },
      {
        id: "bo-n2-3",
        text: "Typical of Bubble Sort, Selection Sort, and nested array indexOf comparisons.",
        searchPrompt: "optimizing O(n^2) nested loops using hash map JavaScript",
        emoji: "💡",
        reactionCount: "1.9k",
        commentCount: 120,
      },
    ],
  },

  "big-o-2n": {
    id: "big-o-2n",
    title: "O(2ⁿ) Exponential",
    badge: "🎲 Double Choices",
    tagline: "Every new item doubles choices: include or skip it to find every possible subset",
    takeaways: [
      {
        id: "bo-2n-1",
        text: "Double choices story: every new item doubles total options (either include it or skip it).",
        searchPrompt: "Big O O(2^n) exponential power set all subsets",
        emoji: "🎲",
        reactionCount: "3.7k",
        commentCount: 250,
      },
      {
        id: "bo-2n-2",
        text: "Exponential explosion: 30 items demand over 1 billion operations to calculate subsets.",
        searchPrompt: "exponential time complexity O(2^n) recursion tree",
        emoji: "💥",
        reactionCount: "2.5k",
        commentCount: 165,
      },
      {
        id: "bo-2n-3",
        text: "Found in naive recursive Fibonacci and exhaustive subset power set generators.",
        searchPrompt: "memoization dynamic programming optimize O(2^n) to O(n)",
        emoji: "💡",
        reactionCount: "1.6k",
        commentCount: 100,
      },
    ],
  },

  "big-o-nfact": {
    id: "big-o-nfact",
    title: "O(n!) Factorial",
    badge: "💥 Every Order",
    tagline: "Try every possible order: generating all permutations explodes into billions instantly",
    takeaways: [
      {
        id: "bo-nfact-1",
        text: "Every order story: trying every permutation of seating arrangements for guests.",
        searchPrompt: "Big O O(n!) factorial traveling salesperson permutations",
        emoji: "💥",
        reactionCount: "4.2k",
        commentCount: 290,
      },
      {
        id: "bo-nfact-2",
        text: "The steepest cliff in computer science: just 20 items take 2.4 quintillion operations!",
        searchPrompt: "factorial time complexity O(n!) permutations limit",
        emoji: "🤯",
        reactionCount: "2.8k",
        commentCount: 195,
      },
      {
        id: "bo-nfact-3",
        text: "Found in Traveling Salesperson brute force; solvable only with heuristics and pruning.",
        searchPrompt: "traveling salesperson problem heuristic approximation algorithms",
        emoji: "🚀",
        reactionCount: "1.9k",
        commentCount: 125,
      },
    ],
  },

  // ==========================================
  // THE RESTAURANT CAST (NODE.JS)
  // ==========================================
  "node-restaurant-pillar": {
    id: "node-restaurant-pillar",
    title: "The Restaurant Cast",
    badge: "Analogy Cast",
    tagline: "V8 is the chef, Node.js is the restaurant building, libuv is the back kitchen",
    takeaways: [
      {
        id: "n-rest-1",
        text: "The Restaurant: V8 is the chef, Node is the building, libuv is the back kitchen staff.",
        searchPrompt: "Node.js architecture restaurant chef libuv event loop analogy",
        emoji: "🧑🍳",
        reactionCount: "4.9k",
        commentCount: 360,
      },
      {
        id: "n-rest-2",
        text: "Your JS runs on one single thread; libuv and OS quietly do the heavy lifting in background.",
        searchPrompt: "is Node.js single threaded or multi-threaded libuv explained",
        emoji: "🔥",
        reactionCount: "3.4k",
        commentCount: 235,
      },
      {
        id: "n-rest-3",
        text: "This division of labor allows Node to serve thousands of requests concurrently with ease.",
        searchPrompt: "how Node.js serves thousands of concurrent requests",
        emoji: "🚀",
        reactionCount: "2.5k",
        commentCount: 160,
      },
    ],
  },

  "node-cast-chef": {
    id: "node-cast-chef",
    title: "The Chef (V8 Engine)",
    badge: "🧑🍳 Single Thread",
    tagline: "Runs your JavaScript code one line at a time; never splits himself in two",
    takeaways: [
      {
        id: "n-chef-1",
        text: "The Chef (V8): runs your JavaScript code one line at a time; never splits into two.",
        searchPrompt: "V8 Engine JavaScript single thread chef analogy",
        emoji: "🧑🍳",
        reactionCount: "4.4k",
        commentCount: 310,
      },
      {
        id: "n-chef-2",
        text: "V8 alone only knows math, strings, and objects; has no idea what files or network sockets are.",
        searchPrompt: "what V8 engine can and cannot do without Node.js",
        emoji: "💡",
        reactionCount: "2.9k",
        commentCount: 195,
      },
      {
        id: "n-chef-3",
        text: "The Chef stays 100% focused on current Call Stack code before serving ready event callbacks.",
        searchPrompt: "JavaScript single thread call stack run to completion",
        emoji: "⚡",
        reactionCount: "2.0k",
        commentCount: 130,
      },
    ],
  },

  "node-cast-building": {
    id: "node-cast-building",
    title: "The Restaurant (Node.js)",
    badge: "🏢 Runtime Wrapper",
    tagline: "Wraps the chef with extra powers: files, network sockets, timers, and C++ bindings",
    takeaways: [
      {
        id: "n-bld-1",
        text: "The Restaurant (Node): wraps the chef with real-world abilities: fs, network, timers.",
        searchPrompt: "Node.js runtime wrapped around V8 C++ bindings",
        emoji: "🏢",
        reactionCount: "4.1k",
        commentCount: 280,
      },
      {
        id: "n-bld-2",
        text: "C++ bindings connect pure JavaScript execution to your computer's native operating system.",
        searchPrompt: "Node.js C++ bindings connecting V8 to operating system",
        emoji: "💡",
        reactionCount: "2.6k",
        commentCount: 170,
      },
      {
        id: "n-bld-3",
        text: "Provides global runtime environment, Buffer objects, and stream utilities for servers.",
        searchPrompt: "Node.js runtime environment globals Buffer streams",
        emoji: "🚀",
        reactionCount: "1.8k",
        commentCount: 110,
      },
    ],
  },

  "node-cast-kitchen": {
    id: "node-cast-kitchen",
    title: "Back Kitchen (libuv)",
    badge: "🧰 Async Heavy Lifting",
    tagline: "C library handling slow, heavy jobs quietly in the background across platforms",
    takeaways: [
      {
        id: "n-kitch-1",
        text: "Back Kitchen (libuv): handles slow, heavy stuff quietly: files, DNS, network sockets.",
        searchPrompt: "libuv C library slow heavy background jobs",
        emoji: "🧰",
        reactionCount: "4.5k",
        commentCount: 320,
      },
      {
        id: "n-kitch-2",
        text: "Cross-platform C library abstracting Windows (IOCP) and Linux (epoll) OS differences.",
        searchPrompt: "libuv cross platform IOCP epoll kqueue abstraction",
        emoji: "💡",
        reactionCount: "2.8k",
        commentCount: 185,
      },
      {
        id: "n-kitch-3",
        text: "Frees the chef from waiting on slow hardware by doing all non-blocking work off to the side.",
        searchPrompt: "how libuv prevents blocking main JavaScript thread",
        emoji: "⚡",
        reactionCount: "2.1k",
        commentCount: 135,
      },
    ],
  },

  "node-cast-waiter": {
    id: "node-cast-waiter",
    title: "Head Waiter (Event Loop)",
    badge: "🧑💼 Station Lap Cycle",
    tagline: "Walks a strict loop through fixed stations checking if anything is ready for the chef",
    takeaways: [
      {
        id: "n-wait-1",
        text: "Head Waiter (Event Loop): walks a strict lap through fixed stations every cycle.",
        searchPrompt: "Event loop waiter strict lap cycle stations",
        emoji: "🧑💼",
        reactionCount: "4.6k",
        commentCount: 335,
      },
      {
        id: "n-wait-2",
        text: "Station lap: Timers → Pending Callbacks → Poll → Check (setImmediate) → Close Callbacks.",
        searchPrompt: "Node.js Event Loop phases timers pending poll check close",
        emoji: "🔄",
        reactionCount: "3.1k",
        commentCount: 205,
      },
      {
        id: "n-wait-3",
        text: "Keeps asking 'is the chef free?' and hands over the next ready callback ticket immediately.",
        searchPrompt: "how Event Loop coordinates between libuv and V8 call stack",
        emoji: "🔥",
        reactionCount: "2.2k",
        commentCount: 140,
      },
    ],
  },

  "node-cast-helpers": {
    id: "node-cast-helpers",
    title: "Extra Helpers (Thread Pool)",
    badge: "🧵 4 Backup Workers",
    tagline: "Default 4 helpers for heavy blocking jobs the OS cannot do asynchronously",
    takeaways: [
      {
        id: "n-help-1",
        text: "Extra Helpers (Thread Pool): 4 backup threads for heavy jobs the OS cannot do async.",
        searchPrompt: "libuv thread pool 4 helpers fs crypto zlib",
        emoji: "🧵",
        reactionCount: "4.3k",
        commentCount: 300,
      },
      {
        id: "n-help-2",
        text: "Handles fs file I/O, dns.lookup, crypto hashing, and zlib compression off to the side.",
        searchPrompt: "which Node.js operations use libuv thread pool",
        emoji: "💡",
        reactionCount: "2.7k",
        commentCount: 175,
      },
      {
        id: "n-help-3",
        text: "Simultaneous file reads bottleneck if all 4 helpers are busy; scale with UV_THREADPOOL_SIZE.",
        searchPrompt: "Node.js thread pool bottleneck UV_THREADPOOL_SIZE performance",
        emoji: "⚡",
        reactionCount: "1.9k",
        commentCount: 120,
      },
    ],
  },

  "node-fs-lifecycle": {
    id: "node-fs-lifecycle",
    title: "fs.readFile() Lifecycle",
    badge: "🎟️ Non-blocking Stack",
    tagline: "Call stack initiates the call then frees immediately; doesn't wait for disk read",
    takeaways: [
      {
        id: "n-fs-1",
        text: "Call Stack initiates fs.readFile() then frees immediately; doesn't wait for disk!",
        searchPrompt: "fs.readFile async lifecycle call stack non-blocking Node.js",
        emoji: "🎟️",
        reactionCount: "4.5k",
        commentCount: 325,
      },
      {
        id: "n-fs-2",
        text: "Key rule: The Call Stack contains the JS call, not the entire lifetime of async operation.",
        searchPrompt: "Call stack contains JS call not lifetime of async operation Node.js",
        emoji: "💡",
        reactionCount: "3.0k",
        commentCount: 200,
      },
      {
        id: "n-fs-3",
        text: "When file read finishes, libuv drops callback into Poll queue for V8 to execute cleanly.",
        searchPrompt: "how fs.readFile callback enters Poll phase Node.js",
        emoji: "🚀",
        reactionCount: "2.1k",
        commentCount: 135,
      },
    ],
  },

  // ==========================================
  // SCOPE & CLOSURE STORIES
  // ==========================================
  "scope-backpack": {
    id: "scope-backpack",
    title: "The Backpack Story",
    badge: "🎒 Packs Scope",
    tagline: "Function packs a backpack with outer variables and carries it with it forever",
    takeaways: [
      {
        id: "sc-bp-1",
        text: "Backpack story: inner function packs backpack with variables from surrounding scope.",
        searchPrompt: "JavaScript Closure backpack story analogy",
        emoji: "🎒",
        reactionCount: "4.8k",
        commentCount: 360,
      },
      {
        id: "sc-bp-2",
        text: "Carries the backpack forever even after the outer function that packed it has finished.",
        searchPrompt: "how closure retains variables after outer function returns",
        emoji: "🔥",
        reactionCount: "3.3k",
        commentCount: 220,
      },
      {
        id: "sc-bp-3",
        text: "Variables stay alive in the heap instead of being popped off the Call Stack memory.",
        searchPrompt: "closures heap memory allocation vs call stack pop JavaScript",
        emoji: "💡",
        reactionCount: "2.4k",
        commentCount: 155,
      },
    ],
  },

  "scope-5-sentences": {
    id: "scope-5-sentences",
    title: "5 Sentences to Remember",
    badge: "🧠 Quick Interview",
    tagline: "The 5 golden anchor sentences to ace any JavaScript engine interview",
    takeaways: [
      {
        id: "sc-5s-1",
        text: "V8 parses, executes, and optimizes JS. Call Stack tracks executing function calls.",
        searchPrompt: "V8 parses executes optimizes Call Stack tracks JavaScript interview",
        emoji: "🧠",
        reactionCount: "4.9k",
        commentCount: 375,
      },
      {
        id: "sc-5s-2",
        text: "Execution Context is the environment while executing. Scope Chain is the lookup path.",
        searchPrompt: "Execution Context Scope Chain variable lookup path",
        emoji: "⚡",
        reactionCount: "3.5k",
        commentCount: 240,
      },
      {
        id: "sc-5s-3",
        text: "A closure allows a function to retain access to its outer lexical environment forever.",
        searchPrompt: "closure retains access to lexical environment definition",
        emoji: "🚀",
        reactionCount: "2.6k",
        commentCount: 170,
      },
    ],
  },
};

/**
 * Intelligent Fallback Generator:
 * Generates 3 strictly <= 100 character key takeaways with Google Search prompts
 * and emoji reaction rankings for any node in the Spider Web.
 */
export function getConceptTakeaways(node: SpiderNode, allNodes: SpiderNode[]): ConceptTakeaways {
  if (HANDCRAFTED_TAKEAWAYS[node.id]) {
    return HANDCRAFTED_TAKEAWAYS[node.id];
  }

  const parent = node.parentId ? allNodes.find((n) => n.id === node.parentId) : undefined;
  const parentName = parent ? parent.label : "JavaScript Core";
  const categoryName =
    node.category === "v8"
      ? "Google V8 Engine"
      : node.category === "scope"
      ? "Scope & Closures"
      : node.category === "node"
      ? "Node.js Runtime"
      : node.category === "oop"
      ? "OOP (4 Pillars)"
      : node.category === "dsa"
      ? "DSA & Big O"
      : "Full Stack JavaScript";

  return {
    id: node.id,
    title: node.label,
    badge: node.badge || "Concept",
    tagline: `Core building block under ${parentName} in ${categoryName}`,
    takeaways: [
      {
        id: `${node.id}-t1`,
        text: `${node.label} optimizes runtime execution under ${parentName} hierarchy.`,
        searchPrompt: `how ${node.label} works in ${categoryName} under ${parentName} explained`,
        emoji: "🔥",
        reactionCount: "2.6k",
        commentCount: 184,
      },
      {
        id: `${node.id}-t2`,
        text: `Inspect ${node.label} mechanics to identify performance and memory bottlenecks.`,
        searchPrompt: `${node.label} JavaScript performance optimization best practices`,
        emoji: "💡",
        reactionCount: "1.8k",
        commentCount: 112,
      },
      {
        id: `${node.id}-t3`,
        text: `Mastering ${node.label} unlocks advanced debugging in ${categoryName}.`,
        searchPrompt: `debugging ${node.label} in Node.js and JavaScript runtime`,
        emoji: "🚀",
        reactionCount: "940",
        commentCount: 58,
      },
    ],
  };
}
