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

// --------- NON COMPLIANT CODE --------- (include only if it helps contrast)
... problematic implementation ...

// COMPLIANT CODE
... compliant implementation ...

/*--------- Client Code ---------*/
const x = new SomeClass();
console.log(x.someMethod());
```

### 4. Wire into `index.ts`

```ts
import "./NN-pattern-name";
```
