# Interview Scheduler
The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

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

## Running cypress Test Framework

```sh
npm run test:server (from the scheduler api directory)
```
npm run cypress (from scheduler root directory)

## Dependencies

- react
- react-dom
- classnames
- normalize.css
- @babel/core
- @testing-library/jest-dom
- @storybook/react
- node-sass
- axios
- @testing-library/react-hooks
- react-test-renderer
- prop-types

## Screenshots

!["screenshot of scheduler home page"](https://github.com/imansawi/scheduler/blob/master/public/images/scheduler-home-page.png)
!["screenshot of create an appointment"](https://github.com/imansawi/scheduler/blob/master/public/images/create-appointment.png)
!["screenshot of edit an appointment"](https://github.com/imansawi/scheduler/blob/master/public/images/edit-appointment.png)
!["screenshot of delete an appointment"](https://github.com/imansawi/scheduler/blob/master/public/images/delete-appointment.png)