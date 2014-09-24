var Pager = function(dataFunction, dataArguments) {
	this.currentPage = 0;
	this.perPage = 100;
	this.callback = dataArguments[dataArguments.length - 1];
	dataArguments.splice(-1, 1);
	dataArguments.unshift(this.perPage);
	dataArguments.unshift(this.currentPage);
	dataArguments.push(this);
	
	this.dataArguments = dataArguments;
	this.dataFunction = dataFunction;

	this.results = new Array();
	this.nextPage();
}

Pager.prototype.nextPage = function() {
	this.currentPage++;
	this.dataArguments[0] = this.currentPage;
	this.dataFunction.apply(null, this.dataArguments);
}

Pager.prototype.processPage = function(err, data, response) {
	if(err) {
		this.callback(err);
		return;
	}

	for(i = 0; i < data.results.length; i++) {
		this.results.push(data.results[i]);
	}
	
	if(this.currentPage < data.pages) {
		// Go to next page!
		this.nextPage();
	} else {
		// Finished! Call back with results.
		this.callback(null, this.results);
	}
}

module.exports = Pager;