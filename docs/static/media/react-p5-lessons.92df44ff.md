# React + P5

Well I'm going to say it was very fun, but sometimes tiresome to get these two to work. I had a p5 project I wrote in 2018 (https://github.com/renecouto/spring-mass-system), written in pre-es6 js, using an old version of p5....

And I wanted to integrate it into reneland, and so I did. The most tricky thing was working around the `this` keyword from javascript. I don't fully know what happened there. Maybe related to https://stackoverflow.com/questions/47957741/reactjs-bindthis. So I get why the react-p5 documentation used react function components instead of class components.

The most surprising thing to me, though, is that the apis still work. I called the same functions I did in 2018, with 0 errors :)). Check the experiments page to see the results (still some work in progress).