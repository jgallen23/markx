# markx

markx converts markdown with code snippets into html.  It also has options to pass in a template file and data.  It is great for building github pages and creating blog posts from markdown files.

##Installation

```
npm install markx
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

###Output
<pre>
&lt;h1&gt;This is a heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph

&lt;/p&gt;
&lt;pre&gt;&lt;code class="lang-javascript"&gt;&lt;span class="keyword"&gt;var&lt;/span&gt; a = &lt;span class="string"&gt;'123'&lt;/span&gt;;
&lt;span class="keyword"&gt;var&lt;/span&gt; f = &lt;span class="keyword"&gt;function&lt;/span&gt;() {
	    &lt;span class="keyword"&gt;return&lt;/span&gt; &lt;span class="number"&gt;4&lt;/span&gt;;
}&lt;/code&gt;&lt;/pre&gt;
</pre>

##History

[View History](https://github.com/jgallen23/markx/blob/master/HISTORY.md)
