docs : README.md
	@./bin/markx --nohl README.md | cat site/layout/head.html - site/layout/foot.html > site/index.html

preview:
	@./bin/markx --nohl --preview 8001 README.md

.PHONY: preview

