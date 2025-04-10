.DEFAULT_GOAL := default
CORE_BABEL_ARGS := --copy-files

public/:
	mkdir public/

build: public/
	babel $(CORE_BABEL_ARGS) ${BABEL_ARGS} --out-dir public/ src/

dev:
	./watch

clean:
	rm -rf public/

default: public/ build
