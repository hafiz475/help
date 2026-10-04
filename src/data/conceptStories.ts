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
