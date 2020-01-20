To launch the server, you can download the zip format or clone it locally using:
```
$ git clone git@github.com:slim-hmidi/users-demo.git

```
Then access the folder `users-demo`:
```
$ cd ./users-demo

```

Then install the packages:
```
npm install

```
Before starting the server, you need to fill the database:
```
mongoimport.exe --jsonArray --db=devDb --collection=users --file=${path}/seeds/users.json
```

To start the server, you just execute this instruction:

```
npm start

```
If you want to check the tests:
```
npm test

```
