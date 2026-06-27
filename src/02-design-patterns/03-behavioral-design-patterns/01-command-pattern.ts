/**
 * Command Pattern
 *
 * Encapsulates a request as a standalone object that holds the receiver and all
 * arguments needed to perform an operation. The key insight is that because
 * requests become objects, they can be stored, passed around, and reversed.
 * A history stack of command objects enables undo/redo by restoring a state
 * snapshot each command captures before executing.
 *
 * Use when: you need undo/redo, deferred/queued execution, or an audit log of
 * operations — anywhere the fact that "this action happened" needs to outlive
 * the call itself.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * TextEditor exposes direct mutable methods. The client calls them and state
 * changes immediately — there is no record of what happened and no way to
 * reverse it. Adding undo would force the client to manually snapshot state
 * before every call, scattering that responsibility everywhere it's used.
 */
class TextEditorDirect {
  public text: string = "";

  insert(pos: number, str: string): void {
    this.text = this.text.slice(0, pos) + str + this.text.slice(pos);
  }

  delete(start: number, end: number): void {
    this.text = this.text.slice(0, start) + this.text.slice(end);
  }

  replace(start: number, end: number, str: string): void {
    this.text = this.text.slice(0, start) + str + this.text.slice(end);
  }
}

// client — no undo possible
const directEditor = new TextEditorDirect();
directEditor.insert(0, "Hello World");
directEditor.delete(5, 11);
console.log(directEditor.text); // "Hello"
// Undo? Impossible without the client manually saving state beforehand.

/**
 * --------- COMPLIANT CODE ------------
 * Each operation is wrapped in a Command object. Before executing, every command
 * snapshots the editor's current text into a backup field. CommandHistory keeps
 * a stack of executed commands — undo() pops the last one and restores its
 * snapshot, reversing the operation cleanly without the client knowing anything
 * about how state is managed.
 */

// Receiver — pure business logic, no awareness of commands or history
class TextEditor {
  public text: string = "";

  insert(pos: number, str: string): void {
    this.text = this.text.slice(0, pos) + str + this.text.slice(pos);
  }

  delete(start: number, end: number): void {
    this.text = this.text.slice(0, start) + this.text.slice(end);
  }

  replace(start: number, end: number, str: string): void {
    this.text = this.text.slice(0, start) + str + this.text.slice(end);
  }
}

// Base command — shared backup/restore logic so concrete commands don't repeat it
abstract class EditorCommand {
  private backup: string = "";

  constructor(protected editor: TextEditor) {}

  protected saveBackup(): void {
    this.backup = this.editor.text;
  }

  undo(): void {
    this.editor.text = this.backup;
  }

  abstract execute(): void;
}

// Concrete commands — each captures its own args and delegates to the receiver
class InsertCommand extends EditorCommand {
  constructor(
    editor: TextEditor,
    private pos: number,
    private str: string,
  ) {
    super(editor);
  }

  execute(): void {
    this.saveBackup();
    this.editor.insert(this.pos, this.str);
  }
}

class DeleteCommand extends EditorCommand {
  constructor(
    editor: TextEditor,
    private start: number,
    private end: number,
  ) {
    super(editor);
  }

  execute(): void {
    this.saveBackup();
    this.editor.delete(this.start, this.end);
  }
}

class ReplaceCommand extends EditorCommand {
  constructor(
    editor: TextEditor,
    private start: number,
    private end: number,
    private str: string,
  ) {
    super(editor);
  }

  execute(): void {
    this.saveBackup();
    this.editor.replace(this.start, this.end, this.str);
  }
}

// Invoker — executes commands and maintains history stack for undo
class CommandHistory {
  private stack: EditorCommand[] = [];

  execute(cmd: EditorCommand): void {
    cmd.execute();
    this.stack.push(cmd);
  }

  undo(): void {
    this.stack.pop()?.undo();
  }
}

/* --------- Client Code --------- */
const editor = new TextEditor();
const history = new CommandHistory();

history.execute(new InsertCommand(editor, 0, "Hello World"));
console.log(editor.text); // "Hello World"

history.execute(new DeleteCommand(editor, 5, 11));
console.log(editor.text); // "Hello"

history.execute(new ReplaceCommand(editor, 0, 5, "Hi"));
console.log(editor.text); // "Hi"

history.undo();
console.log(editor.text); // "Hello"  ← ReplaceCommand reversed

history.undo();
console.log(editor.text); // "Hello World"  ← DeleteCommand reversed
