#!/bin/bash

## Login as heroku user
heroku login

## Create heroku application instance
heroku create

## Enable mongohq addon
heroku addons:add mongohq

## Deploy 
git push heroku master
