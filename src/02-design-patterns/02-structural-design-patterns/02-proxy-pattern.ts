/**
 * Proxy Pattern
 *
 * Provides a surrogate or placeholder that implements the same interface as
 * the real subject. Intercepts calls to add cross-cutting behavior — caching,
 * logging, access control — without modifying the real subject or coupling
 * clients to those concerns. The proxy delegates to the real subject only
 * when necessary, and multiple proxies can be stacked since they all share
 * the same interface.
 *
 * Use when: you need to cache expensive calls, control access, lazy-load heavy
 * objects, or add logging around an object without touching its internals.
 */

interface IDataService {
  fetchData(query: string): string;
}

class RemoteDataService implements IDataService {
  fetchData(query: string): string {
    return `Data for "${query}" (fetched from remote)`;
  }
}

/**
 * --------- NON COMPLIANT CODE ---------
 * Client hits the heavy service directly for every call. No caching, so repeat
 * queries cost the same as the first. Adding caching or logging would require
 * modifying RemoteDataService or every call site — concerns leak everywhere.
 */
const raw = new RemoteDataService();
raw.fetchData("user:1");
raw.fetchData("user:1");

/**
 * --------- COMPLIANT CODE ------------
 * Caching proxy skips repeated fetches by storing results in a Map keyed by
 * query. Logging proxy wraps any IDataService and logs every call. Both
 * implement IDataService, so they can be stacked, composed, and swapped
 * without changing client code or the real subject.
 */
class CachingDataServiceProxy implements IDataService {
  private cache = new Map<string, string>();

  constructor(private service: IDataService) {}

  fetchData(query: string): string {
    if (this.cache.has(query)) {
      return this.cache.get(query)!;
    }

    const data = this.service.fetchData(query);
    this.cache.set(query, data);
    return data;
  }
}

class LoggingDataServiceProxy implements IDataService {
  constructor(private service: IDataService) {}

  fetchData(query: string): string {
    console.log(`[LOG] fetching: ${query}`);
    const data = this.service.fetchData(query);
    console.log(`[LOG] result: ${data}`);
    return data;
  }
}

/* --------- Client Code --------- */
const service = new RemoteDataService();
const cachingProxy = new CachingDataServiceProxy(service);
const proxy = new LoggingDataServiceProxy(cachingProxy);

console.log(proxy.fetchData("user:1"));
console.log(proxy.fetchData("user:1"));
console.log(proxy.fetchData("user:2"));
console.log(proxy.fetchData("user:2"));
