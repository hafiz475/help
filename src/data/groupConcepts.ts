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
  category: "v8" | "scope" | "closure" | "async" | "node" | "backend" | "realtime" | "queues" | "oop" | "dsa" | "bigo";
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

// Scope Groups: ALL groups have <= 3 items (Scope & Lookup has 3, Lexical Env has 1)
// Therefore, Scope has ZERO cards and renders completely as individual keyword nodes!
export const SCOPE_GROUP_CARDS: GroupCardData[] = [];

// Closures Groups: ALL groups have <= 3 items (Closure Core, Backpack, 5 Sentences)
export const CLOSURE_GROUP_CARDS: GroupCardData[] = [];

// Async JS Groups: ALL groups have <= 3 items (Callbacks, Promises, Async/Await)
export const ASYNC_GROUP_CARDS: GroupCardData[] = [];

// Backend Groups with > 3 children:
// 1. Express 10-Stage Middleware Lifecycle Pipeline (10 items > 3)
export const BACKEND_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-backend-middleware",
    pillarId: "backend-middleware-pipeline",
    title: "Express 10-Stage Middleware Pipeline",
    category: "backend",
    badge: "10 Sequential Stages",
    color: "#10b981",
    isPipeline: true,
    items: [
      {
        id: "mw-incoming",
        stepNumber: 1,
        label: "Incoming HTTP Request",
        badge: "Raw TCP Stream",
        searchQuery: "Node.js http createServer incoming message stream socket",
      },
      {
        id: "mw-cors",
        stepNumber: 2,
        label: "CORS Preflight (OPTIONS)",
        badge: "Origin Whitelist",
        searchQuery: "CORS preflight OPTIONS Access-Control-Allow-Origin header Express",
      },
      {
        id: "mw-body-parser",
        stepNumber: 3,
        label: "Body Parser (JSON)",
        badge: "Stream Deserialization",
        searchQuery: "express.json body-parser stream buffer parsing",
      },
      {
        id: "mw-logger",
        stepNumber: 4,
        label: "Request Logger & Trace ID",
        badge: "Correlation ID",
        searchQuery: "Morgan winston request logging correlation trace ID Express",
      },
      {
        id: "mw-auth",
        stepNumber: 5,
        label: "JWT Bearer Verification",
        badge: "req.user Injection",
        searchQuery: "JWT verification middleware Bearer token express req.user",
        subItems: [
          {
            id: "mw-jwt-verify",
            label: "jwt.verify(token, secret)",
            badge: "Signature Check",
            searchQuery: "jsonwebtoken jwt.verify signature expiration claims",
          },
        ],
      },
      {
        id: "mw-rate-limit",
        stepNumber: 6,
        label: "Rate Limiter Guard",
        badge: "Token Bucket / 429",
        searchQuery: "express-rate-limit Redis token bucket 429 Too Many Requests",
      },
      {
        id: "mw-validator",
        stepNumber: 7,
        label: "Zod Schema Validation",
        badge: "Fail-Fast 400",
        searchQuery: "Zod request schema validation middleware Express req.body",
      },
      {
        id: "mw-controller",
        stepNumber: 8,
        label: "Route Controller (CRUD)",
        badge: "Business Logic",
        searchQuery: "Express router controller database query Mongoose async await",
        subItems: [
          {
            id: "mw-db-query",
            label: "Model.find() / Save",
            badge: "Database Query",
            searchQuery: "Mongoose Model query async await CRUD Express",
          },
        ],
      },
      {
        id: "mw-error-handler",
        stepNumber: 9,
        label: "Global Error Boundary",
        badge: "(err, req, res, next)",
        searchQuery: "Express global error handling middleware 4 arguments next(err)",
      },
      {
        id: "mw-response",
        stepNumber: 10,
        label: "Response Termination",
        badge: "res.status().json()",
        searchQuery: "res.status res.json response termination Express socket flush",
      },
    ],
  },
];

// Real-Time Groups with > 3 children:
// 1. Socket.io 9-Stage Connection Lifecycle Pipeline (9 items > 3)
export const REALTIME_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-realtime-lifecycle",
    pillarId: "realtime-socketio-lifecycle",
    title: "Socket.io 9-Stage Connection Pipeline",
    category: "realtime",
    badge: "9 Sequential Stages",
    color: "#0ea5e9",
    isPipeline: true,
    items: [
      {
        id: "rt-handshake-req",
        stepNumber: 1,
        label: "Client Handshake Request",
        badge: "GET /socket.io/?EIO=4",
        searchQuery: "Socket.io Engine.IO client handshake query params HTTP GET transport",
      },
      {
        id: "rt-protocol-upgrade",
        stepNumber: 2,
        label: "HTTP 101 Protocol Upgrade",
        badge: "TCP Socket Hijack",
        searchQuery: "HTTP 101 Switching Protocols websocket upgrade Sec-WebSocket-Accept",
      },
      {
        id: "rt-auth-middleware",
        stepNumber: 3,
        label: "Socket Auth Middleware",
        badge: "io.use((socket, next))",
        searchQuery: "Socket.io authentication middleware io.use JWT socket.handshake.auth",
        subItems: [
          {
            id: "rt-jwt-handshake",
            label: "socket.handshake.auth",
            badge: "JWT Extraction",
            searchQuery: "socket.handshake.auth token verification Socket.io",
          },
        ],
      },
      {
        id: "rt-conn-established",
        stepNumber: 4,
        label: "Connection Established",
        badge: "io.on('connection')",
        searchQuery: "io.on connection Socket.io server instance unique socket id",
      },
      {
        id: "rt-room-subscription",
        stepNumber: 5,
        label: "Room & Channel Join",
        badge: "socket.join(roomId)",
        searchQuery: "socket.join Socket.io rooms multi-tenant isolation channels",
      },
      {
        id: "rt-duplex-event",
        stepNumber: 6,
        label: "Bi-Directional Emit & Ack",
        badge: "socket.emit(event, data, ack)",
        searchQuery: "Socket.io acknowledgement callbacks request response over websocket",
        subItems: [
          {
            id: "rt-ack-callback",
            label: "Ack Callback Function",
            badge: "Rpc-style Ack",
            searchQuery: "Socket.io acknowledgement callback client server reply",
          },
        ],
      },
      {
        id: "rt-heartbeat",
        stepNumber: 7,
        label: "Heartbeat Ping / Pong",
        badge: "pingInterval / pingTimeout",
        searchQuery: "Socket.io pingInterval pingTimeout heartbeat keep alive dead connection detection",
      },
      {
        id: "rt-broadcast-emit",
        stepNumber: 8,
        label: "Room Broadcast Event",
        badge: "io.to(room).emit()",
        searchQuery: "io.to room emit socket.broadcast.to Redis adapter distribution",
      },
      {
        id: "rt-disconnect-cleanup",
        stepNumber: 9,
        label: "Graceful Disconnect & Eviction",
        badge: "socket.on('disconnect')",
        searchQuery: "socket.on disconnect reasons transport close ping timeout room auto leave",
      },
    ],
  },
];

// Queues Groups with > 3 children:
// 1. BullMQ 9-Stage Job Lifecycle Pipeline (9 items > 3)
export const QUEUES_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-queues-lifecycle",
    pillarId: "queues-bullmq-lifecycle",
    title: "BullMQ 9-Stage Job Lifecycle Pipeline",
    category: "queues",
    badge: "9 Sequential Stages",
    color: "#f97316",
    isPipeline: true,
    items: [
      {
        id: "q-job-add",
        stepNumber: 1,
        label: "Job Produced & Enqueued",
        badge: "queue.add(name, data)",
        searchQuery: "BullMQ queue.add job producer serialization payload priority",
      },
      {
        id: "q-waiting-queue",
        stepNumber: 2,
        label: "Waiting State (FIFO/LIFO)",
        badge: "bull:queue:wait",
        searchQuery: "BullMQ waiting jobs list Redis atomic push priority order",
      },
      {
        id: "q-lock-acquire",
        stepNumber: 3,
        label: "Worker Lock Acquisition",
        badge: "Atomic Redlock",
        searchQuery: "BullMQ job lock renewal lockDuration worker stall prevention",
      },
      {
        id: "q-active-process",
        stepNumber: 4,
        label: "Active Processing State",
        badge: "worker.process()",
        searchQuery: "BullMQ Worker processor async function concurrency sandboxed",
        subItems: [
          {
            id: "q-worker-concurrency",
            label: "Worker Concurrency Pool",
            badge: "Parallel Jobs",
            searchQuery: "BullMQ Worker concurrency parallel jobs event loop",
          },
        ],
      },
      {
        id: "q-progress-heartbeat",
        stepNumber: 5,
        label: "Progress & Heartbeat Update",
        badge: "job.updateProgress(n%)",
        searchQuery: "BullMQ job.updateProgress real time job tracking Redis pub sub",
      },
      {
        id: "q-job-completed",
        stepNumber: 6,
        label: "Success & Completion",
        badge: "moveToCompleted()",
        searchQuery: "BullMQ completed jobs return value event emitter on completed",
      },
      {
        id: "q-retry-backoff",
        stepNumber: 7,
        label: "Retry on Failure",
        badge: "attempts / backoff",
        searchQuery: "BullMQ retry backoff exponential strategy attempts configuration",
        subItems: [
          {
            id: "q-exp-backoff",
            label: "Exponential Backoff",
            badge: "delay * 2^attempt",
            searchQuery: "exponential backoff formula job retry queue",
          },
        ],
      },
      {
        id: "q-dlq-failed",
        stepNumber: 8,
        label: "Dead-Letter Quarantine",
        badge: "moveToFailed() / DLQ",
        searchQuery: "BullMQ failed jobs inspection stack trace dead letter queue",
      },
      {
        id: "q-evict-cleanup",
        stepNumber: 9,
        label: "Retention & Eviction",
        badge: "removeOnComplete / Fail",
        searchQuery: "BullMQ job retention removeOnComplete removeOnFail count max age",
      },
    ],
  },
];

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
    pillarId: "node-libuv-infra",
    title: "libuv Thread Pool & OS I/O",
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
  {
    id: "group-node-restaurant",
    pillarId: "node-restaurant-pillar",
    title: "The Restaurant Cast (Node.js)",
    category: "node",
    badge: "Analogy Cast",
    color: "#f97316",
    items: [
      {
        id: "node-cast-chef",
        label: "🧑🍳 The Chef (V8 Engine)",
        badge: "Runs JS 1 line at a time",
        searchQuery: "V8 Engine JavaScript single thread chef analogy",
      },
      {
        id: "node-cast-building",
        label: "🏢 The Restaurant (Node.js Runtime)",
        badge: "Wraps fs, network, timers",
        searchQuery: "Node.js runtime wrapped around V8 C++ bindings",
      },
      {
        id: "node-cast-kitchen",
        label: "🧰 Back Kitchen Staff (libuv)",
        badge: "Quiet background heavy lifting",
        searchQuery: "libuv C library slow heavy background jobs",
      },
      {
        id: "node-cast-waiter",
        label: "🧑💼 Head Waiter (Event Loop)",
        badge: "Checks if chef is free",
        searchQuery: "Event loop waiter strict lap cycle stations",
      },
      {
        id: "node-cast-helpers",
        label: "🧵 Extra Helpers (Thread Pool)",
        badge: "4 backup threads (fs, crypto, zlib)",
        searchQuery: "libuv thread pool 4 helpers fs crypto zlib",
      },
      {
        id: "node-fs-lifecycle",
        label: "🎟️ fs.readFile() Lifecycle",
        badge: "Stack freed during I/O wait",
        searchQuery: "fs.readFile async lifecycle call stack non-blocking Node.js",
      },
    ],
  },
];

export const OOP_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-oop-pillars",
    pillarId: "oop-pillars-pillar",
    title: "OOP 4 Pillars & Analogies",
    category: "oop",
    badge: "5 Design Concepts",
    color: "#ec4899",
    items: [
      {
        id: "oop-class-obj",
        label: "Class & Object",
        badge: "🍪 Cookie Cutter & Cookie",
        searchQuery: "JavaScript class and object cookie cutter analogy",
      },
      {
        id: "oop-encapsulation",
        label: "Encapsulation",
        badge: "🪙 Piggy Bank (Safe Coin Slot)",
        searchQuery: "OOP Encapsulation piggy bank private properties JavaScript",
      },
      {
        id: "oop-inheritance",
        label: "Inheritance",
        badge: "🤖 Base Robot (Reused Code)",
        searchQuery: "JavaScript inheritance extends base robot analogy",
      },
      {
        id: "oop-polymorphism",
        label: "Polymorphism",
        badge: "🎮 Same Button, Varied Action",
        searchQuery: "JavaScript Polymorphism method overriding analogy",
      },
      {
        id: "oop-abstraction",
        label: "Abstraction",
        badge: "🚗 Gas Pedal (Hidden Engine)",
        searchQuery: "OOP Abstraction car gas pedal complexity JavaScript",
      },
    ],
  },
];

export const DSA_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-ds-structures",
    pillarId: "dsa-structures-pillar",
    title: "Data Structures & Stories",
    category: "dsa",
    badge: "7 Core Structures",
    color: "#3b82f6",
    items: [
      {
        id: "ds-array",
        label: "Array / List",
        badge: "🚗 Numbered Parking Lot",
        searchQuery: "JavaScript Array numbered parking lot index lookup",
      },
      {
        id: "ds-stack",
        label: "Stack (LIFO)",
        badge: "🥞 Pancake Plate (Top Only)",
        searchQuery: "Stack data structure pancake plate LIFO JavaScript",
      },
      {
        id: "ds-queue",
        label: "Queue (FIFO)",
        badge: "☕ Coffee Shop Line (FIFO)",
        searchQuery: "Queue data structure coffee shop line FIFO JavaScript",
      },
      {
        id: "ds-linked-list",
        label: "Linked List",
        badge: "🗺️ Treasure Hunt Clues",
        searchQuery: "Linked List data structure treasure hunt pointers JavaScript",
      },
      {
        id: "ds-tree",
        label: "Tree",
        badge: "🌳 Family Tree (No Loops)",
        searchQuery: "Tree data structure family tree binary search tree JavaScript",
      },
      {
        id: "ds-graph",
        label: "Graph",
        badge: "🕸️ Social Network Map",
        searchQuery: "Graph data structure social network connections JavaScript",
      },
      {
        id: "ds-hashmap",
        label: "Hash Map / Object",
        badge: "📖 Phonebook (Direct Key)",
        searchQuery: "Hash map data structure phonebook O(1) JavaScript",
      },
    ],
  },
];

export const BIGO_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-big-o-tiers",
    pillarId: "dsa-big-o-pillar",
    title: "Big O Time Complexity (Best → Worst)",
    category: "bigo",
    badge: "7 Complexity Tiers",
    color: "#f59e0b",
    isPipeline: true,
    items: [
      {
        id: "big-o-1",
        stepNumber: 1,
        label: "O(1) Constant",
        badge: "📖 Phonebook: Instant",
        searchQuery: "Big O O(1) constant time phonebook lookup JavaScript",
      },
      {
        id: "big-o-logn",
        stepNumber: 2,
        label: "O(log n) Logarithmic",
        badge: "🎯 Guessing Game: Cut Half",
        searchQuery: "Big O O(log n) logarithmic binary search guessing game",
      },
      {
        id: "big-o-n",
        stepNumber: 3,
        label: "O(n) Linear",
        badge: "🍬 Check Every Candy Once",
        searchQuery: "Big O O(n) linear search scan list once",
      },
      {
        id: "big-o-nlogn",
        stepNumber: 4,
        label: "O(n log n) Linearithmic",
        badge: "✂️ Split & Merge Back",
        searchQuery: "Big O O(n log n) merge sort quick sort divide conquer",
      },
      {
        id: "big-o-n2",
        stepNumber: 5,
        label: "O(n²) Quadratic",
        badge: "🔄 Nested Loop: Compare Pairs",
        searchQuery: "Big O O(n^2) quadratic bubble sort nested loops",
      },
      {
        id: "big-o-2n",
        stepNumber: 6,
        label: "O(2ⁿ) Exponential",
        badge: "🎲 Double Choices: Subsets",
        searchQuery: "Big O O(2^n) exponential power set all subsets",
      },
      {
        id: "big-o-nfact",
        stepNumber: 7,
        label: "O(n!) Factorial",
        badge: "💥 Every Order: Permutations",
        searchQuery: "Big O O(n!) factorial traveling salesperson permutations",
      },
    ],
  },
];

export function getGroupCardsForCategory(category: "all" | "v8" | "scope" | "closure" | "async" | "node" | "backend" | "realtime" | "queues" | "oop" | "dsa" | "bigo"): GroupCardData[] {
  if (category === "v8") return V8_GROUP_CARDS;
  if (category === "scope") return SCOPE_GROUP_CARDS;
  if (category === "closure") return CLOSURE_GROUP_CARDS;
  if (category === "async") return ASYNC_GROUP_CARDS;
  if (category === "node") return NODE_GROUP_CARDS;
  if (category === "backend") return BACKEND_GROUP_CARDS;
  if (category === "realtime") return REALTIME_GROUP_CARDS;
  if (category === "queues") return QUEUES_GROUP_CARDS;
  if (category === "oop") return OOP_GROUP_CARDS;
  if (category === "dsa") return DSA_GROUP_CARDS;
  if (category === "bigo") return BIGO_GROUP_CARDS;
  return [...V8_GROUP_CARDS, ...SCOPE_GROUP_CARDS, ...CLOSURE_GROUP_CARDS, ...ASYNC_GROUP_CARDS, ...NODE_GROUP_CARDS, ...BACKEND_GROUP_CARDS, ...REALTIME_GROUP_CARDS, ...QUEUES_GROUP_CARDS, ...OOP_GROUP_CARDS, ...DSA_GROUP_CARDS, ...BIGO_GROUP_CARDS];
}
