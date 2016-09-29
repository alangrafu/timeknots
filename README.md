timeknots
=========

Minimalist timeline in javascript


General Options
---------------

### Size

* `width`: width of the visualization (default: `600` pixels)
* `height`: height of the visualization (default: `200` pixels)
* `radius`: radius of the knots (default: `10` pixels)
* `lineWidth`: width of the lines used to draw timeknots (default: `4` pixels)

### Colors

* `colorTimeline`: color used for the Timeline (default: `999`)
* `colorTip`: color used for text visualization (default: `rgba(0,0,0,.5)`)
* `backgroundCircle`: Background color of the circle (default: `FFF`)
* `backgroundTip`: Background color of the tip (default: `{0,0,0,.5}`)

### Appareance

* `tipPosition`: position of the tip (default: `float`, can also be `top`)
* `dateFormat`: Format of the dates displayed (default: `%Y/%m/%d %H:%M:%S`)
* `horizontalLayout`: orientation in which the timeknots will be displayed horizontal or vertical (default: `true`),
* `showLabels`: Include labels showing the first and last dates (default: `false`)
* `labelFormat`: Format used to display the dates in the labels (default: `%Y/%m/%d %H:%M:%S`)


### Callbacks

* `onMouseOver`: callback when the mouse comes over a knot
* `onMouseOut`: callback when the mouse goes out of a knot

Callback can be specified when you use `TimeKnots.draw()`. The callback can take two parameter:

* `knot_circle` as [`d3.selection()`](https://github.com/d3/d3-selection/blob/master/README.md#selection) object
* `knot_tip` as [`d3.selection()`](https://github.com/d3/d3-selection/blob/master/README.md#selection) object

```javascript
TimeKnots.draw("#timeline1", kurbickFilms, {
  dateFormat: "%B %Y", color: "#696", width:500, showLabels: true, labelFormat: "%Y", 
  onMouseOver: function(circle, tip){console.log("you mouse overed :"+tip.text())},
  onMouseOut: function(circle, tip){console.log("you mouse out :"+tip.text())}
});
```

Knot options
------------

It is possible to include or override certain options for particular knots. These options are

* `img`: Include the image in this URL when the tooltip is displayed
* `radius`: Draw this knot with this particular radius
* `color`: Draw this knot using this particular color
* `lineWidth`: Draw thiw knot using this particular line width
* `background`: Draw thiw knot using this particular background




Examples
--------

A set of example can be found at [http://graves.cl/timeknots/example/index.html](http://graves.cl/timeknots/example/index.html) 
