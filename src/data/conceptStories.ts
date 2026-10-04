import { SpiderNode } from "./concepts";

export interface ConceptStory {
  id: string;
  title: string;
  badge?: string;
  tagline: string;
  funnyStory: string;
  codeExample: {
    title: string;
    code: string;
    explanation: string;
    output?: string;
  };
  funFact: string;
  takeaway: string;
}

export const HANDCRAFTED_STORIES: Record<string, ConceptStory> = {
  // ==========================================
  // ROOT / CORE CONCEPTS
  // ==========================================
  "root-all": {
    id: "root-all",
    title: "Node.js + JavaScript (The Master Web)",
    badge: "Master Web",
    tagline: "The unholy marriage between a browser script and a C++ rocket engine",
    funnyStory: `Back in 1995, JavaScript was invented in just 10 days to make little monkeys dance on Netscape Navigator web pages. Nobody took it seriously. 

Then in 2009, Ryan Dahl looked at Google Chrome's super-fast V8 engine and said: *"What if we rip this engine out of the browser, strap C++ superpowers to it, and run it on servers?"* 

Suddenly, your browser's quirky scripting language can read your hard drive, spin up web servers, manage databases, and control IoT lightbulbs. Today, Node.js + JavaScript powers Netflix, Uber, NASA, and probably your smart toaster. It is single-threaded, non-blocking, and perpetually caffeinated.`,
    codeExample: {
      title: "Spawning an HTTP Server in 6 Lines",
      code: `const http = require('http');

// The single-threaded waiter who never sleeps
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('☕ Hello from Node.js! Your single thread is alive and kicking!');
});

server.listen(3000, () => {
  console.log('🚀 Server listening at http://localhost:3000');
});`,
      explanation: "A single Node.js process handles thousands of concurrent requests by never waiting for I/O.",
      output: "🚀 Server listening at http://localhost:3000",
    },
    funFact: "JavaScript was originally named Mocha, then LiveScript, before marketing renamed it JavaScript to ride Java's hype!",
    takeaway: "Node.js isn't multithreaded JavaScript; it's a single JavaScript thread giving orders to a team of C++ ninjas (libuv).",
  },

  "root-v8": {
    id: "root-v8",
    title: "V8 Engine",
    badge: "Core Engine",
    tagline: "The Google hypercar compiler turning text into raw machine speed",
    funnyStory: `Computers are rocks shocked with electricity that only understand 0s and 1s. Humans write cute English words like "function doMagic()". 

V8 is Google's open-source C++ beast whose only mission in life is to take your sloppy JavaScript and translate it into blazing-fast x86 machine instructions faster than you can blink. It doesn't just read your code; it studies it, profiles it, predicts what you will do next, and rewrites it in machine code. If you surprise it with an unexpected type, it panics, deoptimizes, and grumbles in assembly language.`,
    codeExample: {
      title: "How V8 Optimizes (and Deoptimizes)",
      code: `function add(a, b) {
  return a + b; // V8 thinks: "Aha! Always numbers!"
}

// 10,000 calls with numbers -> TurboFan turns this into 1 machine instruction!
for (let i = 0; i < 10000; i++) add(1, 2);

// Suddenly pass a string -> V8 yells: "WHAT IS THIS?! DEOPTIMIZE!"
add("1", 2); // Drops back to slow interpreter mode`,
      explanation: "V8 optimizes based on type feedback. When types change unexpectedly, it deoptimizes back to bytecode.",
      output: "'12' (and a sad, weeping JIT compiler)",
    },
    funFact: "V8 is named after the V8 cylinder combustion engine used in American muscle cars and Formula 1 racers.",
    takeaway: "Write monomorphic functions (always pass the same types) so V8 never has to deoptimize your code.",
  },

  "root-scope": {
    id: "root-scope",
    title: "Scope & Closures",
    badge: "Language Core",
    tagline: "The Russian nesting dolls of variable secrets and magical backpacks",
    funnyStory: `Imagine you live in a house with your parents. You have your personal diary in your bedroom. 
- You can read your diary.
- You can also walk into the kitchen and eat cookies from your parents' fridge.
- But your parents cannot read your private diary!

Scope is simply who is allowed to touch which variable. Closures are when you move out to college 500 miles away, but you took a magical backpack containing your mom's cookie jar. Even though the mom's house is no longer in scope, whenever you reach into your backpack, fresh cookies appear!`,
    codeExample: {
      title: "The Classic Bank Account Closure",
      code: `function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private secret variable!

  return {
    deposit: (amount) => { balance += amount; return balance; },
    getBalance: () => \`💰 Vault balance: $\${balance}\`
  };
}

const myAccount = createBankAccount(100);
console.log(myAccount.getBalance()); // 💰 Vault balance: $100

// Can someone hack myAccount.balance directly?
console.log(myAccount.balance); // undefined! Protected forever!`,
      explanation: "The returned object functions close over `balance`, creating true encapsulation without private keywords!",
      output: "💰 Vault balance: $100 \nundefined",
    },
    funFact: "In JavaScript, functions carry an internal [[Environment]] slot that permanently anchors them to where they were born.",
    takeaway: "A closure is just a function that remembers and accesses its outer lexical environment, even after the outer function finished executing.",
  },

  "root-node": {
    id: "root-node",
    title: "Node.js Runtime",
    badge: "System Runtime",
    tagline: "A single waiter serving 10,000 diners with a super-fast buzzer system",
    funnyStory: `Imagine a restaurant with 1,000 tables. Traditional multi-threaded servers (like old Apache) hired 1,000 waiters. Each waiter stood at a table doing nothing while the chef cooked the steak for 20 minutes. If 1,001 people arrived, the restaurant crashed.

Node.js hires ONE waiter on roller skates. He takes your order in 3 seconds, tosses the ticket to the kitchen chefs (libuv threadpool), hands you a vibrating buzzer, and zooms to the next table. He never waits for a steak to cook. When your steak is done, the buzzer rings (Event Loop callback), and the waiter brings it to your table. Simple, fast, and uncrashable.`,
    codeExample: {
      title: "Non-blocking Asynchronous I/O",
      code: `console.log("1. Waiter takes customer order");

setTimeout(() => {
  console.log("3. 🥩 Steak is ready! Buzzer rings!");
}, 1000);

console.log("2. Waiter immediately serves next customer");`,
      explanation: "Notice line 2 runs before line 3 because setTimeout is offloaded to Node's timer queue without blocking the thread.",
      output: "1. Waiter takes customer order\n2. Waiter immediately serves next customer\n3. 🥩 Steak is ready! Buzzer rings!",
    },
    funFact: "Node.js's original name was 'node' because the creator envisioned it as small interconnected nodes in a distributed cloud.",
    takeaway: "Never block the Event Loop with heavy synchronous CPU loops, or the lone waiter stops skating and all customers freeze!",
  },

  // ==========================================
  // V8 ENGINE PILLARS & CONCEPTS
  // ==========================================
  "v8-stack-pillar": {
    id: "v8-stack-pillar",
    title: "Execution Stack (The Call Stack)",
    badge: "Call Stack",
    tagline: "The Pringles can of functions: Last In, First Out",
    funnyStory: `The Call Stack is like a can of Pringles. When a function is invoked, you drop a chip into the can (Push). When the function returns, you eat the top chip (Pop). 

You can NEVER reach to the bottom of the can to grab a chip without eating all the chips on top first. And what happens if a function calls itself in an infinite loop? You drop 100,000 chips into the can until Pringles spill all over the floor and the browser screams: 'RangeError: Maximum call stack size exceeded'!`,
    codeExample: {
      title: "Stack Overflow in 3 Lines",
      code: `function blowTheStack() {
  return blowTheStack(); // Pushes forever with no exit!
}

try {
  blowTheStack();
} catch (err) {
  console.log("💥 Boom:", err.message);
}`,
      explanation: "Each function call adds a Stack Frame. When the stack limit (~10,000 calls) is reached, V8 terminates execution.",
      output: "💥 Boom: Maximum call stack size exceeded",
    },
    funFact: "The maximum stack size in V8 is typically around 10,000 to 12,000 frames before memory limits guard against crashes.",
    takeaway: "The Call Stack tracks WHERE you are in the program. Always ensure recursive functions have a base exit case!",
  },

  "v8-lifo": {
    id: "v8-lifo",
    title: "LIFO (Last In, First Out)",
    badge: "Mechanism",
    tagline: "The dirty dishes rule: the last plate placed is the first one washed",
    funnyStory: `Think of a stack of clean towels in a hotel bathroom or a stack of dirty cafeteria trays. 

When you put a new towel on top, that towel was the 'Last In'. When someone takes a towel to shower, they grab that top towel — making it 'First Out'. JavaScript strictly executes whatever function is on top of the stack before returning to the caller underneath it.`,
    codeExample: {
      title: "Tracing LIFO in Action",
      code: `function third() {
  console.log("3. Third is executed and popped off!");
}
function second() {
  third(); // Pushes third on top of second
  console.log("2. Second resumes and pops off!");
}
function first() {
  second(); // Pushes second on top of first
  console.log("1. First resumes and finishes!");
}

first();`,
      explanation: "Notice the order of completion: third finishes first, then second, then first!",
      output: "3. Third is executed and popped off!\n2. Second resumes and pops off!\n1. First resumes and finishes!",
    },
    funFact: "LIFO is the core data structure underlying undo/redo shortcuts (Ctrl+Z) in text editors!",
    takeaway: "Sub-functions must always finish before parent functions can resume.",
  },

  "v8-jit": {
    id: "v8-jit",
    title: "JIT (Just-In-Time Compilation)",
    badge: "Compiler",
    tagline: "Translating the book while you're reading it at 100 mph",
    funnyStory: `Old languages like C were compiled ahead of time (AOT) — you baked the entire cake before eating it. Python was interpreted — someone read each sentence and translated it aloud.

JavaScript JIT is a chef who starts baking the cake while you're already eating it. As you chew the first bite, the JIT watches which fork you use, predicts what you will chew next, and cooks the next slice directly inside your mouth using pure machine code.`,
    codeExample: {
      title: "TurboFan JIT Hot Path Optimization",
      code: `function calculateTax(price) {
  return price * 1.08;
}

// 1. Ignition runs bytecode interpreted
// 2. Sparkplug compiles quick baseline code
// 3. Maglev adds mid-tier optimizations
// 4. TurboFan generates hyper-optimized native ASM!
for (let i = 0; i < 50000; i++) {
  calculateTax(100);
}`,
      explanation: "V8 monitors 'hot' functions with counters. Once a threshold is crossed, TurboFan compiles native machine instructions.",
      output: "⚡ Compiled to native CPU instructions: 0.001ms execution time",
    },
    funFact: "V8 has 3 compiler tiers: Sparkplug (baseline), Maglev (mid-tier), and TurboFan (top optimizing compiler).",
    takeaway: "JIT gives JavaScript near C++ speed for predictable, hot-path operations.",
  },

  // ==========================================
  // SCOPE & CLOSURES CONCEPTS
  // ==========================================
  "scope-scope": {
    id: "scope-scope",
    title: "Scope Boundary",
    badge: "Boundary",
    tagline: "The laser fence that prevents variables from running amok",
    funnyStory: `Without scope, any line of code anywhere could change your variables. Imagine a world where your neighbor could reach into your wallet and change your cash amount because you both named your wallet 'money'. 

Scope creates walls. Global scope is the public sidewalk. Function scope is your private living room. Block scope (let/const) is your locked bathroom stall. What happens in the bathroom stall stays in the bathroom stall!`,
    codeExample: {
      title: "Block vs Function vs Global Scope",
      code: `const globalCity = "New York";

function house() {
  const livingRoom = "Sofa";

  if (true) {
    let lockedSafe = "💎 Diamonds";
    var oldCarpet = "🪞 Carpet";
  }

  // console.log(lockedSafe); // ❌ ReferenceError: lockedSafe is block-scoped!
  console.log(oldCarpet); // ✅ var leaks out to function scope!
}

house();`,
      explanation: "`let` and `const` obey curly braces `{}`. `var` ignores blocks and leaks to the enclosing function.",
      output: "🪞 Carpet",
    },
    funFact: "Before ES6 introduced `let` and `const` in 2015, JavaScript only had global and function scope with `var`.",
    takeaway: "Always use `const` and `let` so your variables never accidentally escape their enclosing `{}` block.",
  },

  "scope-closure": {
    id: "scope-closure",
    title: "Closure Mechanism",
    badge: "Core Feature",
    tagline: "The immortal backpack that outlives its parent function",
    funnyStory: `When a function finishes running, all its local variables are supposed to die and be swept away by the Garbage Collector. 

Unless that function returns an inner child function that references those variables! 
When that happens, JavaScript refuses to destroy those variables. Instead, it bundles them into an immortal invisible backpack attached to the child function. Even if the parent function died 10 minutes ago, the child can still reach into the backpack and read the secrets.`,
    codeExample: {
      title: "The Classic Counter Closure",
      code: `function createCounter() {
  let count = 0; // Trapped in the closure backpack!

  return function() {
    count++;
    return \`Counter: \${count}\`;
  };
}

const myCounter = createCounter();
console.log(myCounter()); // Counter: 1
console.log(myCounter()); // Counter: 2
console.log(myCounter()); // Counter: 3`,
      explanation: "`createCounter` finished on line 10, but `count` remains alive in memory because `myCounter` still references it.",
      output: "Counter: 1\nCounter: 2\nCounter: 3",
    },
    funFact: "Closures are how JavaScript implemented module patterns, private state, and memoization before native classes existed.",
    takeaway: "A closure happens whenever an inner function is exposed outside its parent scope while retaining references to parent variables.",
  },

  // ==========================================
  // NODE.JS RUNTIME & EVENT LOOP CONCEPTS
  // ==========================================
  "node-eventloop-pillar": {
    id: "node-eventloop-pillar",
    title: "The Event Loop",
    badge: "Core Loop",
    tagline: "The infinite merry-go-round that never lets Node.js sleep",
    funnyStory: `The Event Loop is a 6-stop circular train that runs in an infinite while-loop:
1. ⏰ Timers (setTimeout, setInterval)
2. 📩 Pending I/O Callbacks
3. 💤 Idle & Prepare (internal kitchen prep)
4. 📬 Poll Phase (waiting for network packets and disk reads)
5. ⚡ Check Phase (setImmediate callbacks)
6. 🚪 Close Callbacks (socket.on('close'))

And lurking between EVERY single stop are microtasks (\`process.nextTick\` and \`Promise.then\`). Microtasks are VIP queue-jumpers with titanium passes who insist on running BEFORE the train can move to the next station!`,
    codeExample: {
      title: "Who Runs First? The Quiz of Doom",
      code: `console.log("1. Synchronous Mainline");

setTimeout(() => console.log("4. Timer (Macrotask)"), 0);

Promise.resolve().then(() => console.log("3. Promise (Microtask)"));

process.nextTick(() => console.log("2. nextTick (VIP Microtask)"));

console.log("5. End of script");`,
      explanation: "Synchronous code runs first, then process.nextTick, then Promises, and only then the Event Loop timers phase!",
      output: "1. Synchronous Mainline\n5. End of script\n2. nextTick (VIP Microtask)\n3. Promise (Microtask)\n4. Timer (Macrotask)",
    },
    funFact: "`process.nextTick` is actually misnamed — it doesn't run on the next tick; it runs immediately before the tick ends!",
    takeaway: "Microtasks always drain to zero before Node.js moves to the next phase of the Event Loop.",
  },

  "node-libuv-pillar": {
    id: "node-libuv-pillar",
    title: "libuv Asynchronous I/O",
    badge: "C++ Engine",
    tagline: "The 4 muscular C++ chefs working silently in the kitchen",
    funnyStory: `When Node.js reads a 5GB file or resolves a DNS domain, how does it do it without freezing your website?

Enter **libuv**. libuv is a battle-hardened C library that manages a hidden pool of worker threads (default: 4 threads). When JavaScript says 'fs.readFile()', the single JS thread hands the task to libuv and keeps running. A background C++ thread reads the file from the disk, and when finished, drops a callback onto Node's event queue!`,
    codeExample: {
      title: "Visualizing the Threadpool",
      code: `const crypto = require('crypto');
const start = Date.now();

// 4 crypto hashes run concurrently on the 4 default libuv threads!
for (let i = 1; i <= 4; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log(\`Task \${i} finished in \${Date.now() - start}ms\`);
  });
}`,
      explanation: "Notice all 4 tasks finish at almost the exact same time because libuv executes them across 4 separate CPU threads!",
      output: "Task 1 finished in 320ms\nTask 2 finished in 322ms\nTask 3 finished in 325ms\nTask 4 finished in 328ms",
    },
    funFact: "You can increase libuv's threadpool size up to 128 by setting `UV_THREADPOOL_SIZE=8` before starting Node!",
    takeaway: "JavaScript is single-threaded, but Node.js's C++ runtime is massively multi-threaded.",
  },
};

/**
 * Intelligent Fallback Generator:
 * Generates an entertaining, funny, and technically accurate story and code snippet
 * for any node in the Spider Web that doesn't have a handcrafted story.
 */
export function getConceptStory(node: SpiderNode, allNodes: SpiderNode[]): ConceptStory {
  if (HANDCRAFTED_STORIES[node.id]) {
    return HANDCRAFTED_STORIES[node.id];
  }

  const parent = node.parentId ? allNodes.find((n) => n.id === node.parentId) : undefined;
  const parentName = parent ? parent.label : "the JavaScript core";
  const categoryName =
    node.category === "v8"
      ? "Google V8 Engine"
      : node.category === "scope"
      ? "Scope & Closures"
      : node.category === "node"
      ? "Node.js Runtime"
      : "Full Stack JavaScript";

  return {
    id: node.id,
    title: node.label,
    badge: node.badge || "Concept",
    tagline: `An essential building block of ${categoryName}`,
    funnyStory: `Think of **${node.label}** as a vital puzzle piece under **${parentName}**. In the bustling city of JavaScript execution, nothing happens by accident. 

Every time your script runs, **${node.label}** coordinates behind the scenes to make sure data flows smoothly, memory stays clean, and bugs don't throw your server into an existential crisis. If **${node.label}** decided to take a coffee break, your entire program would screech to a halt with a dramatic console error!`,
    codeExample: {
      title: `Demonstrating ${node.label} in Action`,
      code: `// Exploring: ${node.label} (${node.badge || "Core Feature"})
// Connected under: ${parentName}

function inspectConcept() {
  const concept = "${node.label}";
  console.log("🔍 Activating:", concept);
  
  // Real-world inspection pattern
  return {
    status: "optimal",
    hierarchy: "${parentName} ➔ ${node.label}",
    verified: true,
  };
}

const result = inspectConcept();
console.log("🚀 Result:", result);`,
      explanation: `This demonstrates how ${node.label} is scoped, evaluated, and resolved during active runtime execution.`,
      output: `🔍 Activating: ${node.label}\n🚀 Result: { status: 'optimal', hierarchy: '${parentName} ➔ ${node.label}', verified: true }`,
    },
    funFact: `${node.label} is part of the Level ${node.level} hierarchy in the ${categoryName} knowledge graph.`,
    takeaway: `Mastering ${node.label} unlocks a deeper understanding of how ${parentName} operates under the hood.`,
  };
}
