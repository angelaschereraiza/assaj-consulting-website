.PHONY: deploy_test serve

deploy_test:
	rsync -av --delete --exclude '.git' -e "ssh -p 17022" . aiza.ch:test/htdocs/

serve:
	browser-sync start --server --files "*.html" "*.css" "*.js" "images/*"
