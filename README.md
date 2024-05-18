# Simple Authentication Middleware API

This is a simple Express.js application that provides user sign-up and sign-in functionality with authentication and logging features. The application listens on port 4040 and uses middleware to authenticate users and log their activities.


## API Endpoints

### Sign-up (POST)
- URL: `/signup`
- Method: POST
- Description: Registers a new user.

- Request Body:
```json
{
    "name": "Mahima Chouhan",
    "email": "mahi@gmail.com",
    "password": "mahi222"
}
```

- Response:
    - Success:
    ```json
        {
            "success": true,
            "message": "Sign-up Successfully completed !"
        }
    ```

### Sign-in (GET)
- URL: /signin
- Method: GET
- Description: Authenticates an existing user.

- Request Body:
```json
    {
        "email": "mahi@gmail.com",
        "password": "mahi222"
    }
```

- Response:
    - Success:
    ```json
        {
            "success": true,
            "message": "Sign-in Successfully completed !"
        }
    ```

    - Error:
    ```json
        {
            "success": false,
            "error": "INVALID CREDENTIALS (Middleware error)"
        }
    ```

## Undefined Path Handler
- URL: /*
- Method: ALL
- Description: Handles undefined paths.

- Response:
```json
{
    "success": false,
    "error": "Path Not Found"
}
```
## Middleware
 
- Authentication Middleware: Verifies user credentials and logs the sign-in attempts.

```javascript
function authenticationMiddleware(req, res, next) {
    const userExist = userData.find(elem => req.body.email === elem.email && req.body.password === elem.password);
    if (userExist) {
        fs.appendFileSync("login.log", `Request-URL : ${req.url}. User-Name : ${req.body.name}. Date and Time : ${new Date()} \n`);
        next();
    } else {
        res.status(404).json({
            success: false,
            error: "INVALID CREDENTIALS (Middleware error)"
        });
    }
}
```

### Logging
- Sign-in attempts are logged in the `login.log `file with the following format:

```sql
Request-URL : /signin. User-Name : Mahima Chouhan. Date and Time : Sat May 18 2024 20:37:26 GMT+0530 (India Standard Time) 
```

## Notes
- This example uses in-memory storage for user data. In a production environment, you should use a database to store user credentials securely.

- Ensure that passwords are hashed and not stored in plain text for security reasons.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- `Express` - The web framework used.
- `Node.js` - JavaScript runtime.