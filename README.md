# Gheith Result Visualizer

This is a simple application that helps interpret results for Professor Gheith's CS 439 class.

## How to use:

A live demo is available [here](http://sudoku.kirbyquerby.me/gheith/gheith.html).

Alternatively, you can run the app yourself just by cloning it and serving the
files in `public` on an http server. The app only needs the json data from
Professor Gheith's website to run.


## Current Features:
* Filter out test cases that nobody is passing
* Search for commit by ID
* Access test cases
* Expand a commit to see exactly which test cases are failing

## Planned features:
* Highlight row/column mouse is hovering over
* Retrieve live data (right now using a snapshot of existing results because modern browsers block cross-site requests)
* Allow users to select which project to pull results for