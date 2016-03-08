The examples folder
===================

In this folder, you will find all the stages of development that could be completed during the
workshop.

If for some reason you lose track during the workshop, you can jump ahead to the pre-filled folder
representing the section of the workshop.

## Why are the service workers here?
It is worthy of note that the service workers are in this folder, and not in the numbered
subfolders.

This is because we are going to cache the shared CSS file also, so the service workers must be in
the same folder. We are not allowed to try and cache files that are found above the service worker
location in the folder hierarchy.
