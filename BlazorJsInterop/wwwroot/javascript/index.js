window.increment = (number) => {
    const result = number + 1;
    console.log(`Incrementing in JavaScript, from ${number} to ${result}`);
    return result;
};


window.colorNegatives = () => {

    return 3;
}

const jsfunction = () => {

    console.log("Coloring degrees according to temperature");

    for (const item of document.querySelectorAll(".temp-celsius")) {
        const temperature = Number(item.innerHTML);
        const color = DotNet.invokeMethod('BlazorJsInterop', 'GetColor', temperature);
        item.style.color = color;
    }

    return true;
};