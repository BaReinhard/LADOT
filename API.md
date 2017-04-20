## API Explanation

### 4 Seperate End Points

1. <b>/checkout (GET/PUT)</b> - The /checkout endpoint will be used for posting to the database for users checking out a vehicle. The API will be called and return the first available vehicle with the status of 'available' or return an exception if no cars are available. Improper data will not be passed to the end point because the front end will validate the data. Will change the status from 'available' to 'checkedout'
    * <b>JSON Object Passed</b>: {name: "string",email:"string",daysreq:int}
    * <b>JSON Object Returned</b>: {carid: "string",mileage:int,fuel:int}. Fuel will be 0 - Empty Tank, 1 - 1/4 Tank , 2 - Half Tank, 3 - 3/4 Tank, 4 - Full Tank
2. <b>/findcar (GET) </b>- The /findcar endpoint will be used for finding a car based on the user using the checkin page. The API will be called and return the vehicle with the matching ID and email address  input by the user with a status of checkedout on the checkin page. Will not change the status
    * <b>JSON Object Passed</b>: {carid: "string",email:"string"}
    * <b>JSON Object Returned</b>: {carid:"string", lastfuel:int, currentfuel: int, currentmileage:int, lastmileage:int, email:"string", comments:"string"}.
3. <b>/checkin (PUT) </b>- The /checkin endpoint will be used for checking in a vehicle once the user approves the vehicle which was returned by the /findcar endpoint. Will  change the status from 'checkedout' to 'checkedin'.
    * <b>JSON Object Passed</b>: {carid: "string",endfuel:int,endmileage:int,comment:"string"}
    * <b>JSON Object Returned</b>: {}
4. <b>/returnkey (PUT)</b> - The /returnkey endpoint will be used for returning checked-in vehicles to the 'available' pool. Will change status from 'checkedin' to 'available'
    * <b>JSON Object Passed</b>: {carid:"string"}
    * <b>JSON Object Returned</b>: {}
    
    
I feel as though we should simply send data to the backend/API have the backend make changes to the retrieved information and save it to the database then send back whatever necessary information. This was we can prevent some chattiness between the client and server. It should essentially work as follows:
Client Sends data to server. Server takes information and pulls the necessary data from the DB. Server will then insert the new data to the retrieved information and post it back to the database. Once all this has been done the Server will then return the desired data back to the client to be displayed.
The one instance where this will not occur is on checkin or more specifically the /findcar endpoint, the client will request data based on ID and email. The server will return the vehicle object to be displayed as the "Part 2" of checkin. The user will ensure the info is correct then submit it to the /checkin endpoint. In which the server will find the match data, make the updates and then return it to the database.

*** The terms here may not be accurate, but are used to explain the inner workings in laymans terms.
