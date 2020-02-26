const chalk = require("chalk");
const fs = require("fs");

const success = chalk.bold.inverse.green;
const error = chalk.bold.inverse.red;
const header = chalk.bold.inverse.yellow;

const readNote = title => {
  const notes = loadNotes();
  const duplicatedNote = notes.find(note => note.title === title);

  if (duplicatedNote) {
    console.log(success(duplicatedNote.title));
    console.log(duplicatedNote.body);
  } else {
    console.log(error("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(header("----- List of notes -----"));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(success("New note added!"));
  } else {
    console.log(error("Note title taken!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const filterNotes = notes.filter(note => note.title !== title);
  if (filterNotes.length !== notes.length) {
    saveNotes(filterNotes);
    console.log(success("Note removed!"));
  } else {
    console.log(error("No note found!"));
  }
};

const saveNotes = notes => {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
};
