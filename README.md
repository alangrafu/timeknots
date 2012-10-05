timeknots
=========

Minimalist timeline in javascript


General Options
===============

* `w`: width of the visualization (default: 600px)
* `h`: height of the visualization (default: 200px)
* `radius`: radius of the knots (default: 10px)
* `lineWidth`: width of the lines used to draw timeknots (default: 4px)
* `color`: color used for the visualization (default: "#999")
* `background`: Background color of the visualization (default: "#FFF")
* `dateFormat`: Format of the dates displayed (default: "%Y/%m/%d %H:%M:%S")
* `horizontalLayout`: orientation in which the timeknots will be displayed horizontal or vertical (default: true),
* `showLabels`: Include labels showing the first and last dates (default: false)
* `labelFormat`: Format used to display the dates in the labels (default: "%Y/%m/%d %H:%M:%S")


Knot options
============

It is possible to include or override certain options for particular knots. These options are

* `img`: Include the image in this URL when the tooltip is displayed
* `radius`: Draw this knot with this particular radius
* `color`: Draw this knot using this particular color
* `lineWidth`: Draw thiw knot using this particular line width
* `background`: Draw thiw knot using this particular background


Examples
========

A set of example can be found at [http://graves.cl/timeknots/example/index.html](http://graves.cl/timeknots/example/index.html) 
