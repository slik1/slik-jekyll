---
layout: post
title:  "Intro to Fabric.js Canvas Framework"
date:   2019-10-28 12:12:00 -0400
categories: fabric.js JavaScript
---

I started looking into Fabric.js awhile ago as a solution for a web app to allow plotting points onto a user-submitted image. After researching the topic, it seems to be the best solution for easily manipulating an HTML5 canvas element, and things drawn onto it, in an object-oriented way. I wanted to document some of my notes while researching the documentation ( much of the following information can be found on the <a href="http://fabricjs.com">fabric.js website</a> )

<h2>So what is Fabric.js? </h2>

Well, from its website it mentions: 'It's a powerful JavaScript library that makes working with the HTML5 Canvas a breeze. Fabric provides a missing object model for canvas, as well as an SVG parser, layer of interactivity and other tools.'


<h2>Cool, so why should I use it?</h2> 

It provides a simple but powerful object model on top of native methods. It takes care of canvas state and rendering, and lets us work with "objects" directly. With native elements, we operate on context - an object representing the entire canvas bitmap. In Fabric, we operate on objects - instantiate them, change their properties, and add them to the canvas. 

Here's a list of properties available on "objects" we create on the canvas:


<h3>Positioning</h3>
<ul>
    <li>left</li>
    <li>top</li>
</ul>


<h3>Dimensions</h3>
<ul>
    <li>width</li>
    <li>height</li>
</ul>


<h3>Rendering</h3>
<ul>
    <li>fill</li>
    <li>opacity</li>
    <li>stroke</li>
    <li>strokeWidth</li>
</ul>


<h3>Scaling and Rotation</h3>
<ul>
    <li>scaleX</li>
    <li>scaleY</li>
    <li>angle</li>
</ul>


<h3>Flipping</h3>
<ul>
    <li>flipX</li>
    <li>flipY</li>
</ul>


<h3>Skewing</h3>
<ul>
    <li>skewX</li>
    <li>skewY</li>

</ul>



<h2>Heirarchy and Inheritance</h2>

Most of the objects inherit from a root <code>fabric.Object</code>.
This inheritance allows us to define methods on <code>fabric.Object</code> and share them among all child "classes".

For example, if you wanted to add some method that would be available to all fabric objects, you could do something like the following:

{% highlight javascript %}
fabric.Object.prototype.someMethod = function(){
    console.log('cool');
}

// .someMethod() is available on all fabric objects now!

var rect = new fabric.Rect();
rect.someMethod(); 

{% endhighlight %}


<h2>Canvas</h2>

We create a new canvas instance with <code>var canvas = new fabric.Canvas('c');</code> where the <code>('c')</code> refers to the DOM canvas element's ID.

The <code>fabric.Canvas</code> serves as a wrapper around the <code>&lt;canvas&gt;</code> element and is responsible for managing all of the fabric objects on that particular canvas.



<h2>Events</h2>

I'm going to skip a couple other basic topics and jump to events. Fabric provides an extensive event system, starting from low-level "mouse" events to high-level object ones.

These events allow us to tap into different moments of various actions happening on the canvas. 

Here's an example to see when the mouse was pressed:

{% highlight javascript %}

var canvas = new fabric.Canvas('c');
canvas.on('mouse:down', function(options){
    console.log(options.e.clientX, options.e.clientY);
})

{% endhighlight %}

The event handler receives an options object, which has 2 properties: 

e - original event
target - a clicked object on canvas (if any)


To be continued....