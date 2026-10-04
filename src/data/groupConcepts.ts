import { ConceptCategory } from "./concepts";

export interface GroupSubItem {
  id: string;
  label: string;
  badge?: string;
  searchQuery?: string;
}

export interface GroupItem {
  id: string;
  label: string;
  badge?: string;
  searchQuery?: string;
  stepNumber?: number;
  subItems?: GroupSubItem[];
}

export interface GroupCardData {
  id: string;
  pillarId: string;
  title: string;
  category: "v8" | "scope" | "node";
  badge: string;
  color: string;
  isPipeline?: boolean;
  items: GroupItem[];
}

export const V8_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-v8-exec",
    pillarId: "v8-js-exec",
    title: "JavaScript Execution Pipeline",
    category: "v8",
    badge: "9 Sequential Steps",
    color: "#0284c7",
    isPipeline: true,
    items: [
      {
        id: "v8-parser",
        stepNumber: 1,
        label: "Parser",
        badge: "Syntax Analysis",
        searchQuery: "V8 JavaScript Parser",
      },
      {
        id: "v8-ast",
        stepNumber: 2,
        label: "AST",
        badge: "Abstract Syntax Tree",
        searchQuery: "Abstract Syntax Tree JavaScript AST",
      },
      {
        id: "v8-bytecode",
        stepNumber: 3,
        label: "Bytecode",
        badge: "Intermediate Rep (IR)",
        searchQuery: "V8 Bytecode JavaScript",
      },
      {
        id: "v8-ignition",
        stepNumber: 4,
        label: "Ignition",
        badge: "Interpreter",
        searchQuery: "V8 Ignition Bytecode Interpreter",
        subItems: [
          {
            id: "v8-accumulator",
            label: "Accumulator",
            badge: "Register",
            searchQuery: "V8 Ignition Accumulator register",
          },
          {
            id: "v8-virtual-regs",
            label: "Virtual Registers",
            badge: "Registers",
            searchQuery: "V8 Ignition Virtual Registers",
          },
        ],
      },
      {
        id: "v8-runtime-feedback",
        stepNumber: 5,
        label: "Runtime Feedback",
        badge: "Type Feedback / ICs",
        searchQuery: "V8 Type Feedback vector inline caches",
      },
      {
        id: "v8-hot-code",
        stepNumber: 6,
        label: "Hot Code",
        badge: "Heuristics Profiler",
        searchQuery: "V8 Hot Code JIT optimization JavaScript",
      },
      {
        id: "v8-jit",
        stepNumber: 7,
        label: "JIT Compilation",
        badge: "Compiler Tiers",
        searchQuery: "V8 JIT Compilation Just In Time",
        subItems: [
          {
            id: "v8-sparkplug",
            label: "Sparkplug",
            badge: "Baseline JIT",
            searchQuery: "V8 Sparkplug baseline compiler",
          },
          {
            id: "v8-maglev",
            label: "Maglev",
            badge: "Mid-tier JIT",
            searchQuery: "V8 Maglev mid-tier compiler",
          },
          {
            id: "v8-turbofan",
            label: "TurboFan",
            badge: "Optimizing JIT",
            searchQuery: "V8 TurboFan optimizing compiler",
          },
        ],
      },
      {
        id: "v8-machine-code",
        stepNumber: 8,
        label: "Machine Code",
        badge: "Native Binary Execution",
        searchQuery: "V8 Machine Code native execution",
      },
      {
        id: "v8-deopt",
        stepNumber: 9,
        label: "Deoptimization",
        badge: "Bailout to Ignition",
        searchQuery: "V8 Deoptimization bailout to bytecode",
      },
    ],
  },
  {
    id: "group-v8-memory",
    pillarId: "v8-memory",
    title: "Memory System",
    category: "v8",
    badge: "Storage & GC",
    color: "#06b6d4",
    items: [
      {
        id: "v8-heap",
        label: "Heap",
        badge: "Dynamic Memory",
        searchQuery: "V8 Memory Heap JavaScript",
        subItems: [
          {
            id: "v8-heap-objects",
            label: "Objects",
            badge: "Allocated Entities",
            searchQuery: "JavaScript Heap Object allocation V8",
          },
        ],
      },
      {
        id: "v8-gc",
        label: "Garbage Collector",
        badge: "Major GC / Orinoco / Scavenge",
        searchQuery: "V8 Garbage Collection Scavenger Major GC Orinoco",
      },
    ],
  },
  {
    id: "group-v8-stack",
    pillarId: "v8-stack-pillar",
    title: "Execution Stack & Context",
    category: "v8",
    badge: "Call Stack",
    color: "#7c3aed",
    items: [
      {
        id: "v8-callstack",
        label: "Call Stack",
        badge: "Stack Data Structure",
        searchQuery: "JavaScript Call Stack V8",
        subItems: [
          {
            id: "v8-lifo",
            label: "LIFO",
            badge: "Last In First Out",
            searchQuery: "Last In First Out Call Stack JavaScript",
          },
        ],
      },
      {
        id: "v8-stack-frames",
        label: "Stack Frames",
        badge: "Frame Allocation",
        searchQuery: "JavaScript Stack Frames Call Stack",
      },
      {
        id: "v8-func-calls",
        label: "Function Calls",
        badge: "Invocation Point",
        searchQuery: "JavaScript Function Call Execution",
      },
      {
        id: "v8-exec-context",
        label: "Execution Context",
        badge: "Scope & This Binding",
        searchQuery: "JavaScript Execution Context",
        subItems: [
          {
            id: "v8-gec",
            label: "Global Execution Context (GEC)",
            badge: "Global Scope",
            searchQuery: "JavaScript Global Execution Context GEC",
          },
          {
            id: "v8-fec",
            label: "Function Execution Context (FEC)",
            badge: "Function Scope",
            searchQuery: "JavaScript Function Execution Context FEC",
          },
        ],
      },
    ],
  },
];

export const SCOPE_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-scope-rules",
    pillarId: "scope-scope",
    title: "Scope & Lookup Chain",
    category: "scope",
    badge: "Rules",
    color: "#a855f7",
    items: [
      {
        id: "scope-scope",
        label: "Scope",
        badge: "Variable Boundary",
        searchQuery: "JavaScript Scope explained",
      },
      {
        id: "scope-lexical",
        label: "Lexical Scope",
        badge: "Author-time Placement",
        searchQuery: "JavaScript Lexical Scope static scoping",
      },
      {
        id: "scope-chain",
        label: "Scope Chain",
        badge: "Resolution Order",
        searchQuery: "JavaScript Scope Chain lookup",
        subItems: [
          {
            id: "scope-chain-order",
            label: "Current → Outer → Global",
            badge: "Lookup Flow",
            searchQuery: "JavaScript Scope Chain Current Outer Global resolution",
          },
        ],
      },
    ],
  },
  {
    id: "group-scope-env",
    pillarId: "scope-lexical-env",
    title: "Lexical Environment",
    category: "scope",
    badge: "Engine Spec",
    color: "#7c3aed",
    items: [
      {
        id: "scope-lexical-env",
        label: "Lexical Environment",
        badge: "Internal Spec Structure",
        searchQuery: "JavaScript Lexical Environment Environment Record",
      },
    ],
  },
  {
    id: "group-scope-closure",
    pillarId: "scope-closure",
    title: "Closure Mechanism",
    category: "scope",
    badge: "Core Feature",
    color: "#ec4899",
    items: [
      {
        id: "scope-closure",
        label: "Closure",
        badge: "Persistent Scope",
        searchQuery: "JavaScript Closure retain access outer environment",
        subItems: [
          {
            id: "scope-closure-detail",
            label: "Access to Outer Lexical Env",
            badge: "Preserved References",
            searchQuery: "Closure retains access to outer lexical environment JavaScript",
          },
        ],
      },
    ],
  },
];

export const NODE_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-node-apis",
    pillarId: "node-apis-pillar",
    title: "Node.js Built-in APIs",
    category: "node",
    badge: "Core APIs",
    color: "#10b981",
    items: [
      {
        id: "node-v8-pillar",
        label: "V8 Integration",
        badge: "Executes JavaScript",
        searchQuery: "Node.js V8 integration",
      },
      {
        id: "node-api-timers",
        label: "Timers API",
        badge: "Timer Controls",
        searchQuery: "Node.js timers setTimeout setInterval",
        subItems: [
          {
            id: "node-api-settimeout",
            label: "setTimeout()",
            badge: "Timer",
            searchQuery: "Node.js setTimeout documentation",
          },
          {
            id: "node-api-setinterval",
            label: "setInterval()",
            badge: "Interval",
            searchQuery: "Node.js setInterval documentation",
          },
        ],
      },
      {
        id: "node-api-fs",
        label: "File System (fs)",
        badge: "Disk I/O",
        searchQuery: "Node.js fs module fs.readFile",
        subItems: [
          {
            id: "node-api-fsread",
            label: "fs.readFile()",
            badge: "Async File Read",
            searchQuery: "Node.js fs.readFile asynchronous",
          },
        ],
      },
      {
        id: "node-api-http",
        label: "HTTP / Networking",
        badge: "Network Sockets",
        searchQuery: "Node.js http https net networking",
      },
      {
        id: "node-api-nexttick",
        label: "process.nextTick()",
        badge: "Micro-phase Hook",
        searchQuery: "Node.js process.nextTick",
      },
    ],
  },
  {
    id: "group-node-libuv",
    pillarId: "node-libuv-pillar",
    title: "libuv Infrastructure",
    category: "node",
    badge: "Async Engine",
    color: "#14b8a6",
    items: [
      {
        id: "node-libuv-el-infra",
        label: "Event Loop Infrastructure",
        badge: "Core Coordinator",
        searchQuery: "libuv Event Loop infrastructure",
      },
      {
        id: "node-libuv-async-io",
        label: "Async I/O",
        badge: "Non-blocking Operations",
        searchQuery: "libuv Asynchronous I/O non-blocking",
      },
      {
        id: "node-libuv-os-integration",
        label: "OS Integration",
        badge: "epoll / kqueue / IOCP",
        searchQuery: "libuv epoll kqueue IOCP OS integration",
      },
      {
        id: "node-libuv-threadpool",
        label: "Thread Pool",
        badge: "UV_THREADPOOL_SIZE (4 Workers)",
        searchQuery: "libuv Thread Pool UV_THREADPOOL_SIZE 4 threads",
      },
    ],
  },
  {
    id: "group-node-singlethread",
    pillarId: "node-single-thread-pillar",
    title: "Single-Threaded Model",
    category: "node",
    badge: "Concurrency",
    color: "#eab308",
    items: [
      {
        id: "node-main-js-thread",
        label: "Main JavaScript Thread",
        badge: "1 Execution Thread",
        searchQuery: "Node.js Main JavaScript Thread",
      },
      {
        id: "node-cpu-bound",
        label: "CPU-Bound Work",
        badge: "Can Block JS Loop",
        searchQuery: "Node.js CPU-bound tasks blocking event loop",
      },
      {
        id: "node-io-bound",
        label: "I/O-Bound Work",
        badge: "Offloaded Asynchronously",
        searchQuery: "Node.js I/O-bound tasks asynchronous non-blocking",
      },
    ],
  },
  {
    id: "group-node-eventloop",
    pillarId: "node-eventloop-pillar",
    title: "Event Loop Coordinator",
    category: "node",
    badge: "Orchestrator",
    color: "#22c55e",
    items: [
      {
        id: "node-el-not-exec",
        label: "Does NOT Execute JS",
        badge: "Only Coordinates Work",
        searchQuery: "Event loop does not execute javascript V8 does",
      },
      {
        id: "node-v8-exec-cb",
        label: "V8 Executes Callbacks",
        badge: "Pushed to Call Stack",
        searchQuery: "Node.js V8 executes event loop callbacks call stack",
      },
    ],
  },
  {
    id: "group-node-queues",
    pillarId: "node-queues-pillar",
    title: "Queues & Scheduling Priority",
    category: "node",
    badge: "Priority Order",
    color: "#f97316",
    isPipeline: true,
    items: [
      {
        id: "node-q-nexttick",
        stepNumber: 1,
        label: "Next Tick Queue",
        badge: "Priority 1 (Highest)",
        searchQuery: "Node.js Next Tick Queue process.nextTick priority",
        subItems: [
          {
            id: "node-q-nexttick-item",
            label: "process.nextTick()",
            badge: "Runs before any other queue",
            searchQuery: "process.nextTick queue execution order",
          },
        ],
      },
      {
        id: "node-q-microtask",
        stepNumber: 2,
        label: "Microtask Queue",
        badge: "Priority 2 (High)",
        searchQuery: "Node.js Microtask Queue Promise.then queueMicrotask",
        subItems: [
          {
            id: "node-q-promise-then",
            label: "Promise.then()",
            badge: "queueMicrotask()",
            searchQuery: "Promise.then microtask queue Node.js",
          },
        ],
      },
      {
        id: "node-q-macrotask",
        stepNumber: 3,
        label: "Task / Macrotask Queue",
        badge: "Priority 3 (Standard)",
        searchQuery: "Node.js Task Macrotask Queue timer callbacks",
        subItems: [
          {
            id: "node-q-macro-item",
            label: "Timer-style Callbacks",
            badge: "Timers & I/O Events",
            searchQuery: "Timer-style callbacks macrotask queue Node.js",
          },
        ],
      },
    ],
  },
  {
    id: "group-node-phases",
    pillarId: "node-phases-pillar",
    title: "Event Loop 5 Phases",
    category: "node",
    badge: "Tick Cycle Order",
    color: "#84cc16",
    isPipeline: true,
    items: [
      {
        id: "node-phase-timers",
        stepNumber: 1,
        label: "1. Timers Phase",
        badge: "Phase 1: setTimeout, setInterval",
        searchQuery: "Node.js event loop Timers phase setTimeout setInterval",
      },
      {
        id: "node-phase-pending",
        stepNumber: 2,
        label: "2. Pending Callbacks",
        badge: "Phase 2: Deferred OS / I/O errors",
        searchQuery: "Node.js event loop Pending Callbacks phase I/O errors",
      },
      {
        id: "node-phase-poll",
        stepNumber: 3,
        label: "3. Poll Phase",
        badge: "Phase 3: Core I/O Poll",
        searchQuery: "Node.js event loop Poll phase I/O fs network",
        subItems: [
          {
            id: "node-phase-poll-io",
            label: "I/O Callbacks (fs / network)",
            badge: "Incoming I/O Events",
            searchQuery: "Node.js Poll phase fs network I/O callbacks",
          },
        ],
      },
      {
        id: "node-phase-check",
        stepNumber: 4,
        label: "4. Check Phase",
        badge: "Phase 4: Post-Poll Execution",
        searchQuery: "Node.js event loop Check phase setImmediate",
        subItems: [
          {
            id: "node-phase-check-setimm",
            label: "setImmediate()",
            badge: "Runs right after poll",
            searchQuery: "setImmediate Check phase Node.js",
          },
        ],
      },
      {
        id: "node-phase-close",
        stepNumber: 5,
        label: "5. Close Callbacks",
        badge: "Phase 5: Cleanup",
        searchQuery: "Node.js event loop Close Callbacks phase socket.on close",
        subItems: [
          {
            id: "node-phase-close-socket",
            label: 'socket.on("close")',
            badge: "Resource Disposal",
            searchQuery: "socket.on close Close Callbacks Node.js",
          },
        ],
      },
    ],
  },
];

export function getGroupCardsForCategory(category: ConceptCategory): {
  rootLabel: string;
  rootBadge: string;
  rootColor: string;
  rootSearchQuery: string;
  cards: GroupCardData[];
} {
  if (category === "v8") {
    return {
      rootLabel: "V8 Engine",
      rootBadge: "Core Engine",
      rootColor: "#0284c7",
      rootSearchQuery: "V8 JavaScript Engine architecture",
      cards: V8_GROUP_CARDS,
    };
  }

  if (category === "scope") {
    return {
      rootLabel: "Scope & Closures",
      rootBadge: "Language Core",
      rootColor: "#a855f7",
      rootSearchQuery: "JavaScript Scope and Closures explained",
      cards: SCOPE_GROUP_CARDS,
    };
  }

  if (category === "node") {
    return {
      rootLabel: "Node.js Runtime",
      rootBadge: "System Runtime",
      rootColor: "#22c55e",
      rootSearchQuery: "Node.js Runtime architecture libuv event loop",
      cards: NODE_GROUP_CARDS,
    };
  }

  // All Concepts (Combined)
  return {
    rootLabel: "Node.js + JavaScript",
    rootBadge: "Master Hierarchy",
    rootColor: "#f59e0b",
    rootSearchQuery: "Node.js JavaScript architecture",
    cards: [
      ...V8_GROUP_CARDS,
      ...SCOPE_GROUP_CARDS,
      ...NODE_GROUP_CARDS,
    ],
  };
}
