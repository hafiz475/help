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
  category: "v8" | "scope" | "closure" | "async" | "node" | "backend" | "realtime" | "queues" | "scaling" | "platform" | "rendering" | "security" | "state" | "perf" | "aimath" | "mlcore" | "deeplearning" | "nlpllms" | "vision" | "mobile" | "data" | "gamedev" | "iot" | "blockchain" | "react" | "oop" | "dsa" | "bigo";
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

// Scaling Groups with > 3 children:
// 1. NGINX 9-Stage Reverse Proxy & Balancing Pipeline (9 items > 3)
export const SCALING_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-scaling-nginx",
    pillarId: "scaling-nginx-pipeline",
    title: "NGINX 9-Stage Reverse Proxy Pipeline",
    category: "scaling",
    badge: "9 Sequential Stages",
    color: "#14b8a6",
    isPipeline: true,
    items: [
      {
        id: "sc-tls-term",
        stepNumber: 1,
        label: "Client TLS Termination",
        badge: "SSL / HTTP/2 / HTTP/3",
        searchQuery: "NGINX SSL termination TLS handshake offloading HTTPS certificates",
      },
      {
        id: "sc-route-match",
        stepNumber: 2,
        label: "Upstream Route Matching",
        badge: "proxy_pass http://cluster",
        searchQuery: "NGINX upstream block proxy_pass location matching URL rewrite",
      },
      {
        id: "sc-health-probe",
        stepNumber: 3,
        label: "Health Check Probe",
        badge: "interval=5s fails=3",
        searchQuery: "NGINX active health checks probe interval fails uri healthz",
        subItems: [
          {
            id: "sc-passive-probe",
            label: "Passive & Active Probes",
            badge: "max_fails / /healthz",
            searchQuery: "NGINX max_fails fail_timeout active health check differences",
          },
        ],
      },
      {
        id: "sc-balancer-select",
        stepNumber: 4,
        label: "Routing Policy Execution",
        badge: "least_conn / round_robin",
        searchQuery: "NGINX load balancing directive least_conn round_robin weight",
      },
      {
        id: "sc-sticky-session",
        stepNumber: 5,
        label: "Sticky Session Hash",
        badge: "ip_hash / cookie srv_id",
        searchQuery: "NGINX ip_hash sticky cookie session persistence stateful",
      },
      {
        id: "sc-conn-pooling",
        stepNumber: 6,
        label: "Connection Pooling Reuse",
        badge: "keepalive 64 pool",
        searchQuery: "NGINX upstream keepalive connection pooling TCP reuse latency",
      },
      {
        id: "sc-upstream-forward",
        stepNumber: 7,
        label: "Upstream Request Forwarding",
        badge: "proxy_set_header",
        searchQuery: "NGINX proxy_set_header X-Forwarded-For X-Real-IP Host proxy_next_upstream",
      },
      {
        id: "sc-failover-circuit",
        stepNumber: 8,
        label: "Circuit Breaker & Failover",
        badge: "proxy_next_upstream",
        searchQuery: "NGINX proxy_next_upstream error timeout http_502 http_503 circuit breaker",
        subItems: [
          {
            id: "sc-circuit-breaker",
            label: "Instant Node Eviction",
            badge: "502/503 Evict",
            searchQuery: "circuit breaker pattern load balancer server eviction failover",
          },
        ],
      },
      {
        id: "sc-cache-compress",
        stepNumber: 9,
        label: "Caching & Gzip Streaming",
        badge: "proxy_cache / gzip",
        searchQuery: "NGINX proxy_cache microcaching gzip compression response streaming",
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

export const PLATFORM_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-platform-layout",
    pillarId: "platform-css-pipeline",
    title: "CSS Layout & Box Model Engine",
    category: "platform",
    badge: "9 Sequential Stages",
    color: "#4338ca",
    isPipeline: true,
    items: [
      {
        id: "pf-token-parse",
        stepNumber: 1,
        label: "1. HTML/CSS Tokenizer",
        badge: "🔤 Byte Stream → Tokens",
        searchQuery: "HTML parser CSS tokenizer character stream DOM CSSOM construction",
      },
      {
        id: "pf-cascade-resolve",
        stepNumber: 2,
        label: "2. Cascade & Specificity",
        badge: "⚖️ @layer & Specificity",
        searchQuery: "CSS cascade layers specificity calculation inline ID class element important",
      },
      {
        id: "pf-computed-style",
        stepNumber: 3,
        label: "3. Computed Values",
        badge: "📐 Relative → Pixels",
        searchQuery: "getComputedStyle rem em vw relative to absolute pixel conversion",
      },
      {
        id: "pf-box-sizing",
        stepNumber: 4,
        label: "4. Box Model Geometry",
        badge: "📦 Border-Box & Margin Collapse",
        searchQuery: "CSS box-sizing border-box content-box margin collapsing adjacent blocks",
      },
      {
        id: "pf-bformatting-context",
        stepNumber: 5,
        label: "5. Formatting Contexts",
        badge: "🧱 Block & Inline Formatting (BFC)",
        searchQuery: "block formatting context BFC inline formatting context float clearance overflow hidden",
      },
      {
        id: "pf-flex-layout",
        stepNumber: 6,
        label: "6. Flexbox Flow Engine",
        badge: "↔️ Main & Cross Axis",
        searchQuery: "CSS flexbox flex-grow flex-shrink flex-basis main axis cross axis justify-content",
      },
      {
        id: "pf-grid-layout",
        stepNumber: 7,
        label: "7. CSS Grid Track Matrix",
        badge: "▦ 2D Explicit/Implicit Tracks",
        searchQuery: "CSS Grid layout fr units grid-template-areas auto-fit minmax implicit tracks",
      },
      {
        id: "pf-overflow-stacking",
        stepNumber: 8,
        label: "8. Stacking Context & Z-Index",
        badge: "📚 3D Depth Layers",
        searchQuery: "CSS stacking context z-index opacity transform isolation will-change paint order",
      },
      {
        id: "pf-render-paint",
        stepNumber: 9,
        label: "9. Layer Composite & Paint",
        badge: "🎨 GPU Raster & Compositing",
        searchQuery: "browser paint composite rasterization GPU layers transform translateZ",
      },
    ],
  },
];

export const RENDERING_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-rendering-crp",
    pillarId: "rendering-pipeline",
    title: "Critical Rendering Path Pipeline",
    category: "rendering",
    badge: "9 Sequential Stages",
    color: "#e11d48",
    isPipeline: true,
    items: [
      {
        id: "crp-bytes-tokens",
        stepNumber: 1,
        label: "1. Network Bytes & Tokens",
        badge: "🔤 Stream → Tokens",
        searchQuery: "browser network bytes characters tokens lexical analysis parser",
      },
      {
        id: "crp-dom-tree",
        stepNumber: 2,
        label: "2. Incremental DOM Tree",
        badge: "🌳 Node Hierarchy",
        searchQuery: "incremental DOM tree building browser streaming HTML parser",
      },
      {
        id: "crp-cssom-tree",
        stepNumber: 3,
        label: "3. CSSOM Construction",
        badge: "📜 Render-Blocking CSS",
        searchQuery: "CSSOM construction render blocking stylesheets link rel stylesheet",
      },
      {
        id: "crp-render-tree",
        stepNumber: 4,
        label: "4. Render Tree Assembly",
        badge: "👁️ Visible Elements Only",
        searchQuery: "Render Tree construction combine DOM CSSOM display none omitted",
      },
      {
        id: "crp-layout-reflow",
        stepNumber: 5,
        label: "5. Layout (Reflow)",
        badge: "📐 Coordinate Geometry",
        searchQuery: "browser layout reflow geometry calculation viewport box coordinates",
      },
      {
        id: "crp-paint-raster",
        stepNumber: 6,
        label: "6. Paint (Rasterization)",
        badge: "🎨 Draw Calls & Textures",
        searchQuery: "browser paint phase draw calls skia rasterization pixel fill",
      },
      {
        id: "crp-gpu-composite",
        stepNumber: 7,
        label: "7. GPU Compositing",
        badge: "⚡ Hardware Layer Blending",
        searchQuery: "GPU compositing compositor thread tiling layer trees transform translateZ",
      },
      {
        id: "crp-frame-budget",
        stepNumber: 8,
        label: "8. 16.6ms Frame Budget",
        badge: "⏱️ 60 FPS Vsync Window",
        searchQuery: "60 FPS 16.6ms frame budget jank avoidance vsync display refresh",
      },
      {
        id: "crp-vitals-metrics",
        stepNumber: 9,
        label: "9. Core Web Vitals (LCP/CLS)",
        badge: "📊 Performance Telemetry",
        searchQuery: "Core Web Vitals LCP INP CLS First Contentful Paint telemetry",
      },
    ],
  },
];

export const SECURITY_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-security-pipeline",
    pillarId: "security-cookie-lifecycle",
    title: "Cookie Security & Storage Pipeline",
    category: "security",
    badge: "9 Sequential Stages",
    color: "#a16207",
    isPipeline: true,
    items: [
      {
        id: "sec-origin-check",
        stepNumber: 1,
        label: "1. Origin Tuple Check",
        badge: "🔒 Protocol + Host + Port",
        searchQuery: "browser origin tuple check scheme domain port security boundary",
      },
      {
        id: "sec-preflight-handshake",
        stepNumber: 2,
        label: "2. CORS Preflight Handshake",
        badge: "🤝 OPTIONS Handshake",
        searchQuery: "CORS preflight handshake OPTIONS Access-Control-Allow-Origin",
      },
      {
        id: "sec-cookie-attributes",
        stepNumber: 3,
        label: "3. Cookie Security Flags",
        badge: "🛡️ HttpOnly, Secure, SameSite",
        searchQuery: "Set-Cookie flags HttpOnly Secure SameSite Strict Lax None",
      },
      {
        id: "sec-cookie-storage",
        stepNumber: 4,
        label: "4. Cookie Jar Scoping",
        badge: "🍪 Domain & Path Scoping",
        searchQuery: "cookie jar domain path scoping session vs persistent cookie",
      },
      {
        id: "sec-local-storage",
        stepNumber: 5,
        label: "5. Web Storage (5MB KV)",
        badge: "💾 localStorage / sessionStorage",
        searchQuery: "localStorage vs sessionStorage synchronous key value 5MB quota",
      },
      {
        id: "sec-indexeddb",
        stepNumber: 6,
        label: "6. IndexedDB Transactions",
        badge: "🗄️ Async NoSQL Store",
        searchQuery: "IndexedDB transactional object store indexes cursor async storage",
      },
      {
        id: "sec-xss-defense",
        stepNumber: 7,
        label: "7. XSS Sanitization & CSP",
        badge: "🧼 Input Escaping & Nonces",
        searchQuery: "cross site scripting XSS prevention sanitization CSP nonce innerHTML",
      },
      {
        id: "sec-csrf-protection",
        stepNumber: 8,
        label: "8. Anti-CSRF Tokens",
        badge: "🎫 Synchronizer Token & SameSite",
        searchQuery: "cross site request forgery CSRF synchronizer token pattern SameSite cookie",
      },
      {
        id: "sec-credential-transport",
        stepNumber: 9,
        label: "9. Credentialed Transport",
        badge: "🔑 Authorization & Bearer Tokens",
        searchQuery: "HTTP Authorization Bearer token withCredentials fetch credentials include",
      },
    ],
  },
];

export const STATE_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-state-pipeline",
    pillarId: "state-rendering-pipeline",
    title: "9-Stage Rendering & State Pipeline",
    category: "state",
    badge: "9 Sequential Stages",
    color: "#6d28d9",
    isPipeline: true,
    items: [
      {
        id: "state-ssg-build",
        stepNumber: 1,
        label: "1. Build-Time Static Synthesis (SSG)",
        badge: "⚡ Pre-rendered HTML & JSON",
        searchQuery: "static site generation SSG build time prerendering Next.js Astro getStaticProps",
      },
      {
        id: "state-ssr-server-render",
        stepNumber: 2,
        label: "2. Server-Side Rendering (SSR)",
        badge: "🖥️ Dynamic Node.js Streams",
        searchQuery: "server side rendering SSR Node.js renderToPipeableStream dynamic request HTML",
      },
      {
        id: "state-rsc-stream",
        stepNumber: 3,
        label: "3. React Server Components (RSC)",
        badge: "📡 Zero-Bundle Flight Stream",
        searchQuery: "React Server Components RSC flight protocol serialized AST zero client bundle",
      },
      {
        id: "state-edge-isr-cache",
        stepNumber: 4,
        label: "4. Edge CDN & Revalidation (ISR)",
        badge: "🌐 Stale-While-Revalidate",
        searchQuery: "incremental static regeneration ISR edge CDN caching background revalidation",
      },
      {
        id: "state-csr-client-mount",
        stepNumber: 5,
        label: "5. Client Single-Page App (CSR)",
        badge: "📦 JS Bundle Download & Mount",
        searchQuery: "client side rendering CSR single page app bundle bootstrap V8 execution",
      },
      {
        id: "state-hydration-reconcile",
        stepNumber: 6,
        label: "6. DOM Hydration & Event Attachment",
        badge: "💧 Hydrating Server HTML",
        searchQuery: "DOM hydration attaching event listeners server client mismatch reconciliation",
      },
      {
        id: "state-unidirectional-mutation",
        stepNumber: 7,
        label: "7. Unidirectional State Mutation",
        badge: "🔄 Action → Dispatch → Reducer",
        searchQuery: "unidirectional data flow Redux dispatch actions pure reducer immutable state",
      },
      {
        id: "state-signal-graph-update",
        stepNumber: 8,
        label: "8. Fine-Grained Signals & Graphs",
        badge: "⚡ Surgical DOM Micro-Updates",
        searchQuery: "fine grained signals SolidJS reactivity graph micro DOM updates without VDOM",
      },
      {
        id: "state-server-state-sync",
        stepNumber: 9,
        label: "9. Server State & Optimistic UI",
        badge: "🚀 TanStack Query & Rollback",
        searchQuery: "server state synchronization TanStack Query optimistic UI updates rollback cache invalidation",
      },
    ],
  },
];

export const PERF_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-perf-pipeline",
    pillarId: "perf-optimization-pipeline",
    title: "9-Stage Performance & a11y Pipeline",
    category: "perf",
    badge: "9 Sequential Stages",
    color: "#4d7c0f",
    isPipeline: true,
    items: [
      {
        id: "perf-resource-hints",
        stepNumber: 1,
        label: "1. DNS Prefetch & Preconnect",
        badge: "⚡ dns-prefetch & preconnect",
        searchQuery: "resource hints dns prefetch preconnect early hints 103 preload HTTP 2 3",
      },
      {
        id: "perf-asset-priority",
        stepNumber: 2,
        label: "2. Fetch Priority & Hero Preload",
        badge: "🚀 fetchpriority='high' & preload",
        searchQuery: "fetchpriority high hero image preloading responsive preload font preload crossorigin",
      },
      {
        id: "perf-code-splitting",
        stepNumber: 3,
        label: "3. Dynamic Import & Tree Shaking",
        badge: "✂️ Dynamic import() & ESM Dead Code",
        searchQuery: "code splitting dynamic import React lazy Vite Webpack tree shaking sideEffects false",
      },
      {
        id: "perf-image-optimization",
        stepNumber: 4,
        label: "4. Responsive Images & AVIF/WebP",
        badge: "🖼️ AVIF, WebP, srcset & sizes",
        searchQuery: "next image picture element AVIF WebP srcset sizes loading lazy decoding async",
      },
      {
        id: "perf-main-thread-yield",
        stepNumber: 5,
        label: "5. Main-Thread Yielding & Scheduler",
        badge: "⏱️ scheduler.yield() & 50ms Slices",
        searchQuery: "scheduler yield requestIdleCallback break up long tasks INP optimization 50ms rule",
      },
      {
        id: "perf-layout-reservation",
        stepNumber: 6,
        label: "6. Geometry & Font Pre-allocation",
        badge: "📐 aspect-ratio & font-display: swap",
        searchQuery: "prevent CLS aspect-ratio dimension reservation font-display optional fallback metric override",
      },
      {
        id: "perf-a11y-tree-synthesis",
        stepNumber: 7,
        label: "7. Accessibility Tree Synthesis",
        badge: "♿ DOM to AOM Tree Translation",
        searchQuery: "Accessibility Tree AOM synthesis semantic HTML vs generic div browser tree computation",
      },
      {
        id: "perf-focus-management",
        stepNumber: 8,
        label: "8. Modal Focus Trap & Roving Tabindex",
        badge: "🎯 inert attribute & Focus Containment",
        searchQuery: "modal focus trap inert attribute roving tabindex keyboard accessibility WCAG",
      },
      {
        id: "perf-rum-monitoring",
        stepNumber: 9,
        label: "9. RUM Telemetry & Lighthouse 100",
        badge: "📊 web-vitals RUM & Axe-core",
        searchQuery: "Real User Monitoring RUM web-vitals npm package Google Analytics axe-core automated audit",
      },
    ],
  },
];

export const AIMATH_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-aimath-pipeline",
    pillarId: "aimath-pipeline-pillar",
    title: "9-Stage Tensor Math & Probability Pipeline",
    category: "aimath",
    badge: "9 Sequential Stages",
    color: "#a21caf",
    isPipeline: true,
    items: [
      {
        id: "aimath-tensor-rank",
        stepNumber: 1,
        label: "1. Tensor Ranks (0D to 4D)",
        badge: "🔢 Scalars to 4D Batches",
        searchQuery: "tensor rank dimension scalar 0D vector 1D matrix 2D batch image tensor 4D",
      },
      {
        id: "aimath-dot-product",
        stepNumber: 2,
        label: "2. Vector Projections & Similarity",
        badge: "📐 u · v = ||u|| ||v|| cos θ",
        searchQuery: "dot product cosine similarity vector angle semantic embedding search",
      },
      {
        id: "aimath-matrix-transforms",
        stepNumber: 3,
        label: "3. Matrix Multiplication & Transpose",
        badge: "🔄 (M × K) @ (K × N) GEMM",
        searchQuery: "matrix multiplication inner dimension match transpose AT GPU GEMM acceleration",
      },
      {
        id: "aimath-determinants-inverses",
        stepNumber: 4,
        label: "4. Determinants & Matrix Inverses",
        badge: "🔍 det(A) ≠ 0 & A⁻¹ Invertibility",
        searchQuery: "matrix determinant volume scaling matrix inverse singular matrix rank deficiency",
      },
      {
        id: "aimath-eigen-pca",
        stepNumber: 5,
        label: "5. Eigendecomposition & PCA",
        badge: "✨ A v = λ v & Dimensionality Drop",
        searchQuery: "eigendecomposition principal component analysis PCA variance maximization SVD",
      },
      {
        id: "aimath-conditional-bayes",
        stepNumber: 6,
        label: "6. Conditional Probability & Bayes",
        badge: "🎲 P(Hypothesis | Evidence)",
        searchQuery: "Bayes rule conditional probability prior posterior likelihood marginal probability",
      },
      {
        id: "aimath-gaussian-distributions",
        stepNumber: 7,
        label: "7. Normal Distributions & Variance",
        badge: "🔔 Bell Curve: μ (Mean) & σ² (Var)",
        searchQuery: "Gaussian normal distribution probability density function PDF mean variance standard deviation",
      },
      {
        id: "aimath-multivariate-gradients",
        stepNumber: 8,
        label: "8. Partial Derivatives & Gradients",
        badge: "📉 ∇f = [∂f/∂x₁, ∂f/∂x₂]",
        searchQuery: "multivariate calculus gradient vector partial derivative steepest descent tangent plane",
      },
      {
        id: "aimath-numpy-broadcasting-stage",
        stepNumber: 9,
        label: "9. Strided Tensor Broadcasting",
        badge: "⚡ Zero-Copy SIMD Broadcast",
        searchQuery: "NumPy broadcasting dimensions match trailing axis stride tricks vectorized tensor math",
      },
    ],
  },
];

export const MLCORE_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-mlcore-pipeline",
    pillarId: "mlcore-pipeline-pillar",
    title: "Machine Learning Lifecycle Pipeline",
    category: "mlcore",
    badge: "9 Sequential Stages",
    color: "#0284c7",
    isPipeline: true,
    items: [
      {
        id: "mlcore-problem-framing",
        stepNumber: 1,
        label: "1. Problem Framing & Data Collection",
        badge: "🎯 Objective & Label Ingestion",
        searchQuery: "machine learning problem framing business metric target variable data ingestion data drift",
      },
      {
        id: "mlcore-eda-cleaning",
        stepNumber: 2,
        label: "2. Data Cleaning & Imputation",
        badge: "🧹 Missing Values & Outliers",
        searchQuery: "exploratory data analysis EDA missing value imputation median mean mode outlier removal IQR",
      },
      {
        id: "mlcore-feature-engineering",
        stepNumber: 3,
        label: "3. Feature Scaling & Encoding",
        badge: "📐 StandardScaler & One-Hot",
        searchQuery: "feature engineering standardization normalizer min max scaling one hot encoding target encoding",
      },
      {
        id: "mlcore-train-test-split",
        stepNumber: 4,
        label: "4. Stratified Dataset Splitting",
        badge: "✂️ 80/20 & Class Stratification",
        searchQuery: "train test split stratified k fold data leakage prevention temporal split validation set",
      },
      {
        id: "mlcore-model-training",
        stepNumber: 5,
        label: "5. Estimator Fit & Optimization",
        badge: "🏋️ Gradient Descent & Loss Min",
        searchQuery: "model fit estimator loss function optimization gradient descent backprop convergence",
      },
      {
        id: "mlcore-cross-validation",
        stepNumber: 6,
        label: "6. K-Fold Cross-Validation",
        badge: "🔄 5-Fold Resampling Stability",
        searchQuery: "k-fold cross validation out of fold predictions resampling variance estimation scikit-learn",
      },
      {
        id: "mlcore-hyperparam-tuning",
        stepNumber: 7,
        label: "7. Hyperparameter Tuning",
        badge: "🎛️ GridSearchCV & Optuna Bayes",
        searchQuery: "hyperparameter tuning grid search randomized search Optuna Bayesian optimization learning rate tree depth",
      },
      {
        id: "mlcore-model-evaluation",
        stepNumber: 8,
        label: "8. Evaluation & Residual Analysis",
        badge: "📊 F1, ROC-AUC & Residuals",
        searchQuery: "model evaluation confusion matrix precision recall F1 score ROC AUC curve residual plots error analysis",
      },
      {
        id: "mlcore-model-serving",
        stepNumber: 9,
        label: "9. ONNX / Joblib Export & Serving",
        badge: "🚀 Serialization & Fast Inference",
        searchQuery: "model deployment joblib pickle ONNX export Triton FastAPI latency monitoring drift detection",
      },
    ],
  },
];

export const DEEPLEARNING_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-dl-pipeline",
    pillarId: "dl-pipeline-pillar",
    title: "Deep Learning Training Pipeline",
    category: "deeplearning",
    badge: "9 Sequential Stages",
    color: "#7c3aed",
    isPipeline: true,
    items: [
      {
        id: "dl-dataset-dataloader",
        stepNumber: 1,
        label: "1. PyTorch Dataset & DataLoader",
        badge: "📦 Batching & Workers",
        searchQuery: "PyTorch Dataset DataLoader batch size pin memory num workers prefetch collate fn",
      },
      {
        id: "dl-weight-init",
        stepNumber: 2,
        label: "2. Weight Initialization",
        badge: "🎲 He & Xavier / Glorot",
        searchQuery: "weight initialization He Kaiming initialization Xavier Glorot normal uniform variance scaling",
      },
      {
        id: "dl-forward-pass",
        stepNumber: 3,
        label: "3. Tensor Forward Propagation",
        badge: "⚡ MatMul & Layer Graph",
        searchQuery: "forward pass tensor matrix multiplication linear layers activations computational graph",
      },
      {
        id: "dl-loss-computation",
        stepNumber: 4,
        label: "4. Loss Function Computation",
        badge: "🎯 CrossEntropy & MSE",
        searchQuery: "loss computation cross entropy loss MSE Huber focal loss logits label smoothing",
      },
      {
        id: "dl-autograd-backprop",
        stepNumber: 5,
        label: "5. Autograd & Backpropagation",
        badge: "📉 Computational Graph & ∇W",
        searchQuery: "PyTorch Autograd backward dynamic computational graph gradient calculation chain rule vector Jacobian",
      },
      {
        id: "dl-optimizer-step",
        stepNumber: 6,
        label: "6. Optimizer Update Step",
        badge: "🚀 AdamW, SGD & Weight Decay",
        searchQuery: "optimizer step AdamW SGD with momentum decoupled weight decay gradient descent parameter update",
      },
      {
        id: "dl-lr-scheduling",
        stepNumber: 7,
        label: "7. Learning Rate Warmup & Cosine",
        badge: "📈 Warmup & Cosine Annealing",
        searchQuery: "learning rate schedule linear warmup cosine annealing cyclic learning rate OneCycleLR",
      },
      {
        id: "dl-regularization-norm",
        stepNumber: 8,
        label: "8. Regularization & Normalization",
        badge: "🛡️ LayerNorm, BatchNorm & Dropout",
        searchQuery: "LayerNorm Batch Normalization Dropout inverted dropout weight decay gradient clipping",
      },
      {
        id: "dl-checkpoint-eval",
        stepNumber: 9,
        label: "9. Model Checkpoint & Validation",
        badge: "💾 State Dict & Loss Curves",
        searchQuery: "model checkpoint state dict save load validation loop loss curves early stopping safetensors",
      },
    ],
  },
];

export const NLPLLMS_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-nlp-pipeline",
    pillarId: "nlp-pipeline-pillar",
    title: "LLM Inference & RAG Pipeline",
    category: "nlpllms",
    badge: "9 Sequential Stages",
    color: "#10a37f",
    isPipeline: true,
    items: [
      {
        id: "nlp-prompt-template",
        stepNumber: 1,
        label: "1. Prompt Template & System Framing",
        badge: "💬 System & Few-Shot Context",
        searchQuery: "prompt template system prompt few shot in context learning ChatML schema",
      },
      {
        id: "nlp-tokenizer-encoding",
        stepNumber: 2,
        label: "2. Tokenizer Encoding & Special Tokens",
        badge: "🔤 BOS, EOS & Attention Mask",
        searchQuery: "tokenizer encode input_ids attention_mask BOS EOS padding tokens tiktoken",
      },
      {
        id: "nlp-causal-self-attention",
        stepNumber: 3,
        label: "3. Causal Masked Self-Attention",
        badge: "🔒 Autoregressive Upper-Tri Mask",
        searchQuery: "causal masked self attention upper triangular mask autoregressive next token prediction",
      },
      {
        id: "nlp-kv-caching",
        stepNumber: 4,
        label: "4. KV Cache Allocation & Update",
        badge: "⚡ O(1) Precomputed Key-Values",
        searchQuery: "KV cache key value cache generation phase prefill phase vLLM PagedAttention",
      },
      {
        id: "nlp-logits-sampling",
        stepNumber: 5,
        label: "5. Logits Projection & Temperature",
        badge: "🎲 Top-P, Top-K & Min-P Sampling",
        searchQuery: "logits temperature sampling top_p nucleus sampling top_k min_p repetition penalty",
      },
      {
        id: "nlp-autoregressive-stream",
        stepNumber: 6,
        label: "6. Autoregressive Token Streaming",
        badge: "🌊 SSE / WebSocket Chunking",
        searchQuery: "token streaming Server Sent Events SSE text-generation stream chunking HTTP chunked",
      },
      {
        id: "nlp-rag-vector-search",
        stepNumber: 7,
        label: "7. RAG Hybrid Dense/Sparse Search",
        badge: "🔍 Vector DB & Reciprocal Rank",
        searchQuery: "Retrieval Augmented Generation RAG hybrid search BM25 vector database cosine similarity RRF",
      },
      {
        id: "nlp-lora-peft",
        stepNumber: 8,
        label: "8. Parameter-Efficient Tuning (LoRA)",
        badge: "📉 Low-Rank Adapter Matrices",
        searchQuery: "LoRA Low Rank Adaptation PEFT adapter weights rank r alpha frozen base model",
      },
      {
        id: "nlp-guardrails-eval",
        stepNumber: 9,
        label: "9. Guardrails, Evals & Alignment",
        badge: "🛡️ PII Filtering & MT-Bench",
        searchQuery: "LLM guardrails NeMo Guardrails prompt injection defense PII redaction MT-Bench LLM as a judge",
      },
    ],
  },
];

export const VISION_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-vision-pipeline",
    pillarId: "vision-pipeline-pillar",
    title: "Computer Vision & Detection Pipeline",
    category: "vision",
    badge: "9 Sequential Stages",
    color: "#ef4444",
    isPipeline: true,
    items: [
      {
        id: "vision-image-preprocessing",
        stepNumber: 1,
        label: "1. Image Ingestion & Normalization",
        badge: "🖼️ RGB 0-1 & ImageNet μ/σ",
        searchQuery: "image preprocessing normalization RGB channels ImageNet mean std standard deviation tensor",
      },
      {
        id: "vision-spatial-augmentation",
        stepNumber: 2,
        label: "2. Spatial Augmentations (Albumentations)",
        badge: "🔄 Affine, Crop & MixUp",
        searchQuery: "data augmentation Albumentations random crop horizontal flip affine transform CutMix MixUp",
      },
      {
        id: "vision-backbone-extraction",
        stepNumber: 3,
        label: "3. Feature Pyramid Network (FPN)",
        badge: "📐 Multi-Scale P3-P7 Feature Maps",
        searchQuery: "Feature Pyramid Network FPN bottom-up top-down lateral connections multi-scale features",
      },
      {
        id: "vision-anchor-box-generation",
        stepNumber: 4,
        label: "4. Anchor & Grid Cell Assignment",
        badge: "🎯 Prior Boxes & Center Coordinates",
        searchQuery: "anchor boxes prior bounding box aspect ratios grid cell assignment anchor-free center point",
      },
      {
        id: "vision-bounding-box-regression",
        stepNumber: 5,
        label: "5. Bounding Box Coordinate Regression",
        badge: "📦 (cx, cy, w, h) & CIoU Loss",
        searchQuery: "bounding box regression cx cy w h GIoU DIoU CIoU loss coordinate regression",
      },
      {
        id: "vision-class-score-prediction",
        stepNumber: 6,
        label: "6. Class Confidence & Objectness",
        badge: "🏷️ Focal Loss & Sigmoid Class Prob",
        searchQuery: "objectness score classification logits Focal Loss class imbalance foreground background",
      },
      {
        id: "vision-nms-filtering",
        stepNumber: 7,
        label: "7. Non-Maximum Suppression (NMS)",
        badge: "🧹 IoU Threshold & Duplicate Purge",
        searchQuery: "Non-Maximum Suppression NMS IoU threshold Soft-NMS duplicate bounding box pruning",
      },
      {
        id: "vision-semantic-segmentation",
        stepNumber: 8,
        label: "8. Semantic & Instance Masks",
        badge: "🎭 Pixel Mask Logits & Mask R-CNN",
        searchQuery: "semantic segmentation instance segmentation pixel mask logits RoIAlign binary cross entropy",
      },
      {
        id: "vision-tensorrt-onnx-export",
        stepNumber: 9,
        label: "9. TensorRT / ONNX Acceleration",
        badge: "🚀 FP16 Engine & 120 FPS Inference",
        searchQuery: "TensorRT ONNX export INT8 quantization CUDA execution provider high FPS inference vision",
      },
    ],
  },
];

// ==========================================
// MOBILE PLATFORM GROUPS & 9-STAGE PIPELINE
// ==========================================
export const MOBILE_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-mobile-pipeline",
    pillarId: "mobile-pipeline-pillar",
    title: "Mobile App Runtime & Delivery Pipeline (9 Stages)",
    category: "mobile",
    badge: "9 Sequential Stages",
    color: "#2563eb",
    isPipeline: true,
    items: [
      {
        id: "mobile-app-init-coldstart",
        stepNumber: 1,
        label: "1. Cold Start & Splash Screen",
        badge: "⏱️ OS Fork & Application Init",
        searchQuery: "mobile cold start splash screen application onCreate didFinishLaunchingWithOptions TTI time to interactive",
      },
      {
        id: "mobile-runtime-bridging",
        stepNumber: 2,
        label: "2. Native Bridge & Architecture",
        badge: "🌉 JNI & Objective-C/Swift Bridge",
        searchQuery: "mobile native bridge JNI Java Native Interface C++ bindings iOS Swift ObjC runtime interop",
      },
      {
        id: "mobile-declarative-ui-tree",
        stepNumber: 3,
        label: "3. Declarative UI (SwiftUI / Compose)",
        badge: "🎨 Diffing & Render Tree",
        searchQuery: "declarative UI SwiftUI Jetpack Compose state driven UI tree recomposition view diffing",
      },
      {
        id: "mobile-network-caching-layer",
        stepNumber: 4,
        label: "4. Network Interception & Cache",
        badge: "📡 OkHttp & URLSession Interceptors",
        searchQuery: "mobile network interceptors OkHttp URLSession HTTP cache disk cache etag retry policies",
      },
      {
        id: "mobile-sqlite-room-coredata",
        stepNumber: 5,
        label: "5. Local Persistence (Room / CoreData)",
        badge: "💾 SQLite WAL & ORM Transactions",
        searchQuery: "mobile local database Room Android CoreData iOS SQLite WAL mode migrations encrypted SQLite SQLCipher",
      },
      {
        id: "mobile-push-fcm-apns",
        stepNumber: 6,
        label: "6. Push Notifications (APNs & FCM)",
        badge: "🔔 Device Tokens & Payload Handling",
        searchQuery: "mobile push notifications Apple Push Notification Service APNs Firebase Cloud Messaging FCM background payload",
      },
      {
        id: "mobile-background-work-sync",
        stepNumber: 7,
        label: "7. Background Work & Schedulers",
        badge: "⚙️ WorkManager & BackgroundTasks",
        searchQuery: "mobile background jobs Android WorkManager iOS BGTaskScheduler periodic sync constraint based execution",
      },
      {
        id: "mobile-native-sensors-hardware",
        stepNumber: 8,
        label: "8. Hardware & Sensors (GPS, Camera)",
        badge: "📍 Runtime Permissions & Biometrics",
        searchQuery: "mobile device hardware sensors GPS CoreLocation LocationManager CameraX AVFoundation FaceID BiometricPrompt",
      },
      {
        id: "mobile-crash-analytics-profiling",
        stepNumber: 9,
        label: "9. Crashlytics & App Bundles",
        badge: "📊 Symbolication, ProGuard & APK/AAB",
        searchQuery: "mobile crash analytics Crashlytics Sentry dSYM ProGuard R8 bytecode shrinking Android App Bundle AAB IPA",
      },
    ],
  },
];

// ==========================================
// DATA ENGINEERING GROUPS & 9-STAGE PIPELINE
// ==========================================
export const DATA_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-data-pipeline",
    pillarId: "data-pipeline-pillar",
    title: "Data Engineering & Lakehouse Pipeline (9 Stages)",
    category: "data",
    badge: "9 Sequential Stages",
    color: "#ea580c",
    isPipeline: true,
    items: [
      {
        id: "data-source-ingestion-cdc",
        stepNumber: 1,
        label: "1. Ingestion & Change Data Capture",
        badge: "📥 Debezium, Kafka Connect & Binlog",
        searchQuery: "data ingestion Change Data Capture CDC Debezium MySQL binlog Postgres WAL Kafka Connect",
      },
      {
        id: "data-streaming-buffer-kafka",
        stepNumber: 2,
        label: "2. Streaming Buffer & Partitions",
        badge: "📨 Kafka Topics & Consumer Groups",
        searchQuery: "Apache Kafka topics partitions consumer groups log retention offset management high throughput",
      },
      {
        id: "data-schema-validation-registry",
        stepNumber: 3,
        label: "3. Schema Registry & Evolution",
        badge: "📜 Confluent Avro & Protobuf",
        searchQuery: "Schema Registry Confluent Avro Protobuf backward forward full compatibility schema evolution",
      },
      {
        id: "data-bronze-raw-landing",
        stepNumber: 4,
        label: "4. Bronze Layer: Raw Landing",
        badge: "🥉 Append-Only Immutable History",
        searchQuery: "medallion architecture Bronze layer raw data lake append only immutable audit trail cloud storage",
      },
      {
        id: "data-silver-cleaning-dedup",
        stepNumber: 5,
        label: "5. Silver Layer: Clean & De-duplicate",
        badge: "🥈 PySpark Cleansing & Filtering",
        searchQuery: "Silver layer data cleansing deduplication PySpark null handling data enrichment business domain modeling",
      },
      {
        id: "data-gold-aggregated-marts",
        stepNumber: 6,
        label: "6. Gold Layer: Aggregated Marts",
        badge: "🥇 Dimensional Star Schema & KPI Marts",
        searchQuery: "Gold layer dimensional modeling aggregate business KPIs Kimball star schema reporting marts",
      },
      {
        id: "data-parquet-columnar-storage",
        stepNumber: 7,
        label: "7. Columnar Storage (Parquet & Delta)",
        badge: "📦 Snappy Compression & Predicate Pushdown",
        searchQuery: "Apache Parquet columnar storage Snappy compression dictionary encoding predicate pushdown min max stats",
      },
      {
        id: "data-orchestration-dag-airflow",
        stepNumber: 8,
        label: "8. DAG Orchestration (Airflow / dbt)",
        badge: "⏰ Task Scheduling, Retries & Backfills",
        searchQuery: "Apache Airflow DAG scheduling task dependencies backfills dbt transformations data pipeline orchestration",
      },
      {
        id: "data-warehouse-bi-serving",
        stepNumber: 9,
        label: "9. Analytical Serving & Warehouses",
        badge: "📊 Snowflake, BigQuery & Trino Queries",
        searchQuery: "data warehouse Snowflake BigQuery Trino Presto analytical SQL query serving BI dashboards",
      },
    ],
  },
];

export const GAMEDEV_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-gamedev-pipeline",
    pillarId: "gamedev-pipeline-pillar",
    title: "9-Stage Real-Time Game Rendering & Physics Pipeline",
    category: "gamedev",
    badge: "🎮 Real-Time 60/120 FPS Loop",
    color: "#c026d3",
    isPipeline: true,
    items: [
      {
        id: "gamedev-input-polling-events",
        stepNumber: 1,
        label: "1. Raw Input Polling & Action Buffer",
        badge: "🕹️ Sub-Millisecond Input Sampling",
        searchQuery: "game input polling hardware interrupts event queue action mapping deadzone input buffering",
      },
      {
        id: "gamedev-fixed-timestep-accumulator",
        stepNumber: 2,
        label: "2. Fixed Timestep Accumulator",
        badge: "⏱️ Deterministic Tick & Delta Clamping",
        searchQuery: "fixed timestep delta time accumulator spiral of death clamping Glenn Fiedler Fix Your Timestep",
      },
      {
        id: "gamedev-physics-collision-resolution",
        stepNumber: 3,
        label: "3. Physics & Impulse Resolution",
        badge: "💥 Verlet Integration & Contact Manifolds",
        searchQuery: "rigid body physics impulse resolution friction restitution contact manifold collision solver",
      },
      {
        id: "gamedev-gameplay-ai-animation",
        stepNumber: 4,
        label: "4. ECS Gameplay & Skeletal Blending",
        badge: "🤖 Behavior Trees & Inverse Kinematics",
        searchQuery: "entity component system ECS behavior tree state machine skeletal animation blend trees forward inverse kinematics",
      },
      {
        id: "gamedev-spatial-culling-frustum",
        stepNumber: 5,
        label: "5. Spatial Partition & Frustum Culling",
        badge: "📐 Octree / BVH & Occlusion Query",
        searchQuery: "view frustum culling BVH bounding volume hierarchy octree spatial hashing occlusion culling draw call batching",
      },
      {
        id: "gamedev-vertex-transformation-projection",
        stepNumber: 6,
        label: "6. Vertex Shading & MVP Projection",
        badge: "🧮 Model-View-Projection Homogeneous Math",
        searchQuery: "vertex shader model view projection MVP matrix homogeneous coordinates perspective divide clip space",
      },
      {
        id: "gamedev-rasterization-fragment-shading",
        stepNumber: 7,
        label: "7. Rasterization & PBR Material Shading",
        badge: "🎨 Barycentric Interpolation & Cook-Torrance BRDF",
        searchQuery: "hardware rasterization triangle barycentric coordinates fragment pixel shader PBR Cook Torrance BRDF albedo roughness metallic",
      },
      {
        id: "gamedev-post-processing-tonemapping",
        stepNumber: 8,
        label: "8. Post-Processing & HDR Tone Mapping",
        badge: "✨ Bloom, FXAA & ACES Filmic Curve",
        searchQuery: "post processing render targets bloom downsample Gaussian blur ACES filmic tone mapping color grading LUT anti aliasing",
      },
      {
        id: "gamedev-double-buffer-swapchain",
        stepNumber: 9,
        label: "9. Swapchain Presentation & V-Sync",
        badge: "🖥️ Double / Triple Buffer Frame Flip",
        searchQuery: "GPU swapchain double buffer triple buffering front back buffer V Sync vertical synchronization screen tearing frame pacing",
      },
    ],
  },
];

export const IOT_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-iot-pipeline",
    pillarId: "iot-pipeline-pillar",
    title: "9-Stage Embedded Firmware & IoT Telemetry Pipeline",
    category: "iot",
    badge: "⚡ Bare-Metal & Cloud Ingestion",
    color: "#059669",
    isPipeline: true,
    items: [
      {
        id: "iot-analog-sensor-sampling",
        stepNumber: 1,
        label: "1. Sensor ADC Sampling & Conditioning",
        badge: "📡 12-Bit SAR ADC & Low-Pass Filter",
        searchQuery: "embedded ADC sampling low pass filter anti aliasing oversampling sensor conditioning calibration",
      },
      {
        id: "iot-dma-memory-transfer",
        stepNumber: 2,
        label: "2. DMA Zero-CPU Buffer Transfer",
        badge: "🔄 Circular Ring Buffers & Half-Transfer ISR",
        searchQuery: "Direct Memory Access DMA circular buffer peripheral to memory transfer zero CPU ARM Cortex",
      },
      {
        id: "iot-rtos-task-scheduling",
        stepNumber: 3,
        label: "3. RTOS Priority Preemption & Flags",
        badge: "⏱️ FreeRTOS Event Groups & Priority Inversion",
        searchQuery: "FreeRTOS task preemption event groups binary semaphore priority inheritance context switch",
      },
      {
        id: "iot-packet-serialization-cbor",
        stepNumber: 4,
        label: "4. Binary Serialization (CBOR / Protobuf)",
        badge: "📦 Bit-Packed Nanopb & TinyCBOR",
        searchQuery: "CBOR concise binary object representation Nanopb lightweight serialization constrained IoT payload",
      },
      {
        id: "iot-secure-boot-crypto",
        stepNumber: 5,
        label: "5. Hardware Crypto & mTLS Handshake",
        badge: "🔒 ATECC608 Hardware Secure Element & TLS 1.3",
        searchQuery: "embedded TLS mTLS hardware crypto accelerator ECDSA P-256 secure element ATECC608",
      },
      {
        id: "iot-radio-transmission-mesh",
        stepNumber: 6,
        label: "6. Radio RF Link (BLE / LoRa / Zigbee)",
        badge: "📶 Sub-GHz Long-Range & BLE Mesh",
        searchQuery: "LoRaWAN long range modulation BLE mesh Zigbee IEEE 802.15.4 spread spectrum RF link",
      },
      {
        id: "iot-edge-gateway-aggregation",
        stepNumber: 7,
        label: "7. Edge Gateway Protocol Translation",
        badge: "🌐 Local MQTT Broker & Offline Caching",
        searchQuery: "IoT edge gateway protocol translation Modbus to MQTT local SQLite offline buffer store and forward",
      },
      {
        id: "iot-cloud-mqtt-broker",
        stepNumber: 8,
        label: "8. Cloud MQTT Ingestion & Time-Series",
        badge: "☁️ EMQX / AWS IoT Core QoS 1 & TimescaleDB",
        searchQuery: "AWS IoT Core EMQX MQTT broker QoS 1 time series database TimescaleDB telemetry ingestion",
      },
      {
        id: "iot-ota-update-fleet",
        stepNumber: 9,
        label: "9. Dual-Bank A/B OTA & Rollback",
        badge: "🔄 Cryptographic Verify & Watchdog Rollback",
        searchQuery: "embedded OTA over the air update dual bank flash bootloader rollback watchdog timer delta updates",
      },
    ],
  },
];

// Blockchain & Cryptography: 9-Stage Web3 & Blockchain Transaction Lifecycle
export const BLOCKCHAIN_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-blockchain-tx-pipeline",
    pillarId: "blockchain-pipeline-pillar",
    title: "9-Stage Web3 Transaction Lifecycle",
    category: "blockchain",
    badge: "9 Sequential Stages",
    color: "#d97706",
    isPipeline: true,
    items: [
      {
        id: "bc-tx-signing-nonce",
        stepNumber: 1,
        label: "1. Transaction Signing & Nonce",
        badge: "🔑 secp256k1 ECDSA & EIP-155 Replay Protection",
        searchQuery: "Ethereum transaction signing ECDSA secp256k1 private key account nonce EIP-155",
      },
      {
        id: "bc-mempool-gossip",
        stepNumber: 2,
        label: "2. Mempool Broadcast & P2P Gossip",
        badge: "📡 devp2p GossipSub & Gas Priority Bidding",
        searchQuery: "Ethereum devp2p mempool transaction gossip broadcast gas tip priority EIP-1559",
      },
      {
        id: "bc-block-builder-assembly",
        stepNumber: 3,
        label: "3. Validator / Builder Block Assembly",
        badge: "🏗️ MEV-Boost & Flashbots Bundle Ordering",
        searchQuery: "Proposer Builder Separation PBS MEV-Boost block assembly Flashbots bundle ordering",
      },
      {
        id: "bc-evm-execution-gas",
        stepNumber: 4,
        label: "4. EVM Execution & Gas Metering",
        badge: "⚡ 256-bit Stack Machine & Opcode Gas Limits",
        searchQuery: "Ethereum Virtual Machine EVM bytecode execution stack gas metering SSTORE SLOAD",
      },
      {
        id: "bc-state-trie-update",
        stepNumber: 5,
        label: "5. State Transition & Merkle Root Update",
        badge: "🌳 Modified Merkle Patricia Trie Root Hashes",
        searchQuery: "Ethereum state transition modified Merkle Patricia trie storage root receipt root",
      },
      {
        id: "bc-pos-attestation-consensus",
        stepNumber: 6,
        label: "6. Proof-of-Stake Consensus & Attestation",
        badge: "🛡️ Gasper Beacon Chain 2/3 Supermajority Vote",
        searchQuery: "Ethereum Proof of Stake Casper FFG LMD GHOST Gasper attestation supermajority",
      },
      {
        id: "bc-block-propagation-reorg",
        stepNumber: 7,
        label: "7. Block Propagation & Reorg Resolution",
        badge: "🌐 Peer-to-Peer Relay & Canonical Fork Choice",
        searchQuery: "Ethereum block propagation fork choice rule LMD GHOST chain reorganization depth",
      },
      {
        id: "bc-finality-event-emission",
        stepNumber: 8,
        label: "8. Finality Settlement & Event Emission",
        badge: "📜 Irreversible Checkpoint & Bloom Filter Logs",
        searchQuery: "Ethereum Casper finality 2 epochs settlement event emission Solidity log bloom filters",
      },
      {
        id: "bc-l2-rollup-zk-proving",
        stepNumber: 9,
        label: "9. L2 Rollup Batching & ZK-SNARK Proving",
        badge: "⚡ Optimistic Calldata & ZK Validity Proofs",
        searchQuery: "Layer 2 rollups Optimistic fraud proof ZK-SNARK validity proofs EIP-4844 proto-danksharding blobspace",
      },
    ],
  },
];

// React: 9-Stage React Fiber Render & Commit Pipeline
export const REACT_GROUP_CARDS: GroupCardData[] = [
  {
    id: "group-react-fiber-pipeline",
    pillarId: "react-pipeline-pillar",
    title: "9-Stage React Fiber Render & Commit Pipeline",
    category: "react",
    badge: "9 Sequential Stages",
    color: "#22d3ee",
    isPipeline: true,
    items: [
      {
        id: "react-trigger-dispatch",
        stepNumber: 1,
        label: "1. State Trigger & Update Dispatch",
        badge: "⚡ setState / useReducer Action Enqueue",
        searchQuery: "React dispatchAction update queue lane priority expiration time",
      },
      {
        id: "react-scheduler-lane-priority",
        stepNumber: 2,
        label: "2. Scheduler & Lane Priority",
        badge: "⏱️ Sync, InputContinuous & Default Lanes",
        searchQuery: "React Scheduler lane priority requestUpdateLane message channel yieldToHost",
      },
      {
        id: "react-render-phase-beginwork",
        stepNumber: 3,
        label: "3. Concurrent Render (beginWork)",
        badge: "🌿 Depth-First Fiber Tree Traversal",
        searchQuery: "React beginWork render phase construct workInProgress fiber tree",
      },
      {
        id: "react-diffing-subtrees",
        stepNumber: 4,
        label: "4. VDOM Diffing & Subtree Reconcile",
        badge: "🔍 Alternate Fiber Comparison & Placement",
        searchQuery: "React reconcileChildren reconcileSingleElement ChildReconciler alternate",
      },
      {
        id: "react-complete-work-bubbles",
        stepNumber: 5,
        label: "5. Complete Work & Bubble Effect Flags",
        badge: "🏗️ completeWork & SubtreeFlags Aggregation",
        searchQuery: "React completeWork createInstance appendAllChildren subtreeFlags",
      },
      {
        id: "react-commit-before-mutation",
        stepNumber: 6,
        label: "6. Commit Phase: Before Mutation",
        badge: "👁️ getSnapshotBeforeUpdate & Focus State",
        searchQuery: "React commitBeforeMutationEffects getSnapshotBeforeUpdate flushPassiveEffects",
      },
      {
        id: "react-commit-mutation-dom",
        stepNumber: 7,
        label: "7. Commit Phase: Host DOM Mutation",
        badge: "🔨 Insert, Update & Unmount Host Nodes",
        searchQuery: "React commitMutationEffects appendChild replaceChild removeChild host DOM",
      },
      {
        id: "react-commit-layout-effects",
        stepNumber: 8,
        label: "8. Commit Phase: Layout Effects",
        badge: "📐 useLayoutEffect Synchronous Execution",
        searchQuery: "React commitLayoutEffects useLayoutEffect componentDidMount synchronous DOM measure",
      },
      {
        id: "react-passive-effects-flush",
        stepNumber: 9,
        label: "9. Passive Effects Flush (useEffect)",
        badge: "🌊 useEffect Asynchronous Post-Paint Flush",
        searchQuery: "React flushPassiveEffects useEffect post paint asynchronous execution cleanup",
      },
    ],
  },
];

export function getGroupCardsForCategory(category: "all" | "v8" | "scope" | "closure" | "async" | "node" | "backend" | "realtime" | "queues" | "scaling" | "platform" | "rendering" | "security" | "state" | "perf" | "aimath" | "mlcore" | "deeplearning" | "nlpllms" | "vision" | "mobile" | "data" | "gamedev" | "iot" | "blockchain" | "react" | "oop" | "dsa" | "bigo"): GroupCardData[] {
  if (category === "v8") return V8_GROUP_CARDS;
  if (category === "scope") return SCOPE_GROUP_CARDS;
  if (category === "closure") return CLOSURE_GROUP_CARDS;
  if (category === "async") return ASYNC_GROUP_CARDS;
  if (category === "node") return NODE_GROUP_CARDS;
  if (category === "backend") return BACKEND_GROUP_CARDS;
  if (category === "realtime") return REALTIME_GROUP_CARDS;
  if (category === "queues") return QUEUES_GROUP_CARDS;
  if (category === "scaling") return SCALING_GROUP_CARDS;
  if (category === "platform") return PLATFORM_GROUP_CARDS;
  if (category === "rendering") return RENDERING_GROUP_CARDS;
  if (category === "security") return SECURITY_GROUP_CARDS;
  if (category === "state") return STATE_GROUP_CARDS;
  if (category === "perf") return PERF_GROUP_CARDS;
  if (category === "aimath") return AIMATH_GROUP_CARDS;
  if (category === "mlcore") return MLCORE_GROUP_CARDS;
  if (category === "deeplearning") return DEEPLEARNING_GROUP_CARDS;
  if (category === "nlpllms") return NLPLLMS_GROUP_CARDS;
  if (category === "vision") return VISION_GROUP_CARDS;
  if (category === "mobile") return MOBILE_GROUP_CARDS;
  if (category === "data") return DATA_GROUP_CARDS;
  if (category === "gamedev") return GAMEDEV_GROUP_CARDS;
  if (category === "iot") return IOT_GROUP_CARDS;
  if (category === "blockchain") return BLOCKCHAIN_GROUP_CARDS;
  if (category === "react") return REACT_GROUP_CARDS;
  if (category === "oop") return OOP_GROUP_CARDS;
  if (category === "dsa") return DSA_GROUP_CARDS;
  if (category === "bigo") return BIGO_GROUP_CARDS;
  return [...V8_GROUP_CARDS, ...SCOPE_GROUP_CARDS, ...CLOSURE_GROUP_CARDS, ...ASYNC_GROUP_CARDS, ...NODE_GROUP_CARDS, ...BACKEND_GROUP_CARDS, ...REALTIME_GROUP_CARDS, ...QUEUES_GROUP_CARDS, ...SCALING_GROUP_CARDS, ...PLATFORM_GROUP_CARDS, ...RENDERING_GROUP_CARDS, ...SECURITY_GROUP_CARDS, ...STATE_GROUP_CARDS, ...PERF_GROUP_CARDS, ...AIMATH_GROUP_CARDS, ...MLCORE_GROUP_CARDS, ...DEEPLEARNING_GROUP_CARDS, ...NLPLLMS_GROUP_CARDS, ...VISION_GROUP_CARDS, ...MOBILE_GROUP_CARDS, ...DATA_GROUP_CARDS, ...GAMEDEV_GROUP_CARDS, ...IOT_GROUP_CARDS, ...BLOCKCHAIN_GROUP_CARDS, ...REACT_GROUP_CARDS, ...OOP_GROUP_CARDS, ...DSA_GROUP_CARDS, ...BIGO_GROUP_CARDS];
}
