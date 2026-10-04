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

/**
 * ONLY concepts with MORE THAN 3 children (> 3) are grouped into cards.
 * Concepts with <= 3 children remain individual keyword nodes.
 */

// V8 Groups with > 3 children:
// 1. JavaScript Execution (9 steps > 3)
// 2. Execution Stack & Context (4 items > 3)
// (Memory has only 2 items: Heap & GC <= 3, so it remains keyword nodes)
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

// Scope Groups: ALL groups have <= 3 items (Scope & Lookup has 3, Lexical Env has 1, Closure has 1)
// Therefore, Scope has ZERO cards and renders completely as individual keyword nodes!
export const SCOPE_GROUP_CARDS: GroupCardData[] = [];

// Node.js Groups with > 3 children:
// 1. Node.js Built-in APIs (4 items > 3)
// 2. libuv Infrastructure (4 items > 3)
// 3. Event Loop 5 Phases (5 items > 3)
// (Single-Threaded has 3 <= 3, Coordinator has 2 <= 3, Priority Queues has 3 <= 3, so they remain keyword nodes)
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

export function getGroupCardsForCategory(category: "all" | "v8" | "scope" | "node"): GroupCardData[] {
  if (category === "v8") return V8_GROUP_CARDS;
  if (category === "scope") return SCOPE_GROUP_CARDS;
  if (category === "node") return NODE_GROUP_CARDS;
  return [...V8_GROUP_CARDS, ...SCOPE_GROUP_CARDS, ...NODE_GROUP_CARDS];
}
