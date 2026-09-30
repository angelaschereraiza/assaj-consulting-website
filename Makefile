.PHONY: deploy_test serve

deploy_test:
	rsync -av --delete --exclude '.git' . aiza.ch:/var/www/test.aiza.ch/

serve:
	browser-sync start --server --files "*.html" "*.css" "*.js" "images/*"
