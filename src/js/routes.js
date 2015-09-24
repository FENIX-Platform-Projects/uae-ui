/*global define*/
define(function () {
    'use strict';

    // The routes for the application. This module returns a function.
    // `match` is match method of the Router
    return function (match) {
        match('', 'home#show');
        match('home', 'home#show');
        match('profile', 'profile#show');
        match('profile/:id', 'profile#show');
        match('analysis', 'analysis#show');
        match('methods', 'methods#show');
        match('methods/:id', 'methods#show');
        match('modules', 'modules#show');
        match('*anything', '404#show');
    };
});
