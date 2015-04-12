
  Polymer('core-image',{
    
    publish: {

      /**
       * The URL of an image.
       *
       * @attribute src
       * @type string
       * @default null
       */
      src: null,

      /**
       * When false, the image is prevented from loading and any placeholder is
       * shown.  This may be useful when a binding to the src property is known to
       * be invalid, to prevent 404 requests.
       *
       * @attribute load
       * @type boolean
       * @default true
       */
      load: true,

      /**
       * Sets a sizing option for the image.  Valid values are `contain` (full 
       * aspect ratio of the image is contained within the element and 
       * letterboxed) or `cover` (image is cropped in order to fully cover the
       * bounds of the element), or `null` (default: image takes natural size).
       *
       * @attribute sizing
       * @type string
       * @default null
       */
      sizing: null,

      /**
       * When a sizing option is uzed (`cover` or `contain`), this determines
       * how the image is aligned within the element bounds.
       *
       * @attribute position
       * @type string
       * @default 'center'
       */
      position: 'center',

      /**
       * When `true`, any change to the `src` property will cause the `placeholder`
       * image to be shown until the 
       *
       * @attribute preload
       * @type boolean
       * @default false
       */
      preload: false,

      /**
       * This image will be used as a background/placeholder until the src image has
       * loaded.  Use of a data-URI for placeholder is encouraged for instant rendering.
       *
       * @attribute placeholder
       * @type string
       * @default null
       */
      placeholder: null,

      /**
       * When `preload` is true, setting `fade` to true will cause the image to
       * fade into place.
       *
       * @attribute fade
       * @type boolean
       * @default false
       */
      fade: false,

      /**
       * Read-only value that tracks the loading state of the image when the `preload`
       * option is used.
       *
       * @attribute loading
       * @type boolean
       * @default false
       */
      loading: false,

      /**
       * Can be used to set the width of image (e.g. via binding); size may also be
       * set via CSS.
       *
       * @attribute width
       * @type number
       * @default null
       */
      width: null,

      /**
       * Can be used to set the height of image (e.g. via binding); size may also be
       * set via CSS.
       *
       * @attribute height
       * @type number
       * @default null
       */
      height: null

    },

    observe: {
      'preload color sizing position src fade': 'update'
    },

    widthChanged: function() {
      this.style.width = isNaN(this.width) ? this.width : this.width + 'px';
    },

    heightChanged: function() {
      if( this.height === 'auto' ) {
        this.style.height = 'auto';
      } else {
        this.style.height = isNaN(this.height) ? this.height : this.height + 'px';
      }
    },
	
    update: function() {
      this.style.backgroundSize = this.sizing;
      this.style.backgroundPosition = this.sizing ? this.position : null;
      this.style.backgroundRepeat = this.sizing ? 'no-repeat' : null;
      if (this.preload) {
        if (this.fade) {
          if (!this._placeholderEl) {
            this._placeholderEl = this.shadowRoot.querySelector('#placeholder');
          }
          this._placeholderEl.style.backgroundSize = this.sizing;
          this._placeholderEl.style.backgroundPosition = this.sizing ? this.position : null;
          this._placeholderEl.style.backgroundRepeat = this.sizing ? 'no-repeat' : null;
          this._placeholderEl.classList.remove('fadein');
          // this._placeholderEl.style.backgroundImage = (this.load && this.placeholder) ? 'url(' + this.placeholder + ')': null;
          _setBackground(this.placeholder,this._placeholderEl);
          // this._placeholderEl.style.backgroundImage = (this.load && this.placeholder) ? 'url(' + this.placeholder + ')': null;
        } else {
          this._setSrc(this.placeholder);
        }
        if (this.load && this.src) {
          var img = new Image();
          this._setImageSrc(this.src,img);
          // img.src = this.src;
          this.loading = true;
          img.onload = function() {
            this._setSrc(this.src);
            this.loading = false;
            if (this.fade) {
              this._placeholderEl.classList.add('fadein');
            }
          }.bind(this);
        }
      } else {
		//console.log("iei");
        this._setSrc(this.src);
      }
    },

    _setImageSrc: function(src,elem) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
          this.src=window.URL.createObjectURL(xhr.response);
        }.bind(elem);
        xhr.send();
    },

    _setBackground: function(src,elem) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
          this.style.backgroundImage='url('+window.URL.createObjectURL(xhr.response)+')';
        }.bind(elem);
        xhr.send();
    },

	_setSrcTo: function(src,elem) {
		if( src[0] == 'h' ) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				if (this.sizing) {
					this.style.backgroundImage='url('+window.URL.createObjectURL(xhr.response)+')';
				} else {
					this.$.img.src=window.URL.createObjectURL(xhr.response);
				}
			}.bind(elem);
			xhr.send();
		} else if(src.startsWith("data:image/")) {
      this.$.img.src=src;
    }
	},

    _setSrc: function(src) {
		//console.log(src);
		this._setSrcTo(src,this);
    }

  });