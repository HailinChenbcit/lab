class Note {
  constructor(content = "") {
    this.content = content;
  }

  setContent(newContent) {
    this.content = newContent;
  }

  getContent() {
    return this.content;
  }
}

class Writer {
  constructor() {
    this.notes = [];
    this.notesContainer = document.getElementById("notes-container");
    this.timestampDisplay = document.getElementById("timestamp");
    this.previousSavedData = JSON.stringify(localStorage.getItem("notes")); // Store the last saved data

    this.loadNotes();
    setInterval(() => this.saveNotes(), 2000);
    document
      .getElementById("add-note-btn")
      .addEventListener("click", () => this.addNote());
  }

  loadNotes() {
    const savedNotes = JSON.parse(window.localStorage.getItem("notes")) || [];
    this.notes = savedNotes.map((noteData) => new Note(noteData.content));
    this.renderNotes();
    this.updateTimestamp();
  }

  saveNotes() {
    const notesData = JSON.stringify(
      this.notes.map((note) => ({ content: note.getContent() }))
    );

    if (notesData !== this.previousSavedData) {
      window.localStorage.setItem("notes", notesData);
      this.updateTimestamp();
      this.previousSavedData = notesData;
    }
  }

  renderNotes() {
    this.notesContainer.innerHTML = "";
    this.notes.forEach((note, index) => this.createNoteElement(note, index));
  }

  createNoteElement(note, index) {
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");

    const textarea = document.createElement("textarea");
    textarea.value = note.getContent();
    textarea.oninput = () => {
      this.notes[index].setContent(textarea.value);
      this.saveNotes();
    };

    const removeButton = document.createElement("button");
    removeButton.textContent = lab1messages.noteLabel.remove;
    removeButton.onclick = () => this.removeNote(index);

    noteContainer.appendChild(textarea);
    noteContainer.appendChild(removeButton);
    this.notesContainer.appendChild(noteContainer);
  }

  addNote() {
    const newNote = new Note();
    this.notes.push(newNote);
    this.createNoteElement(newNote, this.notes.length - 1);
    this.saveNotes();
  }

  removeNote(index) {
    this.notes.splice(index, 1);
    this.saveNotes();
    this.renderNotes();
  }

  updateTimestamp() {
    const now = new Date();
    const formattedTime =
      now.toLocaleTimeString(lab1messages.timeDisplay.language, {
        hour12: lab1messages.timeDisplay.hour12,
      }) +
      " " +
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timestampDisplay.textContent = `${formattedTime}`;
    window.localStorage.setItem(
      lab1messages.noteStorage.timeSaved,
      formattedTime
    );
  }
}

class Reader {
  constructor() {
    this.notesDisplay = document.getElementById("notes-display");
    this.timestampDisplay = document.getElementById("timestamp");

    this.retrieveNotes();
    setInterval(() => this.retrieveNotes(), 2000);
  }

  retrieveNotes() {
    const savedNotes = JSON.parse(window.localStorage.getItem("notes")) || [];
    this.notesDisplay.innerHTML = savedNotes
      .map((note) => `<div class="note">${note.content}</div>`)
      .join("");
    this.updateRetrieveTimestamp();
  }

  updateRetrieveTimestamp() {
    const now = new Date();
    const formattedTime =
      now.toLocaleTimeString(lab1messages.timeDisplay.language, {
        hour12: false,
      }) +
      " " +
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timestampDisplay.textContent = `${formattedTime}`;
  }
}

function goHome() {
  window.location.href = lab1messages.homePage.homeIndex;
}

window.onload = function () {
  if (document.getElementById("notes-container")) {
    new Writer();
  } else if (document.getElementById("notes-display")) {
    new Reader();
  }
};
