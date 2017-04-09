# LADOT
LADOT Project


## Requirements Document
```
Date:                 April 4th 2017

Date Submitted:       (Date Here)

Application Title:    LADOT Car Pool Application

Purpose:              This application will handle the checkin and checkout of LADOT Vehicles for all 
                      LADOT Employees at given location
                      
Program Procedures:   In a Web Browsers, the user will choose whether they will check in or check out
                      a vehicle for use. On Check out, the user will fill out the proper information
                      (Name, Days Needed, Estimate of Total Miles). On Check in, the user will fill
                      out the proper information (Name, Card ID, Mileage of Vehicle, Fuel Remaining).
                      The administrative end of the application will allow an employee with proper
                      permissions to check back in the vehicle, which will allow for checkout of that
                      vehicle again
                      
Algorithms,           1. The user must input each of the input boxes on each page, in order to check-in
Processing, and          or check out the vehicle.
Conditions:           2. During checkout, the application will return the next available car and give
                         its ID#. 
                      3. During checkin, the application will place the vehicle into a queue.
                      4. The checked-in vehicles will need to be manually checked-in by an admin, before it
                         returns to the pool.
```
## Use Case Definition

1. The Web Application opens, displaying 2 options (Check-In and Check-Out) as buttons.
2. The User will click one of the buttons depending on the nature of the request
3. If the user chooses to check-in a vehicle, the app will dynamically swap views, where the page will display a form, for user input (name, carID, mileage, and fuel) all of which must be filled in before submitting. There are 3 additional buttons (back home,submit, and cancel). 'Submit' will check-in the vehicle, 'cancel' and 'back home' will return the user to the homepage.
4. If the user chooses to check-out a vehicle, the app will dynamically swap views, where the page will display a form, for user input(name, days required, and distance) all of which must be filled in before submitting. There are 3 additional buttons(back home, submit, and cancel). 'Submit' will return a vehicle number for the user to use, 'cancel' and 'back home' will return the user to the homepage.
5. There is an additional portion to the application, for employees with proper permissions, the admin portion. Where the page loads and lists 'XX' number of cars that have been checked-in show Car Number with a button next to it 'Check-In'. The employee will check for keys for each car, given the key number matches the carID # the user will then click 'Check-In'. Then the respective car will be returned to the car pool
