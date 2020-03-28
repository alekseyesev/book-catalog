# Book catalog - Full Stack App with WordPress and React

The theme is developed with WordPress as a headless CMS.
We use WordPress REST API under the hood.
Frontend connects to Backend with Server-Sent Events technology.
Frontend is built with React / Redux (redux-thunk).

## Requirements

- PHP 7.3+
- MySQL 8+
- WordPress 5+

> **IMPORTANT!** You should not use standard PHP development server, because of its limits on process count (it provides us with the only one).

## Usage

Copy the theme to themes folder and activate it in admin area.
Then change permalink structure to custom (we need to get proper paths to REST endpoint).