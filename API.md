## API Explanation

### 4 Seperate End Points

1. /checkout (PUT) - The /checkout endpoint will be used for posting to the database for users checking out a vehicle. The API will be called and return the first available vehicle with the status of 'available' or return an exception if no cars are available. Improper data will not be passed to the end point because the front end will validate the data. Will change the status from 'available' to 'checkedout'
    * JSON Object Passed to it: {name: "string",email:"string",daysreq:int}
    * JSON Object Returned from it: {carid: "string",mileage:int,fuel:int}. Fuel will be 0 - Empty Tank, 1 - 1/4 Tank , 2 - Half Tank, 3 - 3/4 Tank, 4 - Full Tank
2. /findcar (GET) - The /findcar endpoint will be used for finding a car based on the user using the checkin page. The API will be called and return the vehicle with the matching ID and email address  input by the user with a status of checkedout on the checkin page. Will not change the status
3. /checkin (PUT) - The /checkin endpoint will be used for checking in a vehicle once the user approves the vehicle which was returned by the /findcar endpoint. Will  change the status from 'checkedout' to 'checkedin'.
4. /returnkey (PUT) - The /returnkey endpoint will be used for returning checked-in vehicles to the 'available' pool. Will change status from 'checkedin' to 'available'
