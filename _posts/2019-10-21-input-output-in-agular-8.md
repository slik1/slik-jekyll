---
layout: post
title:  "Parent/Child and Input/Output demonstration in Angular 8"
date:   2019-10-16 10:21:00 -0400
categories: jekyll update
---

{% highlight javascript %}
ng g m parent
ng g c parent
ng g c parent/child
{% endhighlight %}

ng g m parent (generates a new module called parent in a folder called /parent/)
ng g c parent (generates a new component called parent in the already created folder /parent/)
ng g c parent/child (generates a new component called child in the /parent/child/ folder)


Now we have a parent module and component, and a child component within the parent folder


Let's wire all this up!


First let's add the new parent component to the exports array in the parent module so it is accessible to whichever component calls it! (parent.module.ts):

{% highlight typescript %}
@NgModule({
	declarations: [ParentComponent, ChildComponent],
	exports: [ParentComponent],
	imports: [
		CommonModule
	]
})

{% endhighlight %}










Next we want to tell our app module about our new parent module so let's edit app.module.ts:


{% highlight typescript %}
import { ParentModule } from './parent/parent.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ParentModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule{ }

{% endhighlight %}











Next let's clear out the prepopulated data in the app.component.html file and only add the selector for our parent component:



{% highlight html %}
<app-parent></app-parent>
{% endhighlight %}









Now when the app first loads, it will render the parent component


Since our parent component will be the container and the boss of all the data for its child components, let's add some data to the parent component (parent.component.ts):

{% highlight typescript %}
export class ParentComponent implements OnInit{
	
	parentData: any;

	ngOnInit(){

		this.parentData = {
			name: 'Coolness',
			description: 'This is a really cool description'
		}

	}


}
{% endhighlight %}










Great, now we have some data to share with our child component!

Let's add the child component selector to the parent template and give it an input property to pass the data from the parent into the child (parent.component.html):

{% highlight html %}
<app-child [parentData]="parentData"></app-child>
{% endhighlight %}









Now we need to give the child component an input property so it can retrieve the data passed from the parent (child.component.ts):

{% highlight typescript %}
import { Component, OnInit, Input } from '@angular/core';

export class ChildComponent implements OnInit {
	
	@Input() parentData: any;

}
{% endhighlight %}





Let's actually use some of the data to display in the child component by editing the child.component.html template:
{% highlight html %}
<h1>{{ parentData.name }}</h1>
<p>{{ parentData.description }}</p>
{% endhighlight %}





So now if we save and load the page, we will see the data passed from the parent to the child and rendering in the child.component.html file!


Awesome!

That's how an @Input() property works to pass data down into a child component














---------------- @Output() example ---------------------------------------------------------------



Let's check out how to pass data back up from the child to the parent component using an @Output() property on the child


So first let's edit the child.component.ts file to give it an output property and assign that to an event emitter:



import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class ChildComponent implements OnInit {
	
	@Input() parentData: any;
	@Output() childData = new EventEmitter<any>();


	emitData(){
		this.parentData.name = 'Super Cool';
		this.childData.emit(this.parentData);
	}



}



So now, whenever the method emitData() is called from within the child.component.html template, it will emit data back up to the parent component.










Let's bind that very method to a button click within the child component. (child.component.html):

<h1>{{ parentData.name }}</h1>
<p>{{ parentData.description }}</p>

<button (click)="emitData()">Change name</button>









And also update the parent.component.html to subscribe to the output property of the child component. Then we can see that data here will change from an output property change on the child component:

This text is part of parent.component.html: <br>
{{ parent.name }}

<br>

This text is part of child.component.html: <br>
<app-child [parentData]="parentData" (emitData)="childChanged($event)"></app-child>

So when the emitData function is fired on the child component, we call a function in the parent component to respond to the emitted event! We must pass in the $event object into the parent's function that is responding to the child event to get to the data emitted.







Update parent.component.ts to add the function to respond to the child event that is emitted:

childChanged(parentData: any){
	this.parentData = parentData;
}


Boom! A very basic example of using @Input() and @Output() properties to pass data between parent and child components in Angular 8!


