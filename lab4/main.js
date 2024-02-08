document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
});

function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const date = new Date().toLocaleString();

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let maxId = 0;

    if (notes.length > 0) {
        for (const note of notes) {
            if (note.id > maxId) {
                maxId = note.id;
            }
        }
        maxId += 1;
    } else {
        maxId = 1;
    }

const id = maxId;
    const note = { id, title, content, color, pin, date };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    clearForm();
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    sortNotes(notes);
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        if (note.pin) {
            noteElement.classList.add('pinned');
        }
        noteElement.style.backgroundColor = note.color;

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>ID: ${note.id} - ${note.date}</small>
            <button class="delete-button" onclick="deleteNote(${note.id})">×</button>
        `;

        notesList.appendChild(noteElement);
    });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}

function sortNotes(notes) {
    notes.sort((a, b) => {
        if (a.pin && !b.pin) {
            return -1;
        } else if (!a.pin && b.pin) {
            return 1;
        } else {
            return b.id - a.id;
        }
    });
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('color').value = '#ffffff';
    document.getElementById('pin').checked = false;
}
