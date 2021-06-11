---
layout: post
title:  "React Basics - Data Flow"
date:   2021-06-11 16:00:00 -0400
categories: react basics props
---

React is the last of the big 3 (Angular, Vue, React) that I just haven't really had a chance to play with. In this post I go through the basics of one-way data flow.

This post just goes through how to pass props and functions from a parent to child function component in React.

*The code examples are based on a Pluralsight tutorial I'm learning from, and take place in the playground sandbox at jscomplete.com*

## Flow data from parent to child 


The following code snippet shows what it looks like (in the jsComplete playground at least) to have a parent function component named 'App' that contains a 'Button' and 'Display' component. 


{% highlight jsx %}
function Button(props){
  return(
    <button onClick={props.onClickFunction}>
    +1
    </button>
  );
}


function Display(props){
  return (
    <div>{props.message}</div>
  );
}


function App(){
  const [stateObject, updaterFunction] = useState(0);
  const incrementCounter = () => updaterFunction(stateObject+1);
  return(
    <div>
      <Button onClickFunction={incrementCounter}/>
      <Display message={stateObject}/>
    </div>
  );
}


ReactDOM.render(
<App />,
  document.getElementById('mountNode'),
);

{% endhighlight %}




In the App component, we use a state object with React's special function named useState() which returns two things:

<ul>
  <li>state object (getter)</li>
  <li>updater function (setter)</li>
</ul>

<br/>

We're setting the initial value of the state object to a number by passing in the zero to it. Then we assign the results to constants using array destructuring. One for the state object, and the other for the updater function.

The last constant we are settings is the incrementCounter which uses the updater function, passes in the state object (which we initially set to zero) and addes 1 to the value.



<h3>Explanation</h3>

Okay now the fun stuff. 

We are passing data from the App component (parent) to the Display component (child).

The data is coming from the stateObject returned from useState(0), so the initial data value is zero.

{% highlight jsx %}
  const [stateObject, updaterFunction] = useState(0);
{% endhighlight %}

When we refernece the <Display> JSX element inside the parent App component, we are binding the value of stateObject to a prop we created called 'message' which we will be able to reference now from within the Display function declaration. 

{% highlight jsx %}
  <Display message={stateObject}/>
{% endhighlight %}


We use interpolation with curley braces {} and access the passed in props object, then the message key within that object. This equates to this: {props.message} inside the return statement within the Display component declaration.

{% highlight jsx %}
function Display(props){
  return (
    <div>{props.message}</div>
  );
}
{% endhighlight %}

Mind blown yet?!


<br>


## Flow behavior from parent to child

Let's now pass some behavior from a parent component to a child component, which will also be able to be accessed via the props object that gets passed into every function component declaration. (Whether you use that props object or not!)

First, take another look at the parent component (App):

{% highlight jsx %}

function App(){
  const [stateObject, updaterFunction] = useState(0);
  const incrementCounter = () => updaterFunction(stateObject+1);
  return(
    <div>
      <Button onClickFunction={incrementCounter}/>
      <Display message={stateObject}/>
    </div>
  );
}

{% endhighlight %}

In the parent component, when we call the Button JSX element, we create a prop called onClickFunction and bind that to the incrementCounter function we created in the parent component thus passing that behavior down into the child Button component where it can then use it.

 <br/>

Look at the Button function component again:

{% highlight jsx %}
function Button(props){
  return(
    <button onClick={props.onClickFunction}>
    +1
    </button>
  );
}
{% endhighlight %}


In the function that is declaring the Button component, we take in that prop of onClickFunction and assign it to the click handler of onClick.

Whoa.

With React, the DOM just reacts to state change like butter.