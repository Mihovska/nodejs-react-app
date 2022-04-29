const request = require("supertest");
const app = require("../../src/server");
const mockingGoose = require("mockingoose");
const StarShipModel = require("../../src/models/starship.model");
const starShipService = require("../../src/services/shipsService");
const starShipData = {
    starship: "wing",
    timesClicked: 4
};
const agent = request.agent(app);


describe("StarShip Endpoints", () => {
    beforeEach(() => {
        mockingGoose.resetAll();
    });

    afterAll((done) => {
        app.close(() => {
            done();
        });
    });

    it("should fetch all ships", async () => {
        mockingGoose(StarShipModel).toReturn([starShipData], 'find');
        const res = await agent.get("/api/starShips");
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toContainEqual(starShipData);
    });

    it("should update a starShip", async () => {
        const dbUpdate = {ok: 1, nModified: 1, n: 1};
        mockingGoose(StarShipModel).toReturn(dbUpdate, 'updateOne');
        const res = await agent.put("/api/starShips")
            .send({
                starship: "X-wing",
                timesClicked: 5,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Clicks for StarShipModel with name X-wing were updated successfully.");
    });

    it("if no present starship data should not update", async () => {
        const res = await agent.put("/api/starShips").send(null);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Data to update can not be empty!");
    });

    it("should return status code 400 if cannot update ship", async () => {
        const dbUpdate = {ok: 1, nModified: 0, n: 0};
        mockingGoose(StarShipModel).toReturn(dbUpdate, 'updateOne');
        const res = await agent.put("/api/starShips")
            .send({
                title: 'test is cool',
                content: 'Lorem ipsum',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.error.message).toEqual("cannot PUT /api/starShips (400)");
        expect(res.body.message).toEqual("Cannot update StarShipModel with name undefined");
    });

    it("should return status code 500 if db constraint is violated when update ship", async () => {
        jest.spyOn(starShipService, "createFighter").mockResolvedValue(new Error("Resolve issue"));
        const res = await agent.put("/api/starShips")
            .send({
                title: 'test is cool',
                content: 'Lorem ipsum',
            });
        expect(res.statusCode).toEqual(500);
        expect(res.error.message).toEqual("cannot PUT /api/starShips (500)");
        expect(res.body.message).toEqual("Error updating StarShip with name undefined");
    });

    it("should return status code 500 if db constraint is violated when retrieving ships", async () => {
        jest.spyOn(starShipService, "fetchAllFighters").mockRejectedValue(new Error("Resolve issue"));
        const res = await agent.get("/api/starShips");
        expect(res.statusCode).toEqual(500);
        expect(res.error.message).toEqual("cannot GET /api/starShips (500)");
        expect(res.body.message).toEqual("Cannot read property 'find' of undefined");
    });
});