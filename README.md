# ionic-gulp-build
A set of most common build tasks required to create production version of Ionic App.

## How to use?
  - Download the `gulpfile.js` and `package.json` in Ionic project directory.

  - Install all gulp plugins using `npm install`

  - Run `gulp build-prod`.


## What's packaged?

Use below tasks in conjunction with `gulp <taskname>`.

- **`gulp build-prod`** - Creates a `www-dist` folder in current directory. This is the production ready version and contains minified CSS, JS, HTML and compressed images.

- **`gulp lint`** - Performs JS liniting on all Javscripts and outputs on console.

- **`gulp minify-css`** - Minifies files under `www/css/` and creates a minfied version.

- **`gulp compress-img`** - Compresses images in folder `www/img`

- **`gulp minify-js`** - Minifies all js files rested under `www/js` ( Angular JS files are using ngAnnotate so no worries).


Open to suggestions and issues.
