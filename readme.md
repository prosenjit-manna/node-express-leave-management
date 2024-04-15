# Node express typescript leave management app

## Setup 
- Clone this repo 
- npm i 
- docker-compose up -d 
- create .env from required env keys. It will show once you run `npm run start`
- npm run db:seed
- `npm run start`
- Now API server will start 

### Postman Collection 

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/180560-e21d80ce-35c4-46c8-90e0-bb8a30115a72?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D180560-e21d80ce-35c4-46c8-90e0-bb8a30115a72%26entityType%3Dcollection%26workspaceId%3D4ad1b903-6845-4017-b333-5d412a02da60#?env%5Bnode-express-typescript-local%5D=W3sia2V5IjoiYmFzZV9hcGlfZW5kcG9pbnQiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6InRva2VuIiwidmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2lJMk5qQTFNekEyWkRGbE9XSXlOV0ZtTUdNd01tUXhNR1VpTENKcFlYUWlPakUzTVRFMk1UWXlOVFFzSW1WNGNDSTZNVGN4TVRZeE9UZzFOSDAuOWJicjZoNXNjb1RaMkZXT1F2ZFlzeE0zZVhPUXlJTU92dDFUVmNUZldoYyIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJzZWNyZXQiLCJzZXNzaW9uVmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2lJMk5qQTFNekEyWkRGbE9XSXlOV0ZtTUdNd01tUXhNR1VpTENKcFlYUWlPakUzTVRFMk1UWXlOVFFzSW1WNGNDSTZNVGN4TVRZeE9UZzFOSDAuOWJici4uLiIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJwYXNzd29yZCIsInZhbHVlIjoidGVzdDEiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoidGVzdDEiLCJzZXNzaW9uSW5kZXgiOjJ9XQ==)

## Features Completed 

### Auth 
- Registration
- Login 
- Login lockout after 4 times incorrect password
- Forget password and Reset password with token 
- Get logged in user information 
- File based logger with winston
- Dynamic role
- Registration with email verification 
- User Types 
- Employee CRUD + e2e

### Seed 
- User
- Role
- Employee
- Leave

# In Progress
- Leave Collection Crud 

## Backlog 
- JWT token validity update 
- Organization Collection Crud
- Leave Settings 
- Custom Role



