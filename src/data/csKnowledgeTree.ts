import { ConceptCategory } from "./concepts";

export interface CSTreeTopic {
  id: string;
  name: string;
  categoryId?: ConceptCategory;
  isAvailable: boolean;
  isStarred?: boolean;
  badge?: string;
  description?: string;
  color?: string;
}

export interface CSTreeSubcategory {
  id: string;
  name: string;
  badge?: string;
  topics: CSTreeTopic[];
}

export interface CSTreeLayer {
  id: string;
  layerNumber: number | string;
  name: string;
  badge: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  subcategories: CSTreeSubcategory[];
}

export const CS_KNOWLEDGE_TREE: CSTreeLayer[] = [
  // =========================================================
  // LAYER 1: THEORY
  // =========================================================
  {
    id: "layer-1-theory",
    layerNumber: 1,
    name: "LAYER 1: THEORY",
    badge: "Foundations & Math",
    description: "Mathematical foundations, computational complexity, and fundamental algorithms",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    icon: "Binary",
    subcategories: [
      {
        id: "theory-complexity",
        name: "Complexity",
        badge: "Active Module",
        topics: [
          {
            id: "topic-big-o",
            name: "Big O ★",
            categoryId: "bigo",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "O(1), O(log n), O(n), O(n²) up to O(n!) with live analogies",
            color: "#f59e0b",
          },
          {
            id: "topic-time-space",
            name: "Time vs Space Complexity",
            isAvailable: false,
            badge: "Roadmap",
            description: "Memory trade-offs, auxiliary storage, and runtime bottlenecks",
          },
          {
            id: "topic-p-np",
            name: "P vs NP (Intro)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Deterministic polynomial time vs verification and NP-completeness",
          },
        ],
      },
      {
        id: "theory-algorithms",
        name: "Algorithms & DSA",
        badge: "Active Module",
        topics: [
          {
            id: "topic-dsa",
            name: "Algorithms (DSA ★)",
            categoryId: "dsa",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Data structures with real-world analogies (Pancake stacks, Coffee lines)",
            color: "#3b82f6",
          },
          {
            id: "topic-sorting-searching",
            name: "Sorting & Searching",
            isAvailable: false,
            badge: "Roadmap",
            description: "Binary search, QuickSort, MergeSort, and TimSort",
          },
          {
            id: "topic-recursion-backtrack",
            name: "Recursion & Backtracking",
            isAvailable: false,
            badge: "Roadmap",
            description: "Call tree exploration, state restoration, and pruning",
          },
          {
            id: "topic-two-pointers",
            name: "Two Pointers & Sliding Window",
            isAvailable: false,
            badge: "Roadmap",
            description: "Subarray optimization, opposite ends, and running windows",
          },
          {
            id: "topic-greedy",
            name: "Greedy Algorithms",
            isAvailable: false,
            badge: "Roadmap",
            description: "Locally optimal choices, interval scheduling, and Huffman coding",
          },
          {
            id: "topic-dp",
            name: "Dynamic Programming",
            isAvailable: false,
            badge: "Roadmap",
            description: "Memoization, tabulation, optimal substructure, and overlapping subproblems",
          },
          {
            id: "topic-graph-algorithms",
            name: "Graph Algorithms (BFS, DFS, Dijkstra)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Breadth-first search, depth-first search, shortest path, and topological sort",
          },
        ],
      },
      {
        id: "theory-data-structures",
        name: "Data Structures",
        topics: [
          {
            id: "topic-arrays-strings",
            name: "Arrays & Strings",
            isAvailable: false,
            badge: "Roadmap",
            description: "Contiguous memory, indexing, string immutability, and buffer slices",
          },
          {
            id: "topic-lists-stacks-queues",
            name: "Linked Lists, Stacks, Queues",
            isAvailable: false,
            badge: "Roadmap",
            description: "Node pointers, LIFO call stacks, and FIFO event queues",
          },
          {
            id: "topic-hash-tables",
            name: "Hash Tables / Maps / Sets",
            isAvailable: false,
            badge: "Roadmap",
            description: "Hash functions, collision resolution, buckets, and load factor",
          },
          {
            id: "topic-trees",
            name: "Trees (BST, AVL, Tries)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Binary search trees, self-balancing rotations, and prefix tries",
          },
          {
            id: "topic-heaps",
            name: "Heaps & Priority Queues",
            isAvailable: false,
            badge: "Roadmap",
            description: "Min/max heap invariants, sift-up/down, and task prioritization",
          },
          {
            id: "topic-graphs-ds",
            name: "Graphs (Adjacency List & Matrix)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Directed, undirected, weighted edges, and connectivity",
          },
        ],
      },
      {
        id: "theory-math",
        name: "Mathematics for Computing",
        topics: [
          {
            id: "topic-discrete-math",
            name: "Discrete Math (Sets, Graphs, Combinatorics)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Set theory, permutations, graph theory, and recurrence relations",
          },
          {
            id: "topic-logic",
            name: "Logic & Boolean Algebra",
            isAvailable: false,
            badge: "Roadmap",
            description: "Truth tables, propositional logic, bitwise gates, and De Morgan's laws",
          },
          {
            id: "topic-linear-algebra",
            name: "Linear Algebra (Vectors, Matrices)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Dot products, matrix transformations, eigenvalues, and graphics/ML math",
          },
          {
            id: "topic-probability",
            name: "Probability & Statistics",
            isAvailable: false,
            badge: "Roadmap",
            description: "Random variables, distributions, Bayes theorem, and variance",
          },
          {
            id: "topic-calculus",
            name: "Calculus Basics",
            isAvailable: false,
            badge: "Roadmap",
            description: "Derivatives, gradients, chain rule, and optimization surfaces",
          },
        ],
      },
    ],
  },

  // =========================================================
  // LAYER 2: PROGRAMMING
  // =========================================================
  {
    id: "layer-2-programming",
    layerNumber: 2,
    name: "LAYER 2: PROGRAMMING",
    badge: "Core Language & Paradigms",
    description: "Language execution mechanics, execution scope, closures, and object-oriented paradigms",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
    icon: "Code",
    subcategories: [
      {
        id: "prog-core-concepts",
        name: "Core Concepts",
        badge: "Active Module",
        topics: [
          {
            id: "topic-scope",
            name: "Scope ★",
            categoryId: "scope",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Lexical Scope, Scope Chain Current → Outer → Global, and Environment Records",
            color: "#a855f7",
          },
          {
            id: "topic-closures",
            name: "Closures ★",
            categoryId: "closure",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Access to Outer Lexical Env, 🎒 The Backpack Story, and Persistent Memory",
            color: "#e879f9",
          },
          {
            id: "topic-hoisting-this",
            name: "Hoisting, this, Call Stack",
            isAvailable: false,
            badge: "Roadmap",
            description: "Declaration hoisting, dynamic this bindings, and call frames",
          },
          {
            id: "topic-recursion-core",
            name: "Recursion Mechanics",
            isAvailable: false,
            badge: "Roadmap",
            description: "Base case guarantees, stack unwind, and tail call optimization",
          },
          {
            id: "topic-error-handling",
            name: "Error Handling",
            isAvailable: false,
            badge: "Roadmap",
            description: "try/catch/finally, custom Error subclasses, and unhandled rejections",
          },
          {
            id: "topic-async-programming",
            name: "Async (Callbacks, Promises, Async/Await) ★",
            categoryId: "async",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Callbacks, Promises, Microtask VIP queue, and Async/Await concurrency",
            color: "#06b6d4",
          },
        ],
      },
      {
        id: "prog-paradigms",
        name: "Paradigms",
        badge: "Active Module",
        topics: [
          {
            id: "topic-oop",
            name: "OOP: 4 Pillars ★",
            categoryId: "oop",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Encapsulation (Piggy Bank), Inheritance (Robot), Polymorphism & Abstraction",
            color: "#ec4899",
          },
          {
            id: "topic-fp",
            name: "Functional Programming",
            isAvailable: false,
            badge: "Roadmap",
            description: "Pure functions, immutability, currying, higher-order functions, and composition",
          },
          {
            id: "topic-procedural-declarative",
            name: "Procedural & Declarative",
            isAvailable: false,
            badge: "Roadmap",
            description: "Imperative control flow vs declarative expression pipelines",
          },
        ],
      },
      {
        id: "prog-memory",
        name: "Memory Management",
        topics: [
          {
            id: "topic-stack-heap",
            name: "Stack vs Heap",
            isAvailable: false,
            badge: "Roadmap",
            description: "Execution stack frame pointers vs dynamic object allocations in the heap",
          },
          {
            id: "topic-pointers-references",
            name: "Pointers & References",
            isAvailable: false,
            badge: "Roadmap",
            description: "Pass-by-value vs pass-by-reference and pointer dereferencing",
          },
          {
            id: "topic-gc-paradigms",
            name: "Garbage Collection",
            isAvailable: false,
            badge: "Roadmap",
            description: "Generational GC, mark-and-sweep, scavenger, and reference counting",
          },
        ],
      },
      {
        id: "prog-basics",
        name: "Basics & Fundamentals",
        topics: [
          {
            id: "topic-variables-types",
            name: "Variables, Data Types, Operators",
            isAvailable: false,
            badge: "Roadmap",
            description: "Primitives, reference objects, type coercion, and bitwise operators",
          },
          {
            id: "topic-conditionals-loops",
            name: "Conditionals & Loops",
            isAvailable: false,
            badge: "Roadmap",
            description: "if/else, switch branching, for-in, for-of, and loop invariants",
          },
          {
            id: "topic-functions",
            name: "Functions & Closures",
            isAvailable: false,
            badge: "Roadmap",
            description: "Function signatures, closures, default parameters, and rest args",
          },
        ],
      },
      {
        id: "prog-languages",
        name: "Languages",
        topics: [
          {
            id: "topic-js-ts",
            name: "JavaScript / TypeScript",
            isAvailable: false,
            badge: "Roadmap",
            description: "Dynamic scripting, prototypal inheritance, and strict static typing",
          },
          {
            id: "topic-python",
            name: "Python",
            isAvailable: false,
            badge: "Roadmap",
            description: "Interpreted simplicity, dynamic typing, and rich data/AI ecosystem",
          },
          {
            id: "topic-java-kotlin",
            name: "Java / Kotlin",
            isAvailable: false,
            badge: "Roadmap",
            description: "JVM class-based OOP, strong typing, and enterprise ergonomics",
          },
          {
            id: "topic-swift",
            name: "Swift",
            isAvailable: false,
            badge: "Roadmap",
            description: "Protocol-oriented programming, ARC memory, and Apple native ecosystem",
          },
          {
            id: "topic-c-cpp",
            name: "C / C++",
            isAvailable: false,
            badge: "Roadmap",
            description: "Manual memory allocation, pointers, zero-cost abstractions, and hardware performance",
          },
          {
            id: "topic-go-rust",
            name: "Go / Rust",
            isAvailable: false,
            badge: "Roadmap",
            description: "Goroutine concurrency and Rust borrow checker memory safety without GC",
          },
        ],
      },
    ],
  },

  // =========================================================
  // LAYER 3: SYSTEMS
  // =========================================================
  {
    id: "layer-3-systems",
    layerNumber: 3,
    name: "LAYER 3: SYSTEMS",
    badge: "Hardware & Runtimes",
    description: "Computer architecture, operating systems, compiler pipelines, and engine runtimes",
    color: "#0284c7",
    gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    icon: "Cpu",
    subcategories: [
      {
        id: "sys-runtimes",
        name: "Language Runtimes",
        badge: "Active Module",
        topics: [
          {
            id: "topic-v8",
            name: "V8 Engine ★",
            categoryId: "v8",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Parser, AST, Bytecode, Ignition, Sparkplug, Maglev, TurboFan, Heap & GC",
            color: "#38bdf8",
          },
          {
            id: "topic-compilers-interpreters",
            name: "Compilers vs Interpreters",
            isAvailable: false,
            badge: "Roadmap",
            description: "Ahead-of-time (AOT) machine code generation vs line-by-line interpretation",
          },
          {
            id: "topic-jit",
            name: "JIT Compilation",
            isAvailable: false,
            badge: "Roadmap",
            description: "Hot code profiling, baseline compilation, speculative optimization, and deopt bailouts",
          },
          {
            id: "topic-event-loop-runtime",
            name: "Event Loop Architecture",
            isAvailable: false,
            badge: "Roadmap",
            description: "Macrotask queues, microtask drain boundaries, and non-blocking scheduling",
          },
          {
            id: "topic-bytecode-vms",
            name: "Bytecode & VMs (JVM)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Virtual registers, stack-based bytecode evaluation, and bytecode interpreters",
          },
        ],
      },
      {
        id: "sys-os",
        name: "Operating Systems",
        topics: [
          {
            id: "topic-processes-threads",
            name: "Processes & Threads",
            isAvailable: false,
            badge: "Roadmap",
            description: "Address spaces, IPC, context switches, thread pools, and multithreading",
          },
          {
            id: "topic-concurrency-deadlocks",
            name: "Concurrency & Deadlocks",
            isAvailable: false,
            badge: "Roadmap",
            description: "Mutexes, semaphores, race conditions, atomic operations, and deadlock prevention",
          },
          {
            id: "topic-scheduling",
            name: "CPU Scheduling",
            isAvailable: false,
            badge: "Roadmap",
            description: "Round-robin, multi-level feedback queues, preemption, and priority inversion",
          },
          {
            id: "topic-os-memory",
            name: "OS Memory Management",
            isAvailable: false,
            badge: "Roadmap",
            description: "Virtual memory, page tables, page faults, swapping, and TLB caches",
          },
          {
            id: "topic-file-systems",
            name: "File Systems",
            isAvailable: false,
            badge: "Roadmap",
            description: "Inodes, directory trees, journaled file systems, and disk block buffering",
          },
        ],
      },
      {
        id: "sys-arch",
        name: "Computer Architecture",
        topics: [
          {
            id: "topic-cpu-registers-cache",
            name: "CPU, Registers, Cache (L1/L2/L3)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Instruction cycles, ALU, program counter, and cache line hit rates",
          },
          {
            id: "topic-ram-storage",
            name: "RAM & Storage Hierarchy",
            isAvailable: false,
            badge: "Roadmap",
            description: "Volatile DRAM vs non-volatile SSD/NVMe read/write latency spectrum",
          },
          {
            id: "topic-binary-bits",
            name: "Binary, Bits & Bytes",
            isAvailable: false,
            badge: "Roadmap",
            description: "Two's complement, IEEE 754 floating points, and endianness",
          },
        ],
      },
      {
        id: "sys-linux",
        name: "Linux & Shell",
        topics: [
          {
            id: "topic-terminal-commands",
            name: "Terminal Commands & Pipelines",
            isAvailable: false,
            badge: "Roadmap",
            description: "grep, sed, awk, pipes, redirection, process monitoring (ps, top), and signals",
          },
          {
            id: "topic-permissions-scripting",
            name: "Permissions & Shell Scripting",
            isAvailable: false,
            badge: "Roadmap",
            description: "chmod/chown octal permissions, environment variables, and Bash automation",
          },
        ],
      },
    ],
  },

  // =========================================================
  // LAYER 4: ENGINEERING BASE
  // =========================================================
  {
    id: "layer-4-engineering",
    layerNumber: 4,
    name: "LAYER 4: ENGINEERING BASE",
    badge: "Protocols & Storage",
    description: "Networking protocols, databases, system architecture patterns, and version control",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    icon: "Network",
    subcategories: [
      {
        id: "eng-networking",
        name: "Networking",
        topics: [
          {
            id: "topic-osi-tcp-ip",
            name: "OSI & TCP/IP Models",
            isAvailable: false,
            badge: "Roadmap",
            description: "7-layer abstraction: Physical, Data Link, Network, Transport, and Application",
          },
          {
            id: "topic-ip-dns-ports",
            name: "IP, DNS, Ports",
            isAvailable: false,
            badge: "Roadmap",
            description: "IPv4/IPv6 addressing, recursive DNS resolution, and TCP/UDP socket ports",
          },
          {
            id: "topic-tcp-vs-udp",
            name: "TCP vs UDP",
            isAvailable: false,
            badge: "Roadmap",
            description: "3-way handshake, reliable byte streams vs low-latency datagrams",
          },
          {
            id: "topic-http-https-tls",
            name: "HTTP / HTTPS, TLS",
            isAvailable: false,
            badge: "Roadmap",
            description: "HTTP/1.1 vs HTTP/2 multiplexing, HTTP/3 QUIC, and TLS certificate handshakes",
          },
          {
            id: "topic-rest-graphql-grpc",
            name: "REST, GraphQL, gRPC",
            isAvailable: false,
            badge: "Roadmap",
            description: "Stateless HTTP verbs, GraphQL schema queries, and protobuf RPC streams",
          },
          {
            id: "topic-websockets",
            name: "WebSockets",
            isAvailable: false,
            badge: "Roadmap",
            description: "Persistent full-duplex bidirectional TCP communication channels",
          },
        ],
      },
      {
        id: "eng-databases",
        name: "Databases & Storage",
        topics: [
          {
            id: "topic-sql-indexing",
            name: "SQL (Joins, Indexing, Normalization)",
            isAvailable: false,
            badge: "Roadmap",
            description: "B-Tree indexes, query execution plans, foreign keys, and normal forms",
          },
          {
            id: "topic-acid-transactions",
            name: "ACID & Transactions",
            isAvailable: false,
            badge: "Roadmap",
            description: "Atomicity, Consistency, Isolation levels, and Durability write-ahead logs",
          },
          {
            id: "topic-nosql",
            name: "NoSQL (Document, Key-Value, Graph)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Flexible JSON documents, Redis key-values, and graph relationship traversals",
          },
          {
            id: "topic-caching-redis",
            name: "Caching (Redis, Memcached)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Cache-aside, write-through, TTL invalidation, and LRU eviction policies",
          },
        ],
      },
      {
        id: "eng-principles",
        name: "Design Principles & Version Control",
        topics: [
          {
            id: "topic-solid",
            name: "SOLID Principles",
            isAvailable: false,
            badge: "Roadmap",
            description: "Single responsibility, Open/closed, Liskov substitution, Interface segregation, DI",
          },
          {
            id: "topic-design-patterns",
            name: "Design Patterns",
            isAvailable: false,
            badge: "Roadmap",
            description: "Singleton, Factory, Observer, Adapter, Decorator, and Strategy patterns",
          },
          {
            id: "topic-git",
            name: "Git, Branching, PRs",
            isAvailable: false,
            badge: "Roadmap",
            description: "Commit DAGs, branch rebasing, merge conflicts, and pull request reviews",
          },
          {
            id: "topic-clean-code",
            name: "Clean Code & Refactoring",
            isAvailable: false,
            badge: "Roadmap",
            description: "Descriptive naming, modular cohesion, reducing cyclomatic complexity",
          },
        ],
      },
      {
        id: "eng-apis-arch",
        name: "APIs & Architecture Basics",
        topics: [
          {
            id: "topic-client-server",
            name: "Client-Server Model",
            isAvailable: false,
            badge: "Roadmap",
            description: "Request-response cycles, statelesness, load distribution, and CDN edge caching",
          },
          {
            id: "topic-auth-security-base",
            name: "Auth (Sessions, JWT, OAuth 2.0)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Session cookies, signed JSON Web Tokens, refresh tokens, and OAuth flows",
          },
          {
            id: "topic-monolith-microservices",
            name: "Monolith vs Microservices",
            isAvailable: false,
            badge: "Roadmap",
            description: "Modular monoliths vs decoupled services, network boundaries, and eventual consistency",
          },
        ],
      },
    ],
  },

  // =========================================================
  // LAYER 5: SPECIALIZATIONS
  // =========================================================
  {
    id: "layer-5-specializations",
    layerNumber: 5,
    name: "LAYER 5: SPECIALIZATIONS",
    badge: "Web, Mobile, AI & Systems",
    description: "Industry domains: modern Web engineering, Mobile, AI/ML, Data, and Graphics",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    icon: "Layers",
    subcategories: [
      {
        id: "spec-web-backend",
        name: "Web: Backend",
        badge: "Active Module",
        topics: [
          {
            id: "topic-node",
            name: "Node.js & Restaurant ★",
            categoryId: "node",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "The Chef, Waiter, Back Kitchen, Thread Pool Helpers, VIP Notes & 5 Loop Phases",
            color: "#22c55e",
          },
          {
            id: "topic-api-design-middleware",
            name: "API Design & Middleware ★",
            categoryId: "backend",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "RESTful endpoints, Express 10-stage middleware lifecycle, JWT auth, and CORS guards",
            color: "#10b981",
          },
          {
            id: "topic-realtime-sockets",
            name: "Real-Time (Sockets) ★",
            categoryId: "realtime",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "WebSockets, 101 Upgrade, Socket.io 9-stage lifecycle, Rooms, Presence & Redis Pub/Sub",
            color: "#0ea5e9",
          },
          {
            id: "topic-queues-background",
            name: "Queues & Background Jobs ★",
            categoryId: "queues",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "BullMQ, Redis streams, 9-stage task lifecycle, worker threads, and dead-letter queues",
            color: "#f97316",
          },
          {
            id: "topic-scaling-load-balancing",
            name: "Scaling & Load Balancing ★",
            categoryId: "scaling",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Horizontal scaling, NGINX reverse proxies, round-robin, and sticky sessions",
            color: "#14b8a6",
          },
        ],
      },
      {
        id: "spec-web-frontend",
        name: "Web: Frontend & Platform",
        topics: [
          {
            id: "topic-web-platform",
            name: "Platform Fundamentals (HTML/CSS/DOM) ★",
            categoryId: "platform",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Semantic markup, CSS box model, layout engines (Flex/Grid), and DOM tree manipulation",
            color: "#6366f1",
          },
          {
            id: "topic-browser-rendering",
            name: "How Browsers Render ★",
            categoryId: "rendering",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Critical rendering path: HTML parser → DOM + CSSOM → Render Tree → Layout → Paint",
            color: "#f43f5e",
          },
          {
            id: "topic-web-security-storage",
            name: "Cookies, Storage & CORS ★",
            categoryId: "security",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Same-origin policy, CORS preflights, localStorage, IndexedDB, and HttpOnly cookies",
            color: "#eab308",
          },
          {
            id: "topic-frontend-state",
            name: "State Management & Rendering ★",
            categoryId: "state",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Unidirectional data flow, server rendering, hydration, and static site generation",
            color: "#8b5cf6",
          },
          {
            id: "topic-perf-a11y",
            name: "Performance & Accessibility (a11y) ★",
            categoryId: "perf",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Core Web Vitals (LCP, INP, CLS), code-splitting, ARIA attributes, and screen readers",
            color: "#84cc16",
          },
        ],
      },
      {
        id: "spec-ai-ml",
        name: "AI & Machine Learning",
        topics: [
          {
            id: "topic-ai-prereqs",
            name: "Prerequisites (Linear Algebra, Probability, Python) ★",
            categoryId: "aimath",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Matrix multiplications, probability distributions, and Python tensor math",
            color: "#d946ef",
          },
          {
            id: "topic-ml-core",
            name: "Machine Learning (Supervised & Unsupervised) ★",
            categoryId: "mlcore",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Regression, classification, decision trees, k-means clustering, and overfitting",
            color: "#0284c7",
          },
          {
            id: "topic-deep-learning",
            name: "Deep Learning (Neural Networks, Transformers) ★",
            categoryId: "deeplearning",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Feedforward networks, backpropagation, activation functions, and attention layers",
            color: "#7c3aed",
          },
          {
            id: "topic-nlp-llms",
            name: "NLP & LLMs ★",
            categoryId: "nlpllms",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Tokenization, embeddings, self-attention, prompt engineering, and fine-tuning",
            color: "#10a37f",
          },
          {
            id: "topic-computer-vision",
            name: "Computer Vision ★",
            categoryId: "vision",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "2D convolutions, receptive fields, ResNet, ViT patch self-attention, YOLO, and Mask R-CNN",
            color: "#ef4444",
          },
        ],
      },
      {
        id: "spec-mobile-data-iot",
        name: "Mobile, Data & Emerging Tech",
        topics: [
          {
            id: "topic-mobile-fundamentals",
            name: "Mobile Platform (Android & iOS) ★",
            categoryId: "mobile",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "App lifecycle, memory constraints, push notifications, background tasks, and Hermes/Flutter engines",
            color: "#2563eb",
          },
          {
            id: "topic-data-pipelines",
            name: "Data Engineering & Pipelines ★",
            categoryId: "data",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Distributed compute, Apache Spark RDD/DataFrames, 9-stage lakehouse pipelines, Delta Lake ACID, and dbt modeling",
            color: "#ea580c",
          },
          {
            id: "topic-game-dev",
            name: "Game Dev & Graphics ★",
            categoryId: "gamedev",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Deterministic game loops, fixed timestep accumulators, collision detection, 9-stage real-time rendering, and GPU shaders",
            color: "#c026d3",
          },
          {
            id: "topic-embedded-iot",
            name: "Embedded Systems & IoT ★",
            categoryId: "iot",
            isAvailable: true,
            isStarred: true,
            badge: "Interactive Web",
            description: "Bare-metal registers, FreeRTOS preemptive scheduling, DMA transfers, I2C/SPI buses, and 9-stage IoT telemetry",
            color: "#059669",
          },
          {
            id: "topic-blockchain",
            name: "Blockchain & Cryptography",
            isAvailable: false,
            badge: "Roadmap",
            description: "Proof-of-work/stake consensus, merkle trees, hashing, and smart contracts",
          },
        ],
      },
    ],
  },

  // =========================================================
  // LAYER 6: FRAMEWORKS & TOOLS
  // =========================================================
  {
    id: "layer-6-tools",
    layerNumber: 6,
    name: "LAYER 6: FRAMEWORKS & TOOLS",
    badge: "Ecosystem & DevOps",
    description: "Industry production frameworks, UI libraries, containerization, and build systems",
    color: "#d946ef",
    gradient: "linear-gradient(135deg, #d946ef 0%, #a21caf 100%)",
    icon: "Wrench",
    subcategories: [
      {
        id: "tools-frontend",
        name: "Frontend Frameworks",
        topics: [
          {
            id: "topic-react",
            name: "React (Hooks, Redux)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Virtual DOM reconciliation, hooks lifecycle, context, and state machines",
          },
          {
            id: "topic-nextjs",
            name: "Next.js",
            isAvailable: false,
            badge: "Roadmap",
            description: "App router, React Server Components (RSC), server actions, and edge rendering",
          },
          {
            id: "topic-angular-vue",
            name: "Angular, Vue, Svelte",
            isAvailable: false,
            badge: "Roadmap",
            description: "RxJS observables, reactivity proxies, and compile-time reactive assignments",
          },
          {
            id: "topic-build-tools",
            name: "Tailwind, Vite, Webpack",
            isAvailable: false,
            badge: "Roadmap",
            description: "Utility CSS engines, ESM dev servers, tree shaking, and asset bundling",
          },
        ],
      },
      {
        id: "tools-backend",
        name: "Backend Frameworks",
        topics: [
          {
            id: "topic-express-nestjs",
            name: "Express, NestJS",
            isAvailable: false,
            badge: "Roadmap",
            description: "Minimalist Node.js routing vs modular TypeScript architecture with DI",
          },
          {
            id: "topic-django-fastapi",
            name: "Django, FastAPI",
            isAvailable: false,
            badge: "Roadmap",
            description: "Python batteries-included ORM vs async Pydantic OpenAPI endpoints",
          },
          {
            id: "topic-spring-boot",
            name: "Spring Boot",
            isAvailable: false,
            badge: "Roadmap",
            description: "Enterprise Java dependency injection, auto-configuration, and Spring Data",
          },
        ],
      },
      {
        id: "tools-infra-ai",
        name: "Infra & AI Tooling",
        topics: [
          {
            id: "topic-docker-k8s",
            name: "Docker, Kubernetes",
            isAvailable: false,
            badge: "Roadmap",
            description: "Linux containers, image layers, pod orchestration, and service meshes",
          },
          {
            id: "topic-kafka-rabbitmq",
            name: "Kafka, RabbitMQ",
            isAvailable: false,
            badge: "Roadmap",
            description: "Log-based distributed streaming topics vs AMQP message broker exchanges",
          },
          {
            id: "topic-pytorch-tensorflow",
            name: "PyTorch, TensorFlow, scikit-learn",
            isAvailable: false,
            badge: "Roadmap",
            description: "Dynamic computational graphs, GPU tensor acceleration, and ML estimators",
          },
        ],
      },
    ],
  },

  // =========================================================
  // CROSS-CUTTING (APPLIES TO ALL LAYERS)
  // =========================================================
  {
    id: "layer-cross-cutting",
    layerNumber: "★",
    name: "CROSS-CUTTING",
    badge: "System Design & Security",
    description: "Universal disciplines spanning all layers: security, cloud DevOps, testing, and scalability",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    icon: "ShieldCheck",
    subcategories: [
      {
        id: "cross-system-design",
        name: "System Design",
        topics: [
          {
            id: "topic-scalability-caching",
            name: "Scalability, Caching & CDN",
            isAvailable: false,
            badge: "Roadmap",
            description: "Stateless tiers, edge point-of-presence caching, and global load balancers",
          },
          {
            id: "topic-db-sharding-replication",
            name: "Database Sharding & Replication",
            isAvailable: false,
            badge: "Roadmap",
            description: "Read replicas, master-slave failover, consistent hashing, and horizontal partitioning",
          },
          {
            id: "topic-msg-queues",
            name: "Message Queues & Decoupling",
            isAvailable: false,
            badge: "Roadmap",
            description: "Asynchronous work distribution, event-driven architecture, and backpressure",
          },
        ],
      },
      {
        id: "cross-security",
        name: "Security",
        topics: [
          {
            id: "topic-encryption-hashing",
            name: "Encryption & Hashing",
            isAvailable: false,
            badge: "Roadmap",
            description: "Symmetric AES, asymmetric RSA, bcrypt salt hashing, and secret management",
          },
          {
            id: "topic-owasp-top-10",
            name: "OWASP Top 10 (XSS, CSRF, SQLi)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Input sanitization, parameterized queries, CSRF tokens, and CSP headers",
          },
          {
            id: "topic-auth-security",
            name: "Authentication & Authorization (RBAC)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Multi-factor authentication, role-based access control, and least privilege",
          },
        ],
      },
      {
        id: "cross-devops-testing",
        name: "DevOps, Cloud & Testing",
        topics: [
          {
            id: "topic-cicd-cloud",
            name: "CI/CD & Cloud (AWS / GCP / Azure)",
            isAvailable: false,
            badge: "Roadmap",
            description: "GitHub Actions, automated test pipelines, serverless functions, and terraform IaC",
          },
          {
            id: "topic-observability",
            name: "Monitoring & Logging",
            isAvailable: false,
            badge: "Roadmap",
            description: "Structured logs, Prometheus metrics, distributed tracing, and incident alerting",
          },
          {
            id: "topic-testing-pyramid",
            name: "Testing (Unit, Integration, E2E, TDD)",
            isAvailable: false,
            badge: "Roadmap",
            description: "Test pyramid ratios, mocking dependencies, Cypress/Playwright E2E, and regression prevention",
          },
        ],
      },
    ],
  },
];
