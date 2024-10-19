const http = require('http');
const express = require('express');
const userRouter = require('./routes/user.routes.js');
const eventRouter = require('./routes/event.routes.js');

const PORT = process.env.PORT || 3005;

const serverApp = express();
serverApp.set('trust proxy', true);

serverApp.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

serverApp.use(express.json());
const server = http.createServer(serverApp);
serverApp.use('/api/v1', userRouter);
serverApp.use('/api/v1', eventRouter);


server.listen(PORT, async () => {
	console.log(`Server started on PORT ${PORT}...`);
});