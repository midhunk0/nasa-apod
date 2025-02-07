import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express, {response} from "express";
import { deleteUser, fetchDates, inFav, loginUser, registerUser, removeItem, toggleFav } from "./controller";

const app=express();
app.use(express.json());

app.post("/registerUser", registerUser);
app.post("/loginUser", loginUser);
app.delete("/deleteUser", deleteUser);
app.get("/fetchDates/:username", fetchDates);
app.get("/inFav/:username/:date", inFav);
app.post("/toggleFav", toggleFav);
app.post("/removeItem", removeItem);

describe("user registration", ()=>{
    const registerUser=async()=>{
        const response=await request(app).post("/registerUser").send({
            username: "test",
            email: "test@gmail.com",
            password: "test"
        });

        return response;
    };

    it("should return, all are required", async()=>{
        const testCases=[
            { username: "", email: "test@gmail.com", password: "test" },
            { username: "test", email: "", password: "test" },
            { username: "test", email: "test@gmail.com", password: "" }
        ];

        for(const testCase of testCases){
            const response=await request(app).post("/registerUser").send(testCase);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("All are required");
        };
    });

    it("should return, user with this username is already there", async()=>{
        await registerUser();

        const response=await request(app).post("/registerUser").send({
            username: "test",
            email: "test1@gmail.com",
            password: "test1"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("A user with this username is already there");
    });

    it("should return, user with this email is already there", async()=>{
        await registerUser();

        const response=await request(app).post("/registerUser").send({
            username: "test1",
            email: "test@gmail.com",
            password: "test1"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("A user with same email is already there");
    });

    it("should return, user registration successful", async()=>{
        const response=await registerUser();
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User registration successful");
    });
});