/**
 * Observer Pattern
 *
 * Defines a one-to-many dependency so that when a subject changes state, all
 * registered observers are notified and updated automatically. It solves the
 * problem of tight coupling between a state source and every piece of code that
 * reacts to it. The subject holds a list of observers behind a minimal
 * subscribe/unsubscribe interface and calls a single update() on each — it
 * never knows or cares what they do with the notification.
 *
 * Use when: multiple unrelated components (UI, logger, analytics, cache) must
 * react to the same state change and you want to add or remove listeners at
 * runtime without touching the source.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * Store directly calls UI, Logger, and Analytics inside setState. Every new
 * consumer requires editing the store, and removing one means finding and
 * deleting its call site inside core business logic. The store is coupled to
 * the concrete types of every downstream system.
 */
interface AppState {
  count: number;
  user: string;
}

class StoreDirect {
  private state: AppState = { count: 0, user: "guest" };

  setState(next: Partial<AppState>): void {
    this.state = { ...this.state, ...next };
    // Tightly coupled — adding a 4th consumer means editing this method
    console.log(
      `[UI] re-rendering with count=${this.state.count}, user=${this.state.user}`,
    );
    console.log(`[Logger] state changed: ${JSON.stringify(this.state)}`);
    console.log(`[Analytics] tracking event for user=${this.state.user}`);
  }
}

const directStore = new StoreDirect();
directStore.setState({ count: 1 });
directStore.setState({ user: "alice" });

/**
 * --------- COMPLIANT CODE ------------
 * Store implements Subject and holds an observer list. Each consumer implements
 * Observer and registers itself at runtime. Store calls notify() — it is
 * completely unaware of who is listening or how many. Observers can be added,
 * removed, or reordered without touching the store.
 */

interface Observer {
  update(state: AppState): void;
}

interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}

class Store implements Subject {
  private state: AppState = { count: 0, user: "guest" };
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  setState(next: Partial<AppState>): void {
    this.state = { ...this.state, ...next };
    this.notify();
  }

  getState(): AppState {
    return this.state;
  }
}

class UIComponent implements Observer {
  update(state: AppState): void {
    console.log(
      `[UI] re-rendering with count=${state.count}, user=${state.user}`,
    );
  }
}

class Logger implements Observer {
  update(state: AppState): void {
    console.log(`[Logger] state changed: ${JSON.stringify(state)}`);
  }
}

class AnalyticsTracker implements Observer {
  update(state: AppState): void {
    console.log(`[Analytics] tracking event for user=${state.user}`);
  }
}

/* --------- Client Code --------- */
const store = new Store();
const ui = new UIComponent();
const logger = new Logger();
const analytics = new AnalyticsTracker();

store.subscribe(ui);
store.subscribe(logger);
store.subscribe(analytics);

store.setState({ count: 1 });
// [UI] re-rendering with count=1, user=guest
// [Logger] state changed: {"count":1,"user":"guest"}
// [Analytics] tracking event for user=guest

store.unsubscribe(analytics); // analytics no longer notified

store.setState({ user: "alice" });
// [UI] re-rendering with count=1, user=alice
// [Logger] state changed: {"count":1,"user":"alice"}
