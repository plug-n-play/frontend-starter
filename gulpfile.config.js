/**
  Frontend-starter

  @author Bartosz Sak, Archas
  
  https://github.com/implico/frontend-starter
  
  The MIT License (MIT)
  
  
  *******************
  Configuration file

*/

module.exports = function(dirs) {

  var config = {

    styles: {

      common: {
        sourceMaps: true,
        sourceMapsRoot: '/src/styles/',

        autoprefixer: {
          browsers: ['> 1%', 'last 3 versions', 'IE 8']
        },

        sass: {
        }
      },

      dev: {

        sass: {
          outputStyle: 'expanded'
        }
      },

      prod: {

        sourceMaps: false,

        sass: {
          outputStyle: 'compressed'
        }
      }
    },

    sprites: {

      items: [
        //you can add more items (dirs), simply add an element
        {
          imgSource: dirs.src.img + 'sprites/',
          imgDest: dirs.dist.img,
          //additional options passed to the plugin
          options: {
            imgName: 'sprites.png',
            imgPath: '../img/sprites.png',
            cssName: '_sprites.scss',
          }
        }
      ]
    },

    js: {
      common: {
        sourceMaps: true,
        sourceMapsRoot: '/src/',
        minify: false,
        concatAppVendor: true,    //if true, app.js and vendor.js are merged into app.js

        mainBowerFiles: {
          paths: {
            bowerDirectory: dirs.vendor,
            bowerrc: dirs.app + '.bowerrc',
            bowerJson: dirs.app + 'bower.json'
          },
          overrides: {},
          filter: ['**/*.js']
        },
        
        //add script filenames/globs (relative to the appropriate dirs) to be loaded first
        priority: {
          vendor: {
            beforeBower: [],  //before bower components load
            afterBower: [],   //before dirs.src.js.vendor load (you usually need this one)
          },
          app: [] //ex: ['core.js']
        }
      },

      dev: {
      },

      prod: {
        sourceMaps: false,
        minify: true
      }
    },

    views: {

      common: {
        useSwig: true,
        swig: {
          defaults: { cache: false },
          setup: function(swig) {
            swig.setDefaults({
              //set base dir
              loader: swig.loaders.fs(dirs.src.views.layouts)
            });
          },
          //variable context (data) passed to all templates
          data: {}
        }
      },

      dev: {
        swig: {

        }
      },

      prod: {
        swig: {

        }
      }
    },

    images: {
      imagemin: {
        optimizationLevel: 0,
        progressive: true,
        interlaced: true
      }
    },

    browserSync: {
      common: {
        enable: true,  //for prod, applies prod:preview

        options: {
          //tip: set to [project-name].localhost and uncomment the "open: external" option
          host: 'localhost',
          //open: 'external',
          port: 80,
          reloadOnRestart: true,
          server: {
            baseDir: dirs.dist.main
          }
        }
      },

      dev: {

      },

      prod: {
      }
    },

    clean: {
      //set to true for default config dir value, false to block deletion
      //or pass any glob pattern as an array (e.g. "styles: [dirs.dist.styles + 'style.css']" to delete only this one file)
      dist: false,       //only true/false; if true, whole dist dir is deleted
      styles: true,
      sprites: true,    //only true/false; set to false to block deletion of any generated by spritesmith SASS file in the src directory
      fonts: true,
      js: true,
      img: true,
      views: true,
      custom: true      //only true/false; set to false to block deletion of any custom dir
    }
  }

  //custom config file
  try {
    require(dirs.app + dirs.user.configFile)(config, dirs);
  }
  catch (ex) {
    console.log('Frontend-starter error: no custom config definitions file present (' + dirs.user.configFile + ').');
    process.exit(1);
  }


  return config;
}
