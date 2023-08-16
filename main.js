const add = document.querySelector('.add-note');
const row = document.querySelector('.row');
let c1 = 1;

// Load existing notes from local storage
for (let i = 1; i <= localStorage.length; i++) {
    const noteData = JSON.parse(localStorage.getItem(`note${i}`));
    if (noteData) {
        createNote(i, noteData.title, noteData.content);
        c1 = i + 1;
    }
}

add.addEventListener('click', () => {
    createNote(c1);
    c1++;
});

function createNote(count, savedTitle = '', savedContent = '') {
    const card = document.createElement('div');
    card.setAttribute('style', 'width: 20rem;');
    card.className = `${count} card bg-primary text-white flex-row justify-content-evenly m-3`;
    const body = document.createElement('div');
    body.className = 'card-body text-center ms-3';
    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.setAttribute('maxlength', '25');
    title.setAttribute('placeholder', 'Write Heading');
    title.setAttribute('style', 'border:none;');
    title.className = 'h5 card-title bg-primary text-center';
    const content = document.createElement('textarea');
    content.setAttribute('style', 'border:none;');
    content.setAttribute('placeholder', 'Write Note');
    content.setAttribute('spellcheck', 'false');
    content.setAttribute('rows', '10');
    content.setAttribute('cols', '50');
    content.setAttribute('maxlength', '295');
    content.className = 'card-text text-center bg-primary';
    const icon = document.createElement('i');
    icon.className = 'icon fa-solid fa-xmark mt-3 me-3';

    // Set saved title and content if available
    title.value = savedTitle;
    content.value = savedContent;

    body.appendChild(title);
    body.appendChild(content);
    card.appendChild(body);
    card.appendChild(icon);
    row.appendChild(card);
}

document.addEventListener('change', (e) => {
    const target = e.target.closest('.card');
    if (target) {
        const count = target.classList[0];
        const title = target.querySelector('input').value;
        const content = target.querySelector('textarea').value;
        const noteData = { title, content };
        localStorage.setItem(`note${count}`, JSON.stringify(noteData));
    }
});

document.addEventListener('click', (e) => {
    const target = e.target.closest('.icon');
    const parent = target.parentNode;
    if (target) {
        const count = parent.classList[0];
        localStorage.removeItem(`note${count}`);
        row.removeChild(parent);
    }
});