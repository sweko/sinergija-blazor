document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add").addEventListener("click", async () => {
        const first = document.getElementById("first").valueAsNumber;
        const second = document.getElementById("second").valueAsNumber;
        const response = await fetch(`/api/add/${first}/${second}`);
        const data = await response.json();

        document.getElementById("result").innerHTML = data.result;
    })

    document.getElementById("load").addEventListener("click", async () => {
        const table = document.getElementById("authors");
        const response = await fetch(`/api/authors`);
        const data = await response.json();
        for (let index = 0; index < data.length; index++) {
            const author = data[index];
            const row = table.insertRow();
            const name = row.insertCell();
            name.innerHTML = author.name;
            const books = row.insertCell();
            books.innerHTML = author.bookCount;
        }
    });
})