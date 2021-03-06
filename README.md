# Time tracking

The purpose of this exercise is for us to understand what kind of code you
produce when solving a challenge. We are focusing on maintainability,
your technical approach, how you map your idea into architecture and code,
and what you prioritize with the limited time.

## Process

- Timebox to ~4 hours development time.
- Commit and push milestones to your Github repo. Treat every commit as if it was going into production.
- Share a link with us when you're finished.

## Introduction

We have started a task submission platform which allows a user to submit and
view answers for tasks they are assigned to. They are sharing the submitted answers
with their managers internally. Users have to work directly inside the textarea on
the platform.

The solution works well and managers are happy to be able to see their users
submissions. After some time, managers are starting to doubt how long users take
to complete the tasks. Instead of relying on the users to report them how long
it took they want to see the numbers on the platform, when users sit down
with their managers.

## Goal

Implement an MVP that, after submitting a task, shows how long a user has been
actively working on it. Users will go through their submission with the manager,
who wants to see the submission and the time it took to complete.
Users work on tasks in multiple sessions: When the user takes a pause working on
a task and comes back later, a new session starts.

Add information to the task submission screen that shows in seconds:

- How long did it take the user to submit the task?
- In how many sessions did the user work on the task?
- How long was the user's average session for this task?

Add another screen that shows time statistics in seconds:

- How long has the user been working in total?
- On average, how long did it take the user to submit a task?
- How long is the user's average session?

## How to get started

This project contains a React app and a Ruby on Rails api.
You need to run the React app (localhost:3000) separately from the Ruby on Rails api (localhost:5000).
Follow these steps to set up the project and get started:

### React app

- Navigate into the folder `/app`
- Use the specified node version (14.17.3). E.g. if you have nvm installed run `nvm use`
- Install dependencies by running `yarn install`
- Start the dev server by running `yarn start`

### Rails api

- Navigate into the folder `/api`
- Install ruby globally
- Install the dependencies by running `bundle`
- Setup the database by running `rails db:setup`
- Start the server by running `rails s`

## Additional info

- Feel free to make own assumptions if any questions come up during the development.
- You can change the code and project structure to suit your preference.
- Users are using the latest version of Chrome/Firefox.
- Users never open two tabs at the same time.
- Users often switch between devices when starting a new session, but never use
  two devices at the same time.
- Do not use additional 3rd party libraries.

##

Developer's Notes

### What Would I Have Done With More Time?

- Unfortunately, I did not have time to add the individual user statistics page. I think this would not take much longer, but I wanted to keep to the time limit.
- Given more time, I would flesh out the functionalities for multiple users, as I've already started to. Each task would have a "submitted" property of type object rather than type boolean, with a separate boolean property associated with each user. This would allow, for example, user 0001 to have submitted a task while user 0002 has not.
- I would also implement a login/logout system so that multiple users could access the system and enter and save their responses separately. I would also require a login for a manager user who would be authorized to view all learners' data.
- Error handling isn't really accomplished in this MVP, since I'm mocking a backend. Ideally, I would have had time to mock errors or to learn Ruby well enough to build a real back end. :)
- Obviously styling is very minimal, and given a lot of time, I would have given that some more attention. But I wanted to focus on functionality first.
