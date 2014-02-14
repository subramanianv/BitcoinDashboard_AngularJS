### Coding challenge:

>Make a simple but good looking Bitcoin Dashboard that displays 3 pieces of information: the latest price in both Canadian and India currency with a timestamp!

For this task, you will also have to build a backend in Node.js (no database required). Please use Angular.js for the front-end.

This client should be polling from this backend you created. It should make only 1 call to the backend every 15 seconds. The response from that endpoint should be a JSON like this:

```javascript
{
	CAD:  float,
	INR:  float,
	time: date
}
```

The backend should read the latest BTC price from these endpoints:

- https://api.bitcoinaverage.com/ticker/global/CAD/last
- https://api.bitcoinaverage.com/ticker/global/INR/last
- ( you might see more info in this page: https://bitcoinaverage.com/api.htm )

Make your own github repo and do regular commits, branches are not required.

We will be looking for this points:

- easy intructions on how to run it (also mind package.json)
- good code practices
- it should give some indication that the value is updated periodically
- concern with user experience ( including UI )