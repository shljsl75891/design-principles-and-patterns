/**
 * Strategy Pattern
 *
 * Defines a family of algorithms, encapsulates each in its own class, and makes
 * them interchangeable via a shared interface. The problem it solves: a class
 * that handles multiple algorithm variants through conditionals swells in size —
 * every new variant requires modifying the same class, coupling unrelated logic.
 * A Context instead holds a reference to a Strategy object and delegates work to
 * it, remaining ignorant of which concrete algorithm runs.
 *
 * Use when: a class branches on algorithm variants at runtime, you want to swap
 * behavior without touching the context, or variants need to be independently
 * testable and extensible without risking regressions in others.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * TravelPlanner embeds all transport logic inline behind a string discriminant.
 * Adding a new transport mode (e.g. train, scooter) forces modification of this
 * class — any developer working on a new variant risks breaking the others.
 * The branches can't be tested or swapped independently, and the class grows
 * unboundedly with each new mode.
 */
class TravelPlannerDirect {
  plan(transport: "bus" | "cab" | "bike", destination: string): string {
    if (transport === "bus") {
      return `Taking the bus to ${destination} — cheap but slower, check schedule first`;
    } else if (transport === "cab") {
      return `Ordering a cab to ${destination} — fast but expensive, surge pricing may apply`;
    } else if (transport === "bike") {
      return `Cycling to ${destination} — free and healthy, weather-dependent`;
    }
    throw new Error("Unknown transport");
  }
}

// client — adding "train" means reopening and modifying TravelPlannerDirect
const directPlanner = new TravelPlannerDirect();
console.log(directPlanner.plan("bus", "airport")); // Taking the bus to airport — cheap but slower...
console.log(directPlanner.plan("cab", "airport")); // Ordering a cab to airport — fast but expensive...

/**
 * --------- COMPLIANT CODE ------------
 * Each transport mode is extracted into its own strategy class implementing a
 * shared interface. TravelPlanner (the context) holds a reference to whichever
 * strategy the client injects and delegates all routing logic to it. Adding a
 * new mode means writing a new class — zero changes to the context or existing
 * strategies. Strategies can also be swapped at runtime based on constraints
 * like budget or time.
 */
interface TransportStrategy {
  travel(destination: string): string;
}

class BusStrategy implements TransportStrategy {
  travel(destination: string): string {
    return `Taking the bus to ${destination} — cheap but slower, check schedule first`;
  }
}

class CabStrategy implements TransportStrategy {
  travel(destination: string): string {
    return `Ordering a cab to ${destination} — fast but expensive, surge pricing may apply`;
  }
}

class BikeStrategy implements TransportStrategy {
  travel(destination: string): string {
    return `Cycling to ${destination} — free and healthy, weather-dependent`;
  }
}

/** This is called "Context" class */
class TravelPlanner {
  constructor(private strategy: TransportStrategy) {}

  setStrategy(strategy: TransportStrategy): void {
    this.strategy = strategy;
  }

  planTrip(destination: string): string {
    return this.strategy.travel(destination);
  }
}

/* --------- Client Code --------- */
const planner = new TravelPlanner(new BusStrategy());
console.log(planner.planTrip("airport")); // Taking the bus to airport — cheap but slower...

// running late — swap strategy at runtime, no changes to TravelPlanner
planner.setStrategy(new CabStrategy());
console.log(planner.planTrip("airport")); // Ordering a cab to airport — fast but expensive...

// going on a budget trip — switch again
planner.setStrategy(new BikeStrategy());
console.log(planner.planTrip("airport")); // Cycling to airport — free and healthy...
