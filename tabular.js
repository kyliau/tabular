function tabularize(text, delimiter) {
    if (!delimiter) {
        throw new Error("delimiter not specified");
    }

    const lines = text
    .split("\n")
    .map(line => line.split(delimiter).map((word, index) => {
        // we want to keep the indentation at the very beginning of the line
        return index ? word.trim() : word.trimRight();
    }));

    const maxWords = Math.max.apply(null, lines.map(line => line.length));

    // loop through each column
    for (let i = 0; i < maxWords - 1; ++i) {
        // figure out the max length for the entire column
        const maxLength = Math.max.apply(null, lines.map(line => {
            return i < line.length ? line[i].length : 0;
        }));
        // append space(s) to words that have length shorter than 'maxLength'
        for (let j = 0; j < lines.length; ++j) {
            if (i < lines[j].length) {
                const word = lines[j][i];
                lines[j][i] = word + " ".repeat(maxLength - word.length);
            }
        }
    }

    return lines.map(line => line.join(" " + delimiter + " ")).join("\n");
}

exports.tabularize = tabularize;