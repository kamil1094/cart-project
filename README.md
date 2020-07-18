# cart-project  
  
## How to run project?  
Simply clone repo and run: **docker-compose up**  
  
  
## Postman collection for test requests
https://www.postman.com/collections/982f52a2645e5241cf9d
  
  
## Available endpoints:  
### User  
1) POST -> **/api/user/register**  
body { name: string, email: string, password: string }  
2) POST -> **/api/user/login**  
body { email: string, password: string }  
3) POST -> **/api/user/logout**  
headers -> Authorization: Bearer jwtTokenValue  
  
### Product  
1) POST -> **/api/products**  
body { name: string, price: string, image: base64string }  
2) GET -> **/api/products/:productId**   
headers -> Authorization: Bearer jwtTokenValue
3) GET -> **/api/products**
4) PUT -> **/api/products/:productId**  
body { name?: string, price?: string, image?: base64string }  
headers -> Authorization: Bearer jwtTokenValue  
4) DELETE -> **/api/products/:productId**   
headers -> Authorization: Bearer jwtTokenValue  
  
### Cart  
1) PUT -> **/api/cart/:productId**  
headers -> Authorization: Bearer jwtTokenValue  
query { quantity?: number }  
2) DELETE -> **/api/cart/:productId**   
headers -> Authorization: Bearer jwtTokenValue  
query { quantity?: number }  
3) GET -> **/api/cart/:cartId/products**
headers -> Authorization: Bearer jwtTokenValue  
query { last?: string, limit?: number }  
4) GET -> **/api/cart/:cartId/summary**  
headers -> Authorization: Bearer jwtTokenValue  
