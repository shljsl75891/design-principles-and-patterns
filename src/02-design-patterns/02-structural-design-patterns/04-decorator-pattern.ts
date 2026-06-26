/**
 * Decorator Pattern
 *
 * Dynamically attaches new responsibilities to objects by placing them
 * inside wrapper objects that share the same interface. Each decorator
 * adds its own behavior before or after delegating to the wrapped object,
 * allowing runtime composition without class explosion.
 *
 * Use when: you need to add optional behaviors to objects without modifying
 * them, compose behaviors in any order at runtime, or subclassing would
 * cause a combinatorial explosion of classes.
 */

interface IDataSource {
  read(): string;
  write(data: string): void;
}

class FileDataSource implements IDataSource {
  private content = "";

  constructor(private filename: string) {}

  read(): string {
    return this.content;
  }

  write(data: string): void {
    this.content = data;
  }
}

/**
 * --------- NON COMPLIANT CODE ---------
 * Every combination of features needs its own class. Two features (compress,
 * encrypt) already produce three classes; three features would produce seven.
 * This doesn't scale — adding a new feature means adding classes for every
 * existing combination.
 */
class CompressedFileDataSource extends FileDataSource {
  write(data: string): void {
    super.write(`compressed(${data})`);
  }

  read(): string {
    return `decompressed(${super.read()})`;
  }
}

class EncryptedFileDataSource extends FileDataSource {
  write(data: string): void {
    super.write(`encrypted(${data})`);
  }

  read(): string {
    return `decrypted(${super.read()})`;
  }
}

class CompressedEncryptedFileDataSource extends FileDataSource {
  write(data: string): void {
    super.write(`compressed(encrypted(${data}))`);
  }

  read(): string {
    return `decrypted(decompressed(${super.read()}))`;
  }
}

/**
 * --------- COMPLIANT CODE ------------
 * BaseDecorator implements IDataSource and wraps another IDataSource. Each
 * concrete decorator extends BaseDecorator and adds one behavior. Clients
 * compose decorators at runtime in any order — feature combinations are
 * infinite without creating a class for each one.
 */
class BaseDecorator implements IDataSource {
  constructor(protected source: IDataSource) {}

  read(): string {
    return this.source.read();
  }

  write(data: string): void {
    this.source.write(data);
  }
}

class CompressionDecorator extends BaseDecorator {
  write(data: string): void {
    super.write(`compressed(${data})`);
  }

  read(): string {
    return `decompressed(${super.read()})`;
  }
}

class EncryptionDecorator extends BaseDecorator {
  write(data: string): void {
    super.write(`encrypted(${data})`);
  }

  read(): string {
    return `decrypted(${super.read()})`;
  }
}

/* --------- Client Code --------- */
const file = new FileDataSource("data.txt");
const compressed = new CompressionDecorator(file);
const encrypted = new EncryptionDecorator(compressed);

encrypted.write("secret data");
console.log(encrypted.read());
