# Touring-Artist-Back-End
Touring Arist is an application built for artists booking venues. Created as part of study at CoderAcademy. 

Repo: https://github.com/bencodes-au/Touring-Artist-Back-End#

Front End Deployment: https://touringartist.netlify.app/

Back End Deployment: https://touring-artist-back-end.onrender.com

*As these have been deployed to free services, please give a moment for the back end functionality to load when first accessing it. If it does not work at first, try refreshing the page after a few moments.*

# Welcome to Touring Artist
Touring Artist is a booking website for aspiring artists to book venues for their performances. This tool is designed to allow artists to register an account, log in, view all available venues in a given area or genre and follow it up with a quick and effortless booking process. Any user may view available venues, filter venues by location or genre, make a booking by specifying a venue, date, artist name and whether or not they have paid up front. 

# Requirements
This is a simple project that does not require high grade hardware. Most modern computers will be able to run this project provided they have stable internet connection during installation, a modern web browser (chrome, firefox, safari, edge) and a recent operating system (windows 10/11, macOS or Linux).

# Set Up
1. Clone the repository
git clone git@github.com:bencodes-au/Touring-Artist-Back-End.git

2. Install dependencies
npm install

3. Set up environment variables
Edit the .env with your set up
r
npm run dev
4. Start the development serve

# Dependencies
The newest available versions of these dependencies were used for this project as of the time this was written (16/03/2025). 

## Node.JS
Node.js serves as the runtime environment for the backend of this project, allowing JavaScript to be executed on the server side. It provides a non-blocking, event-driven architecture, making it efficient for handling multiple concurrent requests. In this project, Node.js powers the Express server, enabling the creation of APIs for user authentication, data retrieval, and interaction with the MongoDB database. 

## Database
### MongoDB
MongoDB is a NoSQL database used for storing application data in a flexible, document-oriented format. In this project, MongoDB is used to organise schemas, store user data, venue data, bookings and authentication information. The database is hosted on Cloud Atlas.

```
const PORT = process.env.PORT || 3000;

// connects the db on app start
app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database Connected");
});
```
&
```
const mongoose = require("mongoose");

const VenueSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    price: { type: String, required: true, unique: false },
    genre: { type: String, required: true, unique: false },
    location: { type: String, required: true, unique: false },
  },
  { timestamps: true }
);

const VenueModel = mongoose.model("Venue", VenueSchema);

module.exports = VenueModel;
```

## Libraries
### Express
Express is a web framework for Node.js that simplifies the creation of server-side applications. In this project, Express is used to set up the backend API, handle HTTP requests and define routes. It provides a clean and organized way to handle server-side logic and database interactions.

### Dotenv
Dotenv is a package that loads environment variables from a .env file into process.env. This helps manage sensitive information like database connection strings, JWT secret keys, and API URLs securely. In this project, Dotenv ensures that configuration settings remain hidden from the source code, preventing security vulnerabilities.

```
const PORT = process.env.PORT || 3000;

// connects the db on app start
app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database Connected");
});

```

### Jsonwebtoken (JWT)
Jsonwebtoken (JWT) is used for authentication and secure data exchange. In this project, JWT is used to generate and verify tokens for user authentication. When a user logs in, a JWT is created and sent to the client, which then includes it in future requests to access protected routes. 

```
const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.error("Authorization failed: No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization failed: Invalid token", error.message);
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = authenticationToken;
```

### Bcrypt
Bcrypt is a password-hashing library that ensures secure storage of user passwords. In this project, it is used to hash user passwords before storing them in the database, preventing unauthorized access in case of a data breach. It also provides a way to compare hashed passwords during the login process to verify user credentials.

```
async function updateUser(userId, bodyData) {
  try {
    if (bodyData.password) {
      bodyData.password = await bcrypt.hash(bodyData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, bodyData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error(`User with id ${userId} not found`);
    }
    return updatedUser;
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    throw new Error("Failed to update user");
  }
}
```

### Supertest/Jest
Supertest is a library for testing HTTP endpoints, while Jest is a JavaScript testing framework. Together, they are used to write and execute automated tests for the backend API in this project. Supertest allows sending HTTP requests to test route functionality, while Jest provides a test-running environment to ensure the correctness of authentication, database interactions, and API responses. In this project these were used via the creation of mock data for the venue and user functionalities, and their testing. 

```
  test("DELETE /venues/:venueId - should delete a venue", async () => {
    const deletedVenue = { _id: "1", name: "Venue 1" };
    VenueModel.findByIdAndDelete.mockResolvedValue(deletedVenue);

    const response = await request(app).delete("/venues/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedVenue);
  });
```


### CORS (Cross-Origin Resource Sharing)
CORS is a security feature that controls how web applications access resources from different origins. In this project, the cors middleware is used to enable communication between the frontend (React) and backend (Express) when hosted on different domains.

```
app.use(
  cors({
    origin: ["https://touringartist.netlify.app", "http://localhost:5173"],
  })
);
```

# Licenses
With the exclusion of Dotenv, this project and all of it's libraries are under the MIT License. Dotenv is under the BSD-2-Clause License. Both the MIT License and the BSD-2-Clause License are open-source licenses, meaning they allow software to be freely used, modified, and distributed, even for commercial purposes, with minimal restrictions. The MIT License keeps the original license and copyright notice but imposes no further restrictions on modification or redistribution.The BSD-2-Clause License is similar to MIT but with a specific clause stating that the names of the original contributors cannot be used to promote derived products. The BSD-2-Clause license is slightly stricter in preventing endorsement misuse, while the MIT license is more widely adopted due to its simplicity. However, in practice, they are nearly identical in permissiveness and business-friendly nature.

## Ethical Concerns
The licenses explicitly state that the software is provided "as is," meaning users cannot hold developers accountable for security flaws, bugs, or damages caused by the software. The responsibility of security for programs under this license fall on the user.

These licenses also allow companies to take this code, modify it and release a different version without sharing improvements. This means that this project is under threat of being copied and monetised elsewhere. 

## MIT License
The MIT License
Copyright (c) 2025 Ben Gorman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## The 2-Clause BSD License
Copyright (c) 2025 Ben Gorman

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

# Design and Reflection
## Architecture
Touring Artist was always going to be a full-stack JS project, which meant it made the most sense to follow MERN architecture. MERN is an acronym named after the core technologies it uses:

**M**ongoDB
**E**xpress
**R**eact
**N**ode

MERN stacks are generally used for it's ability to create full stack applications seamlessly by enabling similar frameworks in the front and back end. With MERN, I was able to write both server and client side code in Javascript. This allows for highly varied applications with simplicity, scalability  and strong community support. This makes it a popular option for web apps, such as the one I have created.

## Comparison to Alternate Technologies
### MongoDB (NoSQL vs SQL)
MongoDB uses a NoSQL database structure, which offers the flexibility to handle unstructured data. This architecture is generally best suited to bigger applications with different systems. As this project was small in nature, it may have been better using SQL. SQL used ACID (Atomicity, Consistency, Isolation, Durability) principles and uses fixed schemas with easily defined relationships. Instead of MongoDB, I could have used PostgreSQL. The reason that I didn't is that NoSQL databases are specifically written to work seamlessly with JSON which enables a greater flexibility. 

### Express (Accessible vs Specific)
Express was chosen as it was the most widely used frameworks for Node.js and has the most support. Koa was developed by the same team as Express with a more specific vision in regards to async programming and middleware, making it a a perfect tool for certain cases, but requiring additional integration for basic features such as routing and middleware. NestJS would also have been a great choice for this project as it allows greater with Angular and Typescript. However, it was not chosen due to it's increased complexity and the scope of this project not allowing the benefits of this framework to shine.

## Style Guide
This project has been using the Prettier extension for it's styling. This was chosen because it is automatic and simple to use. You can learn more about prettier here: https://prettier.io/docs/

## Libraries
This project was written in Node.js utilising the following libraries. These libraries were chosen over their competitors due to the wide reach that they have seen. From a student on the outside looking in, these libraries appear to be the industry standard. As this project was my first attempt at writing Javascript, it seemed best to solidfy my learning in the commonly used and trusted formats. When downloading libaries I stick to well known libraries over lesser known ones to avoid potential security risks. 

- Express: architecture 
- Mongoose: database
- Dotenv: environments
- Jsonwebtoken: tokens for authorisation
- Bcrypt: salting and hashing
- supertest: testing
- jest: testing
- Cors: security (access)