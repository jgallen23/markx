# markx

markx converts markdown with code snippets into html.  It also has options to pass in a template file and data.  It is great for building github pages and creating blog posts from markdown files.

##Installation

Inside a project:
```
npm install markx --save
```
Globally:
```
npm install markx -g
```

##CLI Usage

```
markx input.md [opts]
```

Options:
```
Options:
  -t, --template   HTML template file                                        
  -l, --highlight  Enable or disable syntax highlighting 
  -d, --data       JSON|YAML data file that gets passed to input and template
  -h, --help       Show help info  
```

##API Usage

```javascript
var markx = require('markx');

markx({
	input: 'input.md', //can be either a filepath or a source string
	template: 'layout.html', //can either be filepath or source string
	highlight: true, //parse code snippets for syntax highlighters, default: true
	data: {} //data that gets passed into template
}, function(err, html) {
});
```

##Example

###Command
```
markx.js readme-example.md --template readme-example-template.html --data readme-example.json 
```

###Markdown
<pre>
#This is a heading

This is a paragraph

```javascript
var a = '123';
var f = function() {
	return 4;
}
```
</pre>

###Template
```html
<!DOCTYPE html>
<html lang="en">
  <meta charset="utf-8" />
  <head>
    <title><%= pageTitle %></title>
  </head>
  <body>
    <header>Logo</header>
    <section>
      <%- body %>
    </section>
    <footer>Footer</footer>
  </body>
</html>
```

###Data
```javascript
{
  "pageTitle": "This is the page title"
}
```

###Output
```html
<!DOCTYPE html>
<html lang="en">
  <meta charset="utf-8" />
  <head>
    <title>This is the page title</title>
  </head>
  <body>
    <header>Logo</header>
    <section>
      <h1>This is a heading</h1>
<p>This is a paragraph

</p>
<pre><code class="lang-javascript"><span class="keyword">var</span> a = <span class="string">'123'</span>;
<span class="keyword">var</span> f = <span class="keyword">function</span>() {
    <span class="keyword">return</span> <span class="number">4</span>;
}</code></pre>

    </section>
    <footer>Footer</footer>
  </body>
</html>
```
##History

[View History](https://github.com/jgallen23/markx/blob/master/HISTORY.md)

##Development and Tests

```
npm install
./node_modules/.bin/grunt
```
