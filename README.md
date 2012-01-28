# markx

### markdown + syntax highlighting => html

Markx is a command line tool for node.js to convert markdown and code into html.  It also has the ability to preview your markdown files live with auto refresh.

##Install

	npm install -g markx

##Usage

	Usage: markx [file]

	Options:

		-h, --help            output usage information
		-V, --version         output the version number
		-l, --lang <lang>     Language for syntax highlighting (default: auto)
		-p, --preview <port>  Start a server to get a live preview

	Examples:

		# convert markdown and code blocks to html
		$ markx blog.md > blog.html

		# convert markdown and specific language code blocks to html
		$ markx --lang javascript blog.md > blog.html

		# live preview of your markdown file
		$ markx --lang javascript --preview 8001 blog.md

##CSS for Syntax Highlighter

[Here](https://github.com/jgallen23/highlight.js/tree/master/src/styles) are some css files that will style the code blocks. 
