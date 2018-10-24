$(() => {
    $("#seedAuthors").on("click", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/admin/authors/seed", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
    });

})