## Adding a New Pattern

### 1. Preserve numeric ordering

- Use the next available `NN` (e.g. if highest existing is `05`, new file is `06`)
- Never reuse, skip, or renumber existing files

### 2. Create `NN-pattern-name.ts`

File layout (in this order):

```ts
/**
 * <Pattern Name>
 *
 * <Full definition — strictly 2 to 4 sentences covering: what the pattern is,
 * the problem it solves, and how it solves it. Should be enough but to the point and short
 * to understand the pattern at first glance without prior knowledge.>
 *
 * Use when: <specific conditions or signals that suggest this pattern>
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * <explain why this approach is problematic — what it couples, why it doesn't
 * scale, what concern it violates, etc.>
 */
... problematic implementation ...

/**
 * --------- COMPLIANT CODE ------------
 * <explain how this approach solves the problem — what the pattern does,
 * how it decouples concerns, what makes it better>
 */
... compliant implementation ...

/* --------- Client Code --------- */
const x = new SomeClass();
console.log(x.someMethod());
```
