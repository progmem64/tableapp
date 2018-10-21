# table 

* official repo: https://github.com/progmem64/tableapp
* docs: https://progmem64.github.io/tableapp/

![Logo](./logo/logo-table.svg)

## todos 

### high priority

- [x] moderation options: delete entry
- [x] moderation options: delete comment
- [ ] screencapture module for windows / desktop-app for windows
- [x] fix: screenshots of active window not working sometimes => allow screenshots per screen (& maybe screenshot preview for presenter)
- [x] ssl: secure websocket connections
- [ ] ssl: update deployment details (with own certs)
- [x] data-tracking
- [ ] prompts & groups
- [ ] fully implement manage-event view
- [ ] automation scripts / or view for creating/removing events, etc.
- [ ] opt-in/opt-out
- [ ] save all screenshots, link them in db
- [ ] fix routing/links (entry, comment): parent-paths should wrap subpaths to manage data-subscriptions (entries/comments) [=> ability for permalinks]
- [x] sign-out


### normal priority

- [ ] moderation options: edit entry
- [ ] moderation options: edit comment
- [ ] feed sorting / filter options
- [ ] notifications (in-app/email)
- [ ] option to add tag to entry -> "discussed in lecture"
- [ ] improve (really bad atm) container/presentational component split (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [ ] add documentation for components/containers
- [ ] max character limit for comments/entries
- [ ] collapse entry content in feed if its too long => add button to "expand" / "collapse" long content
- [ ] make more than the last 3 screenshots available for use / preview other screenshots in zoomed view
- [ ] implement or remove archive option for events
- [ ] rate-limits (e.g. you can only post x new entries in x secs)
- [ ] ability to ban or temp-ban users
- [ ] optimize entry virtualisation
- [ ] virtualize comment section
- [ ] optimize design, especially for desktop
- [ ] use Flow typechecking (https://flow.org)
- [ ] maybe? replace listsubscription with update notifications for events
- [ ] backend: better error handling


### low priority

- [ ] update icons/favicons
- [ ] electron app icon & title
- [ ] screencapture module for linux / desktop-app for linux
- [ ] polls / quizzes
- [ ] integrate with tuc course catalog
- [ ] comment-section: add person-tracking for anonymous comments (@1, @2, ...)


## documentation

### view

visit: https://progmem64.github.io/tableapp/

**or:**

* serve docs folder via local webserver
* install docsify and run `docsify serve docs`

### build / generate

In order to be able to generate the docs you need to install:

* node.js (npm)
* jsdoc-to-markdown - globally via npm: `npm install -g jsdoc-to-markdown`

Afterwars docs can be generated by executing `python3 generate-docs.py`.