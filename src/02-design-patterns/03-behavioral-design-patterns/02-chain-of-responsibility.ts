/**
 * Chain of Responsibility Pattern
 *
 * Passes a request along a linked chain of handlers where each handler either
 * processes the request or forwards it to the next. Unlike simple routing, each
 * handler depends on what previous handlers have done — they enrich shared state
 * that downstream handlers require to function correctly.
 * This decouples the sender from the receiver and lets you add, remove, or reorder
 * steps without touching existing handlers or the caller.
 *
 * Use when: processing has ordered, dependent stages — each step relies on state
 * set by a prior step — such as middleware pipelines, auth/permission guards, or
 * multi-phase validation flows.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * All stages (auth, permission, rate-limit) are inlined in one function. Adding a
 * new stage means editing processRequest directly. Stages are coupled — extracting
 * or reordering any step requires understanding and touching all the surrounding
 * logic. The dependency between stages (e.g. permissions need req.user set by auth)
 * is implicit and buried inside nested conditionals.
 */
interface RawRequest {
  token: string;
  role?: string;
  userId?: string;
  path: string;
}

function processRequestDirect(req: RawRequest): string {
  // Stage 1: auth
  if (!req.token || req.token !== "valid-token") {
    return "401 Unauthorized";
  }
  req.userId = "user-42";
  req.role = "admin";

  // Stage 2: permission — depends on role set above
  if (req.path.startsWith("/admin") && req.role !== "admin") {
    return "403 Forbidden";
  }

  // Stage 3: rate limit — depends on userId set above
  const requestCount = getRequestCount(req.userId);
  if (requestCount > 100) {
    return "429 Too Many Requests";
  }

  return "200 OK";
}

function getRequestCount(_userId: string): number {
  return 5; // stubbed
}

console.log(
  processRequestDirect({ token: "valid-token", path: "/admin/dashboard" }),
);
// "200 OK"

/**
 * --------- COMPLIANT CODE ------------
 * Each stage is its own handler class. Handlers are linked at runtime; each one
 * does its work, sets state on the shared context, then calls next.handle() to
 * continue the chain. The dependency is explicit: AuthHandler attaches user/role
 * to the context, so PermissionHandler can read it, then RateLimitHandler uses
 * the userId. Removing or adding a handler is a one-line change in chain assembly.
 */

interface RequestContext {
  token: string;
  path: string;
  userId?: string;
  role?: string;
}

abstract class Middleware {
  private next: Middleware | null = null;

  setNext(handler: Middleware): Middleware {
    this.next = handler;
    return handler; // enables chaining: a.setNext(b).setNext(c)
  }

  protected forward(ctx: RequestContext): string {
    return this.next ? this.next.handle(ctx) : "200 OK";
  }

  abstract handle(ctx: RequestContext): string;
}

// Stage 1: validate token, attach userId + role to context
class AuthMiddleware extends Middleware {
  handle(ctx: RequestContext): string {
    if (!ctx.token || ctx.token !== "valid-token") {
      return "401 Unauthorized";
    }
    ctx.userId = "user-42";
    ctx.role = "admin";
    return this.forward(ctx);
  }
}

// Stage 2: check role — depends on ctx.role set by AuthMiddleware
class PermissionMiddleware extends Middleware {
  handle(ctx: RequestContext): string {
    if (ctx.path.startsWith("/admin") && ctx.role !== "admin") {
      return "403 Forbidden";
    }
    return this.forward(ctx);
  }
}

// Stage 3: enforce per-user rate limit — depends on ctx.userId set by AuthMiddleware
class RateLimitMiddleware extends Middleware {
  private counts: Map<string, number> = new Map();

  handle(ctx: RequestContext): string {
    const userId = ctx.userId!;
    const count = (this.counts.get(userId) ?? 0) + 1;
    this.counts.set(userId, count);
    if (count > 100) {
      return "429 Too Many Requests";
    }
    return this.forward(ctx);
  }
}

/* --------- Client Code --------- */
const auth = new AuthMiddleware();
const permission = new PermissionMiddleware();
const rateLimit = new RateLimitMiddleware();

// Chain: auth → permission → rateLimit → (implicit 200 OK)
auth.setNext(permission).setNext(rateLimit);

console.log(auth.handle({ token: "bad-token", path: "/admin/dashboard" }));
// "401 Unauthorized"  — auth short-circuits; permission never runs

console.log(auth.handle({ token: "valid-token", path: "/admin/dashboard" }));
// "200 OK"  — auth sets role="admin", permission passes, rate limit passes

console.log(auth.handle({ token: "valid-token", path: "/public/home" }));
// "200 OK"  — skips admin check, proceeds to rate limit, passes
