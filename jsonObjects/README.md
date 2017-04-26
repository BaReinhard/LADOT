# JSON Strings


## Vehicle Ready for Checkout

```
{
    "id":"012",
    "mileage":123,
    "fuel":1,
    "email":"",
    "status":"available",
    "duedate":"",
    "updated":"04/13/2017"
  }
```  

## Vehicle Object After Checkout

```
{
    "id":"012",
    "mileage":123,
    "fuel":1,
    "email":"new@address.com",
    "status":"checkedout",
    "duedate":"04/14/2017",
    "updated":"04/13/2017"
  }
```

## Vehicle Object After Checkin

```
{
    "id":"012",
    "mileage":123,
    "fuel":1,
    "email":"new@address.com",
    "status":"checkin",
    "duedate":"04/14/2017",
    "updated":"04/13/2017"
  }
```

## Vehicle Object After ReturnKey

```
{
    "id":"012",
    "mileage":150,
    "fuel":2,
    "email":"new@address.com",
    "status":"available",
    "duedate":"",
    "updated":"04/14/2017"
  }
```
