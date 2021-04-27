module.exports = {
    name: "PaintDotNet",
    route: "pdn",
    fileExtension: "txt",
    contentType: "text/plain; charset=UTF-8",
    generate(paletteData) {
        let colors = paletteData.colors.reduce((accumulator, currentValue, index) => {
            return accumulator + `FF${currentValue.toUpperCase()}\n`
        }, "");

        let paletteText = 
            "; Paint.net Palette File \n" +
            `; ${paletteData.name? `Pallete Name: ${paletteData.name}`: ''} \n` +
            `; ${paletteData.description? `Description: ${paletteData.description}`: ''} \n` +
            `; Colors: ${paletteData.colors.length} \n` + colors;

        return Buffer.from(paletteText);
    }
}