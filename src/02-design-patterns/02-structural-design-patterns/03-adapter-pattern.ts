/**
 * Adapter Pattern
 *
 * Allows objects with incompatible interfaces to collaborate. Wraps an
 * existing class (adaptee) in an adapter that implements the target interface
 * expected by the client, translating calls and converting data so neither
 * the client nor the adaptee needs to change.
 *
 * Use when: you need to integrate a third-party or legacy service whose
 * interface doesn't match what your application expects, or when frontend
 * and backend API signatures diverge (field naming, nesting, data shapes).
 */

interface IAdapter<From, To> {
  adaptTo(data: From): To;
  adaptFrom(data: To): From;
}

class XmlDataService {
  fetchXml(): string {
    return `<data><name>John</name><age>30</age></data>`;
  }
}

/**
 * --------- NON COMPLIANT CODE ---------
 * Client calls the XML service directly and manually parses raw XML at the
 * call site. There is no IAdapter abstraction — every place that needs data
 * must know the XML format and parsing logic. Switching to JSON or another
 * format means finding and updating every parsing site.
 */
const xmlService = new XmlDataService();
const rawXml = xmlService.fetchXml();
const parsed: Record<string, unknown> = {};
const rawMatches = rawXml.matchAll(/<(\w+)>([^<]+)<\/\1>/g);
for (const [, key, value] of rawMatches) {
  parsed[key] = isNaN(Number(value)) ? value : Number(value);
}
console.log(parsed);

/**
 * --------- COMPLIANT CODE ------------
 * XmlToJsonAdapter implements IAdapter<string, Record<string, unknown>>,
 * encapsulating both conversion directions. The client only depends on
 * IAdapter — switching the source format means writing a new adapter,
 * nothing else changes.
 */
class XmlToJsonAdapter
  implements IAdapter<string, Record<string, unknown>>
{
  adaptTo(xml: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    const matches = xml.matchAll(/<(\w+)>([^<]+)<\/\1>/g);
    for (const [, key, value] of matches) {
      result[key] = isNaN(Number(value)) ? value : Number(value);
    }
    return result;
  }

  adaptFrom(data: Record<string, unknown>): string {
    const entries = Object.entries(data)
      .map(([k, v]) => `  <${k}>${v}</${k}>`)
      .join("\n");
    return `<data>\n${entries}\n</data>`;
  }
}

/* --------- Client Code --------- */
const svc = new XmlDataService();
const adapter = new XmlToJsonAdapter();

const json = adapter.adaptTo(svc.fetchXml());
console.log(json);

const backToXml = adapter.adaptFrom(json);
console.log(backToXml);
