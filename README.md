# SMS frontend challenge

### Your mission, should you choose to accept it:

1. Use the `data.json` file to create a responsive grid with headers
**city**, **start date**, **end date**, **price**, **status**, **color**.
All columns should be sortable.  
2. Above the grid, please add two date pickers to filter the object by date
range.
3. Please create a form with validation of the following fields **email**,
**password**, **confirm password**. All fields are required, password fields
have to match and at least 8 characters. If a field is not valid, highlight it
and show a corresponding message.

Though this is a small app, please pay attention to your application structure.
Host your code on github or bitbucket and include a README with instructions on
how to install and run your application.

# How to Run?

- `npm i` (Only for first time)
- `npm start`
- Go to `http://localhost:4200` to view the data grid
- Go to `http://localhost:4200/signup` to view the email-password confirmation page

# Important Things to Note

Instead of loading the `data.json` file from disk, I have used a mock server that serves the `data.json` file as REST API at this endpoint: `http://localhost:3000/data`. For that I had to enclose the data.json contents (which is an array) within an object. So there was a slight modification to the data.json file:

### From
```js
[
    { id: 1, city: 'A', ...},
    { id: 2, city: 'B', ...},
]
```

### To
```js
{
    data: [
        { id: 1, city: 'A', ...},
        { id: 2, city: 'B', ...},
    ]
}
```
This was the requirement of the mock server I have used in this project ([json-server](https://github.com/typicode/json-server)).
