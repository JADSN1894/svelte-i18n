setup:
	@rm --recursive --force node_modules package-lock.json dist 
	@npm cache clean target --force 
	@npm install
	@npm run build