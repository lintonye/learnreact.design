---
draft: 'yes'
---

# Authors guide: article template

**Article title**: What is Redux: a designer's guide

**Quick summary**:
Redux: what it can do, why it does its things, what the downsides are and how it relates to design.

**Article content**:
Have you heard of Redux? What is it? No googling please!

> "Fancy backend stuff"

> "I have heard of it but I'm not aware of what it is. It's a React framework perhaps?"

> "A better way to store and manage states in a React application"

I've asked 40+ designers this question. The above are their typical answers. Many of them are aware that Redux works with React and its job is "state management".

But do you know what this "state management" really means? Do you know Redux's real power is beyond managing the state? Do you know that Redux doesn't necessarily require React to work? Do you want to join your team's discussion (or at least lunch chats) about whether to use Redux? Do you want to design with an understanding of how Redux works in mind?

That's why I wrote this post. I want to show you a full picture of Redux: what it can do, why it does its things, what the downsides are, when to use it and how it relates to design.

My goal is to help designers like you. Even if you haven't written a single line of code before, I think it's still possible and beneficial (and fun) to understand Redux. Expect plain English and doodles, no code or abstract talks.

Ready for the ride?

# What is Redux?

At a super high level, Redux is a tool that developers use to make their lives easier. As many of you might have heard, its job is "state management". I'll explain what state management means a few sections later. At this point, I'll leave you with this picture:

![Redux manages state, but in the background, there are a few hidden powers](./state_manage_power.png)

# Why should you care?

Redux is more about the inner workings of an app than its look-and-feel. It's a somewhat complex tool with a steep learning curve. Does that mean we designers should stay far away from it?

Instead, I think we should embrace it. A car designer should understand what the engine is for, right? To successfully design app interfaces, designers should also have solid knowledge about things under the hood. We should learn about what it can do, understand why developers use it, and be aware of its advantages and implications.

Because "design is not just what it looks like and feels like. Design is how it works."

# What can Redux do?

Many people use Redux to manage the state in React apps. It's the most common use case in the wild and Redux improves the aspects where React doesn't do well (yet).

However, you'll see soon that the real power of Redux goes way beyond that.

Let's get started by learning what state management really is.

## State management

If you are not sure what this "state" means, let's replace it with a more generic term, data. State is data that change from time to time. State determines what's displayed on the user interface.

What does state management mean? In general, there are three aspects of data that we'd need to manage in an app:

1.  Fetching and storing data
2.  Displaying data
3.  Changing data

Let's say we are building a Dribbble shot page. What are the data we want to display on the page? They include the author's profile photo, name, the animated gif, the number of hearts, the comments and so on.

![dribbble data](./dribbble-page-data.png)

First, we need to fetch all these data from a server in the cloud and put it somewhere. Next, we need to actually display the data. We need to assign pieces of this data to corresponding UI elements that represent what we actually see in the browser. For example, we assign the url of the profile photo to the `src` attribute of an HTML img tag:

```html
<img src="https://url/to/profile_photo" />
```

Finally, we need to handle changes to the data. For example, if a user adds a new comment to a Dribbble shot, or adds a star, we need to update the HTML accordingly.

Coordinating these three aspects of state is a big part in frontend development, and React has various degree of support for this task. Sometimes the built-in facility in React works well enough. But as the app grows more complex, its state may become harder to manage with React alone. That's why many people start using Redux as an alternative.

### Fetching and storing data

In React, we break down a UI into components. Each of these components can be broken down into smaller components (see [What is React](https://learnreact.design/2017/06/08/what-is-react?utm_source=smashing_magzine&utm_campaign=redux&utm_content=middle)).

![dribbble shot components](./dribbble-components.gif)

If our UI is structured this way, when do we fetch the data and where to store it before populating the UI?

Imagine there's a chef living in each component. Fetching data from servers is like sourcing all the ingredients needed to prepare dishes.

A naive way is to fetch and store the data where and when it's needed. This is like each chef going out to buy vegetables and meats directly from far-away farms.

![fetch and store data in components](./each_chef_buy.png)

This approach is wasteful. We'd need to call the server many times from many components, even for the same data. The chefs would waste a lot of gas and time traveling back and forth.

With Redux, we fetch data once and store it in a central place, conveniently called "store". The data is then ready for use anytime by any component. This is not unlike having a superstore nearby where our chefs can buy all the ingredients. The superstore sends trucks to carry back vegetables and meats in bulk from farms. It's a lot more efficient than asking individual chefs to go to the farms themselves!

The store also serves as the single source of truth. Components always retrieve data from the store, not from anywhere else. This keeps all the UI content consistent.

![redux central store](./redux_store.png)

### Assigning data to UI elements

With only React, there's actually a better way to fetch and store data. We can ask our very kind chef Shotwell to do the shopping for all his chef friends. He would drive a truck to the farms and carry back the goodies. We could fetch data from a container component, for example, the "Shot" component in the Dribbble example, and use that as the single source of truth.

![truck driver Shotwell](./driver-shotwell.png)

This approach is more efficient than the naive way of fetching data from every component. But how does Shotwell pass the ingredients to other chefs? How to pass the data to the components that actually render HTML elements? We pass data from outer components to inner components like the baton in a relay, all the way until the data reach the destination.

For example, the URL of the author avatar needs to be passed from "Shot", to "ShotDetail", to "Title" and finally to the '&lt;img&gt;' tag. If our chefs live in an apartment, it really looks like this:

![passing data](./floor_without_redux.png)

To deliver data to the destination, we'd have to engage all the components on the path, even if they don't need the data at all. It'd be really annoying if there are many floors!

What if the superstore does door-to-door delivery?
With Redux[^1], we can plug in any data into any component, without affecting other components at all, like so:

![plug in data](./floor_with_redux.png)

Note: in the latest version of React (16.3), there's a new "context" API that does almost the same job in terms of plugging data into components. So if this is the only reason your team is using Redux, seriously consider upgrading to React 16.3! Check out the [official document](https://reactjs.org/docs/context.html) for more information (warning: lots of code ahead).

### Changing data

Sometimes the logic of updating data in an app can be fairly complex. It might involve multiple steps that depend on one another. We may need to wait for the responses from multiple servers before updating the application state. We might need to update many places in the state at different times under different conditions.

It can be overwhelming if we don't have a good structure for all this logic. The code would be difficult to understand and maintain.

Redux allows us to divide and conquer. It provides a standard way to break data updating logic into small "reducers". Those reducers work harmoniously together to complete a complex action.

![divide into reducers](./from_spaghetti_to_reducer.png)

Keep an eye on the recent development of React, though. As with the "context" API, there might be a new "setState" API in a future version of React. It'd make it easier to break up complex update logic into smaller parts. If/When this new API becomes available, it's possible that you wouldn't need Redux anymore to manage this aspect of state management.

## The real power of Redux

So far, it seems Redux is just a band-aid for React. People use Redux to improve aspects that React doesn't do well (yet). But React is catching up quickly! In fact, Dan Abramov, the creator of Redux, joined the React core team at Facebook a couple of years ago. They have been busy working on the aforementioned improvements to React: context API (released in 16.3), better data fetching API ([demoed](https://www.youtube.com/watch?v=v6iR3Zk4oDY) in Feb 2018), a better setState API and so on.

Will it make Redux obsolete?

Guess what? **I haven't shown you the real power of Redux yet!**

![redux power, this should be related to the first redux image, only focus its real power](./other_powers.png)

Redux forces developers to follow a few strict rules, which bring Redux a lot of power (yup, the power of discipline!):

1.  All the data (application state) has to be described in clear text. You should be able to write down all the data with a pen on paper.
2.  Every action (change of data) has to be described in clear text. You must write down what you'll do before changing anything. You can't change data without leaving a mark. This process is called "dispatching an action" in Redux slang.
3.  Your code that changes data must behave like a math formula. It must return the same result given the same input. The square of 4 is always 16 no matter how many times you run it.

When you follow these rules to build apps, magic happens. It enables a lot of cool features that are otherwise difficult or expensive to implement. Here are some examples [^2].

### Undo, redo

![undo redo](./redo_undo.png)

The popular undo/redo feature requires system-level planning. Because undo/redo needs to record and replay every single change of data in the app, you must take it into account in the architecture from the very beginning. If it's done as an afterthought, it'd require changing a lot of files which is a recipe for countless bugs.

Because Redux requires every action to be described in clear text, the support for undo/redo almost comes for free. The instructions of how to implement undo/redo with Redux fit in a [simple page](https://redux.js.org/recipes/implementing-undo-history).

### Collaborative environment

![google docs](./google_docs.png)

If you are building an app similar to Google Docs where multiple users work together on a complex task, consider to use Redux. It will likely do a lot of weightlifting for you.

Redux makes it very easy to send what is happening over the network. It's straightforward to receive actions another user performs on another machine, replay the changes and merge with what's happening locally.

### Optimistic UI

![optimistic UI](./optimisticUI.png)

Optimistic UI is a way to improve the user experience of an app. It makes the app appear to respond faster over a slow network. It's a popular strategy in apps that require real-time responses, for example, a first-person shooter game.

As a simple example, in the Twitter app, when you click the heart on a tweet, it needs to request the server to do a few checkups, for example, whether that tweet still exists. Instead of waiting many seconds for the result, the app chooses to cheat! It assumes everything is OK and shows a filled heart right away.

![tweet](./tweet-heart.png)

This approach works because most of the time everything is OK. When things are not OK, the app will revert the previous UI updates and apply the actual result from the server, for example, show an error message.

Redux supports optimistic UI in the same fashion as what it does for undo and redo. It makes it easy to record, replay and revert changes of data when receiving a negative result from the server.

### Persisting and booting up from state

![persisting state](./game_save_load.png)

Redux makes it easy to save what's happening in an app in the storage. Later on, even if the computer restarts, the app can load all the data and continue from exactly the same spot, as if it's never been interrupted.

If you build a game with Redux, you'd just need a couple more lines of code to save/load the game progress, without changing the rest of the code.

### Really extensible systems

With Redux, you must "dispatch" an action to update any data in an app. This restriction makes it possible to hook into almost every aspect of what's happening in an app.

You can build really extensible apps where every function can be customized by the user. For example, check out [Hyper](https://hyper.is/#extensions-api), a terminal app built with Redux. The "hyperpower" extension adds sprinkles to the cursor and shakes up the window. How do you like this "wow" mode? (Perhaps not terribly useful but enough to impress users)

![hyper](./hyper.gif)

### Time-travel debugging

How about being able to travel in time when debugging an app? You run the app, rewind or forward a few times to find the exact place when the bug occurs, fix the bug and re-play to confirm.

Redux makes this dream of developers come true. [Redux DevTools](https://github.com/reduxjs/redux-devtools) allows you to manipulate the progress of a running app as a YouTube video -- by dragging a slider!

How does it work? Remember the three strict rules that Redux enforces? That's the secret sauce of the magic.

![time travel](./time-travel.gif)

### Automated bug reports

Imagine this. A user finds something wrong in your app and wants to report the bug. She painstakingly recalls and describes what she has done. A developer then tries to follow the steps manually to see if the bug occurs again. The bug report may be vague or inaccurate. The developer is having a hard time finding where the bug is.

Now how about this. The user clicks the "Report bug" button. The system automatically sends what she has done to the developer. The developer clicks the "Replay bug" button and watch how that bug exactly happens. The bug is squashed on the spot, everybody is happy!

This is exactly what would happen if you use [Redux Bug Reporter](https://github.com/dtschust/redux-bug-reporter). How does it work? The Redux restrictions make wonders.

![automated bug reports](./bug_reports.png)

# Downsides of Redux

The three major rules that Redux enforces are a double-edged sword. They enable powerful features, but at the same time cause inevitable downsides.

## Steep learning curve

Redux has a relatively steep learning curve. It takes time to understand, remember and get used to its patterns. It's not recommended to learn Redux and React at the same time, if they are both new to you.

## "Boilerplate" code

In many cases, using Redux means writing more code. It's often required to touch multiple files to get a simple feature working. People have been complaining about the "boilerplate" code they'd have to write with Redux.

I know, this sounds contradictory. Didn't I say Redux makes it possible to implement features with minimal code? This is a bit like using a dishwasher. First, you'd have to spend the time carefully arranging the dishes in rows. Not until then you will see the benefits of the dishwasher: saving time on actually cleaning the dishes, sanitizing the dishes etc. You have to decide whether the preparation time is worth it!

## Performance penalty

Redux could also have impact on performance due to the restrictions it enforces. It adds a little overhead every time when the data change. In most cases, it's not a big deal and the slowdown is not noticeable. But when there's a large amount of data in the store, and when the data changes frequently, for example, when the user is typing rapidly on a mobile device, the UI may become sluggish as a result.

# Bonus: Redux is NOT just for React.

A common misconception is that Redux is **for** React only. It sounds like Redux can't do anything without React. Indeed, Redux complements React in a few important ways, as we have discussed earlier. It's the most common use case.

However, in fact, Redux can work with any frontend frameworks, such as Angular, Ember.js or even jQuery, or even vanilla JavaScript. Try googling it, you'll find [this](https://github.com/angular-redux/ng-redux), [this](https://github.com/ember-redux/ember-redux), [this](https://github.com/mkamakura/redux-jquery) or even [this](https://www.sitepoint.com/redux-without-react-state-management-vanilla-javascript/). The general ideas of Redux apply anywhere!

As long as you use Redux wisely, you can get its benefits in many situations, not just in a React app.

![redux can work with many frameworks, maybe shake hands with React guy and others?](./redux-shake-hands.png)

# Conclusion

As any tool, Redux offers a tradeoff. It enables powerful features, but also has inevitable drawbacks. The job of a development team is to evaluate whether the tradeoff is worth it and make a conscious decision.

As designers, if we understand the advantages and downsides of Redux, we'll be able to contribute to this decision making from the perspective of design. For example, perhaps we could design the UI to mitigate the potential performance impact? Perhaps we could advocate the inclusion of undo/redo features to remove a boatload of confirmation dialogs? Perhaps we could suggest optimistic UI since it improves user experience with relatively low cost?

Understand the benefits and limitations of a technology, design accordingly. I think that's what Steve Jobs means by "design is how it works".

---

PS: To help you understand more about how things work, I'm preparing a series of video courses tailored for designers. Check out [learnreact.design](https://learnreact.design/?utm_source=smashing_magzine&utm_campaign=redux&utm_content=bottom)! If you prefer reading books and have a development background, check out my friend Dave Ceddia's [Pure React](https://transactions.sendowl.com/stores/9322/122434).

---

# Footnotes

[^1]:

To be absolutely accurate, it's another library called `react-redux` that hands data to React components, not Redux itself. But since react-redux just does the plumbing and people almost always use Redux and react-redux together, I think it's fine to include this as one of the benefits of Redux.

[^2]:

I collected these examples from Dan Abramov's online posts: [1](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), [2](https://dev.to/dan_abramov/react-beginner-question-thread--1i5e/comments/1n21).

## Before sending your draft, add the following information:

**Pull Quotes**:

- Do you know Redux's real power is beyond managing the state?
- As designers, if we understand the advantages and downsides of Redux, we'll be able to contribute to this decision making from the perspective of design.

**List of included images**:

Image file: state_manage_power.png
Image caption: Redux the state manager. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Redux the state manager.

Image file: dribbble-page-data.png
Image caption: Data on a Dribbble shot page
Image Alt: Data on a Dribbble shot page

Image file: dribbble-components.gif
Image caption: Dribbble shot page broken down into components
Image Alt: Dribbble shot page broken down into components

Image file: each_chef_buy.png
Image caption: The naive way: fetch data from each component. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: The naive way: fetch data from each component.

Image file: redux_store.png
Image caption: Redux as a central store of data. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Redux as a central store of data.

Image file: driver-shotwell.png
Image caption: Fetch data from the root component. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Fetch data from the root component.

Image file: floor_without_redux.png
Image caption: Pass data to components via props. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Pass data to components via props.

Image file: floor_with_redux.png
Image caption: Plug data into components with Redux. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Plug data into components with Redux.

Image file: from_spaghetti_to_reducer.png
Image caption: Divide complex logic into reducers. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Divide complex logic into reducers.

Image file: other_powers.png
Image caption: Redux' power is way beyond state management. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Redux' power is way beyond state management.

Image file: redo_undo.png
Image caption: Undo, redo. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Undo, redo.

Image file: google_docs.png
Image caption: Google Docs. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Google Docs.

Image file: optimisticUI.png
Image caption: Optimistic UI. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Optimistic UI

Image file: twitter_heart.png
Image caption: Twitter heart. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Twitter heart.

Image file: game_save_load.png
Image caption: Save/load game progress. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Save/load game progress.

Image file: hyper.gif
Image caption: The "wow" mode in Hyper, a terminal app
Image Alt: The "wow" mode in Hyper, a terminal app

Image file: time-travel.gif
Image caption: Time-travel in Redux DevTools.
Image Alt: Time-travel in Redux DevTools.

Image file: bug_reports.png
Image caption: Automated bug reports. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Automated bug reports.

Image file: work_well_with_other.png
Image caption: Redux works well with other frontend libraries. Illustration by [Beebee](https://beebeeye.github.io/)
Image Alt: Redux works well with other frontend libraries.

**Author bio**
Teaching designers React at [LearnReact.design](https://learnreact.design). Developer. Lifelong learner.

**Author photo**
Image file: linton.jpg

**Author links**
Twitter: https://twitter.com/lintonye
Web site: https://learnreact.design
