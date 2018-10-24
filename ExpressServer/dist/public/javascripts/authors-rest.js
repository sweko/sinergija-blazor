let options = {
    page: 0,
    pageSize: 20,
    filter: ""
};

$(() => {
    showAuthors({ page: 0, pageSize: 20 });

    $("#prev").on("click", () => {
        showAuthors({ command: "prev" });
    });

    $("#next").on("click", () => {
        showAuthors({ command: "next" });
    });

    $("#filter").on("click", () => {
        const term = $("#term").val();
        showAuthors({ page: 0, filter: term })
    })
})

const showAuthors = async ({ page, pageSize, command, filter }) => {
    if (command === "prev") {
        page = options.page - 1;
    }
    if (command === "next") {
        page = options.page + 1;
    }

    pageSize = pageSize || options.pageSize;
    filter = filter || options.filter;

    options = { page, pageSize, filter };

    const first = page * pageSize;
    const last = (page + 1) * pageSize;

    let urlBuilder = `/api/authors/${first}/${last}`;
    if (filter) {
        urlBuilder = `${urlBuilder}?search=${filter}`;
    }

    const response = await fetch(urlBuilder);
    const authors = await response.json();
    renderAuthors(authors);
};

const renderAuthors = (authors) => {

    $('#authors').empty().append(`<tr>
        <th> ID </th>
        <th> Name </th>
        <th> Books </th>
    </tr>`);

    $("#info").text(`Showing items ${authors.first} to ${authors.last} of ${authors.total}`)

    for (let index = 0; index < authors.items.length; index++) {
        const author = authors.items[index];
        $('#authors tr:last').after(`<tr>
            <td>${author.wweId}</td>
            <td><a href="/author/${author.wweId}">${author.name}</a></td>
            <td class="js-author-${author.wweId}">${author.bookCount}</td>
            <td><button data-author-id="${author.wweId}" class="js-add-book">Add Book</button></td>
            <td><button data-author-id="${author.wweId}" class="js-remove-book">Remove Book</button></td>
        </tr>`);
        $("#authors tr:last .js-add-book").on("click", async (event) => {
            const id = $(event.currentTarget).data("author-id")
            await changeBookCount(id, "add");
        });
        $("#authors tr:last .js-remove-book").on("click", async (event) => {
            const id = $(event.currentTarget).data("author-id")
            await changeBookCount(id, "remove");
        });
    }
}

async function changeBookCount(id, operation) {
    const url = `/api/authors/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
            bookCount: operation
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const authorData = await response.json();
    $(`.js-author-${id}`).text(authorData.author.bookCount);
}
