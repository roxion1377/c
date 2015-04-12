Polymer('tumblr-posts', {
  publish: {
    baseURL: 'http://localhost:1920/',
  },
  ready: function() {
    this.posts = [];
    this.lower_options = {
      limit: 20,
      type: 'photo',
      reblog_info: true,
      notes_info: false
    };
    this.upper_options = {
      limit: 20,
      type: 'photo',
      reblog_info: true,
      notes_info: false
    };
    this.loadMore();
  },
  handleLowerDashboardResponse: function(e) {
    console.log(e);
    var data = e.detail.response;
    console.log(data);
    var new_posts = data.posts;
    if( new_posts.length > 0 ) {
      this.posts = this.posts.concat(new_posts);
      this.lower_options.before_id = new_posts[new_posts.length-1].id;
    }
    console.log(this.lower_options);
    this.$.posts_threshold.clearLower();
  },
  handleUpperDashboardResponse: function(e) {
    console.log(e);
    var data = e.detail.response;
    console.log(data);
    var new_posts = data.posts;
    this.posts = new_posts.concat(this.posts);
    if( new_posts.length > 0 ) {
      this.upper_options.after_id = new_posts[0].id;
    }
    console.log(this.uppwer_options);
    this.$.posts_threshold.clearUpper();
  },
  update: function() {
    console.log("update");
    this.$.upperposts.go();
  },
  loadMore: function() {
    console.log("loadMore");
    this.$.lowerposts.go();
  }
});