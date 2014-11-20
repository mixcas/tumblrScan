var tumblr = {
  key : "s92lJH95YSjXKgNB4NNgu7hprgAYk9io4NxMjeDhpHzR4nSosc",
  secret: "NzijdFq67Qu2A2nI1FBtYnauqgnN1tm3UqdE1Ju3wEs7a0o7iQ"
};
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'submit form': function () {
      event.preventDefault();
      event.stopPropagation();
      var tumblrName = $('input[type="text"]').val();
      var savedPosts = [];
      $.ajax({
        type: 'GET',
        url: 'http://api.tumblr.com/v2/blog/' + tumblrName + '.tumblr.com/posts',
        data: {
          api_key: tumblr.key,
          limit: 40
        },
        success: function(resp) {
          var posts = resp.response.posts;
          for( var post in posts) {
            if (/people/i.test(posts[post].caption))
              savedPosts.push(posts[post]); 
          }
        
          debugger;
        }
      });

      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
