docs : README.md
	./bin/markx > docs/usage

site:
	@cd site && ../bin/markx --nohl --head layout/head.html --foot layout/foot.html ../README.md > index.html

preview:
	@cd site && ../bin/markx --nohl --preview 8001 --head layout/head.html --foot layout/foot.html ../README.md

.PHONY: preview site

