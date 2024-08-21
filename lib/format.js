// Purpose: Contains the FORM object, which is responsible for formatting the output of the CLI.
// FORM contains two methods: writeHeader and formatRow.
const FORM = {
  // writeHeader func
  // writes the header of a table to the console
  writeHeader: (row) => {
    const header = [];
    const horizontalLineArray = [];
    let rowLength = -2;
    for (const prop in row) {
      rowLength += Number(prop.length + 2);
      header.push(prop);
      horizontalLineArray.push("-".repeat(prop.length));
    }

    const headerLine = header.join("  ");
    console.log(headerLine);
    const horizontalLine = horizontalLineArray.join("  ");
    console.log(horizontalLine);
  },

  // formatRow func
  // formats a row of a table and writes it to the console
  formatRow: (row) => {
    let rowLength = 0;
    const valuesArray = [];
    for (const prop in row) {
      rowLength += Number(prop.length);
      valuesArray.push(row[prop]);
    }
    console.log(valuesArray.join("  "));
  },
};

// export FORM object
module.exports = { FORM };
