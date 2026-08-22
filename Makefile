dev:
	npx webpack-dev-server

install:
	npm install

build:
	NODE_OPTIONS=--openssl-legacy-provider NODE_ENV=production npx webpack

lint:
	npx eslint .

fix:
	eslint . --fix

webpack:
	npx webpack

deploy:
	vercel
