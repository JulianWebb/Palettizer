module.exports = {
    name: "Hex",
    route: "hex",
    fileExtension: "hex",
    contentType: "application/octet-stream; charset=utf-8",
    generate(paletteData) {
        return Buffer.from(paletteData.colors.reduce(
            (accumulator, currentValue) => accumulator + currentValue + `\n`, ""))
    }
}