---
layout: post
title:  "Token and Cookie Authentication"
date:   2019-09-21 18:30:00 -0400
categories: drupal services api
---

This was an exercise in using the Drupal 7 Services module to expose some api endpoints to utilize in an Angular app. One particular part I was really interested in and that took me a while to finally wrap my head around had to do with user registration and authentication.

I'll go into the steps I used to use to register a new user and log in/out. 


<h2>For registering a new user:</h2>

<ol>
<li>
POST to /api/V1/user/token
    - you get a token as a response
    - use this token in the POST header object to register a new user

{% highlight javascript %}
getToken() {
    let options = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
        .post("http://personifier.dd:8083/api/V1/user/token.json", "", options)
        .subscribe(resp => {
        this.loginToken = resp["token"];
        });
}
{% endhighlight %}
</li>

<li>
POST to api/V1/user/register
    - with header containing content-type and X-CSRF-Token
    - with body object containing name, mail, and password
{% highlight javascript %}
  registerNewUser(username: string, email: string, password: string) {
    let registerInfo = {
      name: username,
      mail: email,
      pass: password
    };

    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.post(
      "http://personifier.dd:8083/api/V1/user/register",
      registerInfo,
      options
    );
  }
{% endhighlight %}


</li>


<li>You get back a new user object!</li>

</ol>

<h2>For logging in a user:</h2>


<ol>

<li>POST to /api/V1/user/token
    - you get a token as a response
    - use this token the in the POST header object to login a user
    </li>
    
<li>POST to /api/V1/user/login
    - with header containing content-type and X-CSRF-Token
    - with body object containing username and password</li>
<li>You get back a response object containing session_name, sessid, token (session) and user properties
    - use this session token from now on when making POST and PUT requests</li>
<li>Save the session token to localStorage</li>
<li>Save the session_name and sessid as separate cookies in the browser</li>
<li>When the auth service's constructor is called, it will also execute a function which checks the user's authentication status
    - Within the checkAuthStatus() function, it checks if the token is in localStorage, 
        - if it is then gets the 2 cookies we saved and passes them as one value in the POST headers as "X-Cookie", a custom header we just created and also assigned as a property of our auth service class for later use
        - if it isn't then we set the currentUser to empty and return out of the checkAuthStatus() function
</li>
<li>It's important that you also edit the CORS settings for the API server or none of this will work correctly. (The following is for a local installation)

{% highlight php %}
*|http://localhost:4200|GET,POST,DELETE,PUT,OPTIONS,HEAD|Authentication,Content-Type,Accept,X-CSRF-Token,Cookie,X-Cookie|true
#!/*||GET,POST,DELETE,PUT,OPTIONS,HEAD|Authentication,Content-Type,Accept,X-CSRF-Token,Cookie,X-Cookie|true
api/*/*||GET,POST,DELETE,PUT,OPTIONS,HEAD|Authentication,Content-Type,Accept,X-CSRF-Token,Cookie,X-Cookie|true
api/*|<mirror>|POST,PUT,GET,DELETE|Authentication,Accept,Content-Type,X-CSRF-TOKEN,X-Cookie|true
{% endhighlight %}
</li>
<li>Now when making any request to the API server from our Angular app, it will remember your session because you are passing the same session cookie in almost every request as you would if you were navigating the Drupal website itself.
</li>

