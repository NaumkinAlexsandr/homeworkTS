// Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні.

interface INote {
  id: number;
  title: Context;
  text: Context;
  complited: boolean;
  important: boolean;
}

interface INoteWithTime extends INote {
  dateOfCreation: CreationTime;
}

type Context = string | number | symbol;
type CreationTime = string | number | Date;

type NoteAdd = <T extends INoteWithTime, K extends Context>(
  title: Context,
  text: Context
) => INoteWithTime;

type NoteDelete = <T extends INoteWithTime, K extends number>(
  id: number
) => void;

type NoteEdit = <T extends INoteWithTime, K extends Context>(
  id: number,
  title: Context,
  text: Context,
  important: boolean
) => void;

type NoteComplited = <T extends INoteWithTime, K>(
  K: boolean
) => INoteWithTime[] | undefined;

type NoteFindContext = <T extends INoteWithTime, K extends Context>(
  K: Context
) => INoteWithTime | undefined;

abstract class NotesMethods {
  abstract addNote: NoteAdd;
  abstract deleteNote: NoteDelete;
  abstract editNote: NoteEdit;
}

class TodoList extends NotesMethods {
  private notes: INoteWithTime[];

  constructor() {
    super();
    this.notes = [];
  }

  public getNoteById(id: number): INoteWithTime | undefined {
    return this.notes.find((note) => note.id === id);
  }

  public getAllNotes(): INoteWithTime[] {
    return this.notes;
  }

  public getNoteByComplited: NoteComplited = (complited: boolean) => {
    return this.notes.filter((note) => note.complited === complited);
  };

  public findeNoteByTitle: NoteFindContext = (context: Context) => {
    return this.notes.find(
      (note) => note.title === context || note.text === context
    );
  };

  public sortNotesByComplited(): INoteWithTime[] {
    return this.notes.sort((a, b) => {
      if (a.complited && !b.complited) {
        return -1;
      } else if (!a.complited && b.complited) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public addNote: NoteAdd = (title: Context, text: Context): INoteWithTime => {
    if (title.toString().trim() === "" || text.toString().trim() === "") {
      new Error('"Error: Note cannot be empty."');
    }
    const note: INoteWithTime = {
      id: this.notes.length + 1,
      title,
      text,
      complited: false,
      important: false,
      dateOfCreation: new Date(),
    };

    this.notes.push(note);

    return note;
  };

  public deleteNote: NoteDelete = (id: number): void => {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  };

  public editNote: NoteEdit = (
    id: number,
    title: Context,
    text: Context,
    important: boolean
  ) => {
    const note = this.getNoteById(id);

    if (note) {
      if (note.important === true) {
        const confirmed = confirm("Are you sure you want to edit this note?");
        if (confirmed) {
          note.title = title;
          note.text = text;
          note.important = important;
        }
      } else {
        note.title = title;
        note.text = text;
      }
    }

    return note;
  };
}

const todoList = new TodoList();

const note1 = todoList.addNote("Note 1", "This is note 1");
const note2 = todoList.addNote("Note 2", "This is note 2");
const note3 = todoList.addNote("Note 3", "This is note 3");

note1.complited = true;

// todoList.deleteNote(2);
// todoList.editNote(1, "New note 1", "This is new note 1", false);
// console.log(todoList.getNoteById(1));
// console.log(todoList.sortNotesByComplited());
// console.log(todoList.findeNoteByTitle("This is note 3"));
// console.log(todoList.getNoteByComplited(false));

// console.log(todoList.getAllNotes());
