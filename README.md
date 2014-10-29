# Bank sort code script

A script to parse a text file containing Ghanaian bank sort codes copied from  `Bank Branch Sort Codes May 2014.pdf` and generate a CSV file.

## Usage

```bash
$ node sortcodes.js <source file> <output file (optional)>
```

## Output format

`Bank Code`,`Sort Code`,`Bank,Branch`,`Sort Code Component (Bank)`,`Sort Code Component (Clearing Zone)`, `Sort Code Component (Branch)`