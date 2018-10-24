let globalData = [];
let filteredData = [];

let currentPage, currentPageSize;

$(() => {
    $("#load").on("click", async () => {
        const response = await fetch(`/api/authors`);
        globalData = await response.json();
        filteredData = globalData;
        showAuthors({ page: 0, pageSize: 20 });
    });

    $("#prev").on("click", () => {
        showAuthors({ command: "prev" });
    });

    $("#next").on("click", () => {
        showAuthors({ command: "next" });
    });

    $("#filter").on("click", () => {
        const term = $("#term").val();
        filterAuthors(term);
    })
})

// const showAuthors = (params) => {
//     const page = params.page
//     console.log("page", page);
// }

const showAuthors = ({ page, pageSize, command }) => {
    if (command === "prev") {
        page = currentPage - 1;
    }
    if (command === "next") {
        page = currentPage + 1;
    }

    pageSize = pageSize || currentPageSize;

    currentPageSize = pageSize;
    currentPage = page;

    const first = page * pageSize;
    const last = (page + 1) * pageSize;
    const authors = filteredData.slice(first, last);
    renderAuthors(authors);
}

const filterAuthors = (term) => {
    term = term.toLowerCase();
    filteredData = globalData.filter(author => author.name.toLowerCase().includes(term));
    showAuthors({page: 0});
}

const renderAuthors = (authors) => {

    $('#authors').empty().append(`<tr>
        <th> ID </th>
        <th> Name </th>
        <th> Books </th>
    </tr>`);

    for (let index = 0; index < authors.length; index++) {
        const author = authors[index];
        $('#authors tr:last').after(`<tr>
            <td>${author.id}</td>
            <td>${author.name}</td>
            <td>${author.bookCount}</td>
        </tr>`);
    }
}