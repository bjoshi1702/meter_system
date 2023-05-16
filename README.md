# meter_system

## Introduction

This is meter system project.

### Available Functionalities
- Display list of meter
  - It shows the list of meters.
  - It shows the data in ascending order when you click on respective column.
    - For example, if you click on Display Name column, it will sort all the data according to Display Name.
  - It shows the respective meter details when you click on one of the rows.
  - It has 'Create new Meter' button to create new meter and will get redirected to that path.
  
- Create new meter
  - Enter the details in the form.
    - Display Name:
        - Required field
        - Enter the value
    - Api Name: Required field
        - Required field
        - Enter the value
    - Active: 
        - optional value (takes default value if user has not selected anything)
        - Select the value for dropdown (true / false)
    - Used for Billing:
        - optional value (takes default value if user has not selected anything)
        - Select the value for dropdown (true / false)
    - Type:
        - optional value (takes default value if user has not selected anything)
        - Select the value from dropdown (sum / max / unique_count)
  - Sumbit button: It will make a POST call and will get redirected to Meter List page and changes will be visisble.
  - Cancel button: IT will cancel the current operation and get redirected to Meter List page.
 
- Edit an existing meter
  - Edit form will populate the existing from fields.
  - It allows to edit the form. All fields are editable.
  - Submit button: It will make a PUT call and will get redirected to Meter List page and And Changes will be visible.
  - Cancel button: It will cancel the current operation and get redirected to Meter List page.

- Show details for a meter
  - It displays the information about the selected meter.
  - Edit meter button: It gets redirected to edit form with the selected meter information.
  - Go Back to Meter List button: It will get redirected to Meter List page.

- If no URL matched
  - If user changes URL which does not exist within the project, it will give a way to go back to Meter List page.

### Used external libraries
- react-router

## How to run this project ?
- clone this project in your local
- cd to project folder
- npm install
- npm start
- switch to the browser and open http://localhost:3000/

## Information about each file
- **MeterList.js:** It lists all the meters in the table
- **MeterDetails.js**: It show information about the selected meter.
- **MeterForm.js:** It renders Create and Edit meter form
- **NoMatch.js** If no matched URL found, show this page.
