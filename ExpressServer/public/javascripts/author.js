$(async () => {
    const id = $("#id").val();
    await getAuthor(id);

    $("#load").on("click", () => loadBooks(id));
})

const getAuthor = async (id) => {
    const response = await fetch(`/api/authors/id/${id}`);
    const author = await response.json();

    $("#name").text(author.name);
    $("#bookCount").text(author.bookCount);

    if (author.books) {
        renderBooks(author.books);
    }
}

const renderBooks = (books) => {

    $('#books').empty().append(`<tr>
        <th> ID </th>
        <th> Title </th>
        <th> Year </th>
    </tr>`);

    for (let index = 0; index < books.length; index++) {
        const book = books[index];
        $('#books tr:last').after(`<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.year}</td>
        </tr>`);
    }
}

async function loadBooks(id) {
    const url = `/api/authors/${id}/books/load`;
    const response = await fetch(url);
    const books = await response.json();
    renderBooks(books);
    $("#bookCount").text(books.length);
}
