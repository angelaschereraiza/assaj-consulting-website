.PHONY: deploy deploy_test serve

RSYNC_EXCLUDES = --exclude '.git/' --exclude 'templates/' --exclude '*.xcf' --exclude 'README.md' --exclude 'Makefile'

deploy:
	rsync -av --delete --delete-excluded $(RSYNC_EXCLUDES) ./ assajconsulting.ch:/var/www/assajconsulting.ch/

deploy_test:
	rsync -av --delete --delete-excluded $(RSYNC_EXCLUDES) ./ assajconsulting.ch:/var/www/test.assajconsulting.ch/

serve:
	browser-sync start --server --files "*.html" "*.css" "*.js" "images/*"
