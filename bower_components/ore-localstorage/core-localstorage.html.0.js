

  Polymer('core-localstorage', {
    
    /**
     * Fired when a value is loaded from localStorage.
     * @event core-localstorage-load
     */
     
    /**
     * The key to the data stored in localStorage.
     *
     * @attribute name
     * @type string
     * @default null
     */
    name: '',
    
    /**
     * The data associated with the specified name.
     *
     * @attribute value
     * @type object
     * @default null
     */
    value: null,
    
    /**
     * If true, the value is stored and retrieved without JSON processing.
     *
     * @attribute useRaw
     * @type boolean
     * @default false
     */
    useRaw: false,
    
    /**
     * If true, auto save is disabled.
     *
     * @attribute autoSaveDisabled
     * @type boolean
     * @default false
     */
    autoSaveDisabled: false,
    
    valueChanged: function() {
      if (this.loaded && !this.autoSaveDisabled) {
        this.save();
      }
    },

    nameChanged: function() {
      this.load();
    },
    
    load: function() {
      chrome.storage.local.get(this.name,function(v){
        // console.log("load:",this.name," ",v);
        v = v[this.name];
        // console.log(v);
        // console.log(this);
        if (this.useRaw) {
          this.value = v;
        } else {
          // localStorage has a flaw that makes it difficult to determine
          // if a key actually exists or not (getItem returns null if the
          // key doesn't exist, which is not distinguishable from a stored
          // null value)
          // however, if not `useRaw`, an (unparsed) null value unambiguously
          // signals that there is no value in storage (a stored null value would
          // be escaped, i.e. "null")
          // in this case we save any non-null current (default) value
          if (v === null) {
            if (this.value != null) {
              this.save();
            }
          } else {
            try {
              v = JSON.parse(v);
            } catch(x) {
            }
            this.value = v;
            // console.log(v);
          }
        }
        this.loaded = true;
        this.asyncFire('core-localstorage-load');
      }.bind(this));
    },
    
    /** 
     * Saves the value to localStorage.
     *
     * @method save
     */
    save: function() {
      // console.log(this.value);
      var v = this.useRaw ? this.value : JSON.stringify(this.value);
      var h = {};
      // console.log("save:",this.name," ",v);
      h[this.name] = v;
      // console.log(v);
      chrome.storage.local.set(h);
    }
    
  });

