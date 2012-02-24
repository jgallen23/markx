docs : README.md
	@./bin/markx --nohl README.md | cat site/layout/head.html - site/layout/foot.html > site/index.html

preview:
	@cd site && ../bin/markx --nohl --preview 8001 --head layout/head.html --foot layout/foot.html ../README.md

.PHONY: preview

