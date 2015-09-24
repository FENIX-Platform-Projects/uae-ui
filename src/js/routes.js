/*global define*/
define(function () {
    'use strict';

    // The routes for the application. This module returns a function.
    // `match` is match method of the Router
    return function (match) {
        match('', 'home#show');
        match('home', 'home#show');
        match('download/indicator', 'download-indicator#show');
        match('download/country', 'download-country#show');
        match('country', 'country#show');
        match('modules', 'modules#show');
        match('standards(/)(:id)', 'standards#show');
        match('about', 'about#show');
        match('upload', 'upload#show');
        match('*anything', '404#show');
    };
});
