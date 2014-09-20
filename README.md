node-springboard
================
Node JS Library for Interacting with Springboard Retail API. Uses the [restler] (https://github.com/danwrong/restler) module as its foundation for querying the service.

[Springboard Retail](http://www.springboardretail.com) is a cloud based point-of-sale system that is well designed and highly accessible. Refer to their [API docs](http://dev.springboardretail.com) for details on API usage.

This is a work on progress. I'll be adding more methods over time.

This is my first foray into Node. Forgive the lack of tests, I'm one of "those" people.

Installing and Configuring
--------------------------
```
npm install node-springboard
```

Require the module, passing in a valid domain, user, and password. Then experience Springboard API nirvana.

```javascript
var springboard = require('node-springboard')('mydomain', 'myuser', 'mypassword');
```

Usage
-----
####Basic Example
```javascript
var springboard = require('node-springboard')('mydomain', 'myuser', 'mypassword');

springboard.getItem(100001, function(err, data, response) {
	// Check for error and handle
	if(err) {
		// Handle error
	} else {
		// Outputs JSON information returned by Springboard
		console.dir(data);
	}
});
```

####General Use
This module follows the Node callback convention of passing either null or an Error object as the first argument of the callback. See the basic example above.

All functions in this module expect a callback that accepts three parameters: _err_, _data_, and _response_.

#####Err
An Error object if there was a problem; null if not. Always check for this first in your callbacks.

#####Data
Varies based on the method call. 

Methods beginning with "create" will return a hash with a "path" and "objectId" value. For example:

```javascript
springboard.createVendor('New Vendor', {'public_id': 'NEW'}, function(err, data, response) {
	// Outputs '/api/purchasing/vendors/100002' where 100002 is the ID of the new vendor.
	console.log(data.path);
	
	// Outputs '100002' where 100002 is the ID of the new vendor.
	console.log(data.objectId);
});
```

All other methods will return the JSON object returned by the Springboard API, easily accessible through dot notation or your preferred method of data access.

#####Response
The raw response as returned by [restler](https://github.com/danwrong/restler). Refer to restler documentation for info on how to interact with this object. 

####API
As a general rule, API method signatures begin with data required by Springboard, then accept a hash parameter for other data, and finally method callback. I'm not fully sold on this design yet but it works. For now, only parameters that are not self explanatory are documented. 

#####data parameter
The data parameter in the method calls is the catch all of capturing information not necessariliy required by the API. The following example creates an item that includes some custom fields:

```javascript
springboard.createItem(1.44, {'description': 'This is my description', 'custom': {'department': '37: Hard Crafts'}}, function(err, data, response) {
	console.log(data.path);
	console.log(data.objectId);
});
```

#####createInventoryAdjustment(locationId, itemId, adjustmentReasonId, qtyAdjust, cost, data, callback)
_Note: Undocumented API method._

Creates an inventory adjustment entry.

_qtyAdjust_: The quantity adjustment to make to current on hand counts. NOT the on hand count.

#####createItem(cost, data, callback)
Creates an item. Cost is the only field required by Springboard. However, if you have custom fields that are required, you will have to provide those via the data parameter.

#####createItemVendor(itemId, vendorId, data, callback)
_Note: Undocumented API method._

Creates a vendor record for an item (sometimes called a source record).

#####createTicket(data, callback)
Creates a sales ticket.

#####createTicketLine(ticketId, data, callback)
_Note: The Springboard API does not currently provide the newly created ID for a ticket line. Not sure why_
Creates a line for a given ticket ID.

#####createVendor(name, data, callback)
Creates a vendor.

#####createVendorAddress(vendorId, city, state, country, postalCode, data, callback)
_Note: Undocumented API method_
Creates an address for a vendor. 

#####createVendorContact(vendorId, data, callback)
_Note: Undocumented API method_
Creates a contact for a vendor.

#####getGiftCard(id, callback)
Gets gift card with the given number. Springboard throws an error if the gift card is not found.

#####getInventoryValues(data, callback)
Gets inventory values. Recommend using convenience methods for retrieving inventory values for a given item ID by location.

#####getInventoryValuesByLocation(itemId, data, callback)
Gets inventory values for an item, grouped by location.

#####getItem(id, callback)
Retrieves an item based on its ID.

#####getItemVendors(id, callback)
Retrieves vendor records for a given item ID.

#####getTicket(id, callback)
Retrieves a ticket based on its ID.

#####getTicketLines(id, callback)
Retrieves ticket lines based on a ticket ID.

#####getVendor(id, callback)
Retrieves a vendor based on its ID.

#####searchItems(searchTerm, page, perPage, callback)
A basic way to query items using Springboard's standard search. Springboard has a sophisticated query system that is not yet implemented in this module.

#####searchVendors(searchTerm, page, perPage, callback)
A basic way to query vendors using Springboard's standard search. Springboard has a sophisticated query system that is not yet implemented in this module.

#####updateItem(id, data, callback)
Update an item.

#####updateVendor(id, data, callback)
Update a vendor.




