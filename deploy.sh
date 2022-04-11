#!/bin/bash

npm run build
rsync -vzcr --block-size=4K ./dist/ root@188.166.2.230:/var/www/story_editor