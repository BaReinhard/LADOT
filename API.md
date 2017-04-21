## API Explanation

### 4 Seperate End Points

1. <b>/checkout (PUT)</b> - The /checkout endpoint will be used for posting to the database for users checking out a vehicle. The API will be called and return the first available vehicle with the status of 'available' or return an exception if no cars are available. Improper data will not be passed to the end point because the front end will validate the data. Will change the status from 'available' to 'checkedout'
    * <b>JSON Object Passed</b>: {email:"string"}
    * <b>JSON Object Returned</b>: {Entire Vehicle Object}. Fuel will be 0 - Empty Tank, 1 - 1/4 Tank , 2 - Half Tank, 3 - 3/4 Tank, 4 - Full Tank
2. <b>/findcar (GET) </b>- The /findcar endpoint will be used for finding a car based on the user using the checkin page. The API will be called and return the vehicle with the matching ID and email address  input by the user with a status of checkedout on the checkin page. Will not change the status
    * <b>JSON Object Passed</b>: {carid: "string",email:"string"}
    * <b>JSON Object Returned</b>: {carid:"string", lastfuel:int, currentfuel: int, currentmileage:int, lastmileage:int, email:"string", comments:"string"}.
3. <b>/checkin (PUT) </b>- The /checkin endpoint will be used for checking in a vehicle once the user approves the vehicle which was returned by the /findcar endpoint. Will  change the status from 'checkedout' to 'checkedin'.
    * <b>JSON Object Passed</b>: {carid: "string",endfuel:int,endmileage:int,comment:"string"}
    * <b>JSON Object Returned</b>: {Status 200 (OK)}
4. <b>/returnkey (PUT)</b> - The /returnkey endpoint will be used for returning checked-in vehicles to the 'available' pool. Will change status from 'checkedin' to 'available'
    * <b>JSON Object Passed</b>: {carid:"string",email:"string"}
    * <b>JSON Object Returned</b>: {Status 200 (OK)}

### API Actions
<p> The <b>/checkout</b> endpoint will be handled as a PUT request, which will require an email, which will return the first vehicle available that has not been used in the longest amount of time. The endpoint will update the status to checkedout as well as insert the email address and update the updated field to the current date.
</p>
<p> The <b>/findcar</b> endpoint</p>
<p> The <b>/checkin</b> endpoint</p>
<p> The <b>/returnkey</b> endpoint will be handled as a PUT request, which will require a carId and email address, which will return the car with the matching carid and email. The endpoint will update the status and return it to available as well as strip the email address and update the updated field.

*** The terms here may not be accurate, but are used to explain the inner workings in laymans terms.
