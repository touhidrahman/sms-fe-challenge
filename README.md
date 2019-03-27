# SMS frontend challenge

## How to Run?

### Setup
- `git clone https://github.com/touhidrahman/sms-fe-challenge`
- `cd sms-fe-challenge`
- `npm i`

### Run
- `npm start`
- Go to `http://localhost:4200` to view the data grid
- Go to `http://localhost:4200/signup` to view the email-password confirmation page

## Things to Note

### 1.
Instead of loading the `data.json` file from disk, I have used a mock server that serves the `data.json` file as REST API at this endpoint: `http://localhost:3000/data`. For that I had to enclose the data.json contents (which is an array) within an object. So there was a slight modification to the data.json file:

#### From
```js
[
    { id: 1, city: 'A', ...},
    { id: 2, city: 'B', ...},
]
```

#### To
```js
{
    data: [
        { id: 1, city: 'A', ...},
        { id: 2, city: 'B', ...},
    ]
}
```
This was the requirement of the mock server I have used in this project ([json-server](https://github.com/typicode/json-server)).

### 2.
In the `/signup` page, the signup button does not have any functionality as the task is just about form validations. The form validations are implemented as described in the task. 
