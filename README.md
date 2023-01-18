# Interview Scheduler
This web app allows the user to schedule, edit, and cancel interview blocks over a week. It was developed with React and is able to send get, put, and delete requests to a database. 

The following API is used for routing and to populate the DB: https://github.com/lighthouse-labs/scheduler-api. 

## Final Product
Book Appointments
<img src="https://github.com/anironL/scheduler/blob/master/docs/bookAppointment.gif" />

Edit and Cancel Appointments
<img src="https://github.com/anironL/scheduler/blob/master/docs/editAppointment.gif" />

<img src="https://github.com/anironL/scheduler/blob/master/docs/cancelAppointment.gif" />

## Dependencies
- Node:          12.22.12
- NPM:           5.X or above
- React:         16.9.0
- React-dom:     16.9.0
- React-scripts: 3.4.4
- Axios:         0.20.0
- classnames:    2.2.6
- normalize.css: 8.0.1
- @testing-library/react-hooks: 8.0.1

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```