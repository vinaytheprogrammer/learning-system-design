# Learning System Design

Interactive visual guides, architectural deep dives, and mental models for mastering System Design.

---

## 📚 Visual Learning Modules

| Topic | File | Description |
|---|---|---|
| **Caching Strategies** | [`Caching.html`](./Caching.html) | Deep dive into caching at staff level — caching patterns (cache-aside, write-through, write-behind), eviction policies, cache stampede / penetration / avalanche, and consistent hashing. |
| **Databases** | [`DB.html`](./DB.html) | SQL, NoSQL & Vector Databases field guide — RDBMS, document stores, key-value, wide-column, graph databases, and vector embeddings for AI workloads. |
| **Containers & Orchestration** | [`Docker&Kubernetes.html`](./Docker&Kubernetes.html) | The shipping yard theory of software — Docker fundamentals, layer caching, registries, Kubernetes orchestration, self-healing, pods, services, and deployments. |
| **Request Lifecycle** | [`Request_Journey.html`](./Request_Journey.html) | Complete journey of a web request — DNS resolution, CDN edges, Anycast routing, Forward/Reverse Proxies, Firewalls, Load Balancers, and API Gateways. |
| **AuthN & AuthZ** | [`auth.html`](./auth.html) | Authentication & Authorization at scale — OAuth 2.0 grant flows, PKCE, OIDC, JWT lifecycle and revocation, RBAC, ABAC, and ReBAC (Google Zanzibar). |
| **Rate Limiting** | [`ratelimiting.html`](./ratelimiting.html) | Interactive simulation of rate limiting algorithms — Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket with trade-offs. |

---

## 🚀 How to View

Each module is a self-contained, interactive HTML document with built-in diagrams, simulators, and dark/light mode support.

You can view any module simply by opening it in your web browser:

```bash
# Example
google-chrome ./ratelimiting.html
# or
open ./ratelimiting.html
```
