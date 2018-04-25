# JSON to SQL converter

Your tech lead has just given you a task to __write a Node program that converts JSON into SQL__. The goal with this program is to translate every item in an array in a JSON file into individual `INSERT` statements, so that those items can be seeded into your SQL database. 

The first use case is to convert a JSON object that contains an array of country objects (with country name and country code key-value pairs) into SQL so that they can be seeded into the `countries` table in your app database.

For a start, this program just needs to print all the corresponding SQL `INSERT` statements to the Terminal. We can then copy and paste those into an empty `.sql` file afterwards and run it for seeding.

For example, running this in Terminal...

```
$ node converter-program.js
```

... should convert this:

```json
{
    "countries": [
        {"name": "Afghanistan", "code": "AF"},
        {"name": "Åland Islands", "code": "AX"},
        {"name": "Albania", "code": "AL"}
        // ...
    ]
}
```

... to this:

```sql
-- printed in Terminal
INSERT INTO countries
(name, code)
VALUES
('Afghanistan','AF');

INSERT INTO countries
(name, code)
VALUES
('Åland Islands','AX');

INSERT INTO countries
(name, code)
VALUES
('Albania','AL');
```

## Further - save to a file

Your team is growing and your tech lead wants you to __improve your program so that it saves the output into a `countries.sql` file__ instead of printing it in Terminal. This helps every developer take one less step (having to copy-paste into an empty file) to seed the result into the database.

Hint: Node has an inbuilt module that handles reading and writing of data into files. It should be relatively easy to google for it!

## Further - specify an input file

Marketing has just spent a bunch of money acquiring a large dataset of customers and emails (not included in this repo), and it came in JSON format. They want to seed them into the `customers` table in your database.

So now, your tech lead wants you to __generalise your program__ by allowing it to take in arguments from the command line to allow a user to specify: 

- the JSON file that needs to be converted
- the name of the database table to be inserted into

The new program signature should be:

```
$ node converter-program.js <json_filename> <db_tablename>

# example
$ node converter-program.js customers.json customers
```

The output should be a `output.sql` file that should contain the correct table name:

```sql
INSERT INTO customers
(first_name, last_name, email)
VALUES
('Joseph','Gordon', 'levitt@example.com');
```

Hint: You can use the external module [`jsonfile`](https://www.npmjs.com/package/jsonfile) to read/write JSON files (run `yarn add jsonfile` or `npm install jsonfile`). 