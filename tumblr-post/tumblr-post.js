Polymer('tumblr-post', {
  publish: {
    post: null,
    baseURL: 'http://localhost:1920/',
  },
  ready: function() {
    this.options = {
      id: this.post.id,
      reblog_key: this.post.reblog_key
    };
    this.id = this.post.reblogged_root_id || this.post.id;
    this.reblogged = false;
  },
  handleReblogResponse: function(e) {
    console.log(e);
    if( e.detail.response ) {
      var data = e.detail.response;
      console.log(data);
      this.reblogged = true;
    }
  },
  update: function() {
  },
  reblog: function() {
    this.$.reblog.go();
  }
});