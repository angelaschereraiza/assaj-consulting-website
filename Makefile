.PHONY: deploy deploy_test serve

deploy:
	rsync -av --delete --exclude '.git' . assajconsulting.ch:/var/www/assajconsulting.ch/

deploy_test:
	rsync -av --delete --exclude '.git' . assajconsulting.ch:/var/www/test.assajconsulting.ch/

serve:
	browser-sync start --server --files "*.html" "*.css" "*.js" "images/*"