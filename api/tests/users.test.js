const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

afterEach(() => {
    return mongoose.connection.db.dropDatabase();
});

describe("Users CRUD", function () {
    it("happy path", async function () {
        let userId;

        // GIVEN
        await request(app)
            .post("/api/v1/users")
            .send({
                name: "John Doe",
                role: "guest",
                username: "john",
                password: "123456789",
                phone: "+1234567890",
                email: "john@example.com"
            })

            // THEN
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toMatchObject({
                    name: "John Doe",
                    role: "guest",
                    username: "john",
                    avatar: "https://res.cloudinary.com/doid35fhn/image/upload/v1741205412/aircastle/rmymt3ttwtlumo41lk9l.avif",
                    id: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
                expect(res.body.password).toBeUndefined();
                expect(res.body.email).toBeUndefined();

                userId = res.body.id;
            })

    });
});
