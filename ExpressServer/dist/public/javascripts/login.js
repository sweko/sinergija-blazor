$(() => {
    $("#login").on("click", async () => {
        const user = $("#user").val();
        const pass = $("#pass").val();

        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                user, 
                pass
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.auth) {
            localStorage.setItem("token", data.token);
        }
    });
})