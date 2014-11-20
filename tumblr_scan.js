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
    },
    posts: function () {
      return Session.get('posts');
    }
  });

  Template.hello.events({
    'submit form': function () {
      var savedPosts = [];
      event.preventDefault();
      event.stopPropagation();
      var tumblrName = $('input[type="text"]').val();
      for( var i = 0; i < 10; i++) {
        $.ajax({
          type: 'GET',
          url: 'http://api.tumblr.com/v2/blog/' + tumblrName + '.tumblr.com/posts',
          data: {
            api_key: tumblr.key,
            offset: i * 20
          },
          dataType: "jsonp",
          success: function(resp) {
            var posts = resp.response.posts;
            for( var post in posts) {
              poststring = JSON.stringify(posts[post]);
              if (/          pain|pretty|sad|tears|numb|smile|scar|wound|cut|feeling|emotion|broken|scream|fight|word|death|love|loss|heart|heartbeat|teenage|emotional|help|breakup|friendship|weakness|hurt|cry|anesthesia|hate|patience|joy|hapiness|suffer|brave|battle|war|fear|shame|inside|forget|pulse|smile|confess|power/i.test(poststring)) {
                if( posts[post].type != 'audio')
                  savedPosts.push(posts[post]); 
              }
            } 
          },
          complete: function() {
            Session.set('posts', savedPosts);
          }
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
