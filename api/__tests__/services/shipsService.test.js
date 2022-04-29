const shipsService = require('../../src/services/shipsService');
const mockingGoose = require('mockingoose');
const StarShipModel = require('../../src/models/starship.model');
const starShipData = {
    starship: "wing",
    timesClicked: 4
};

describe("get ships for frontend", () => {
    beforeEach(() => {
        mockingGoose.resetAll();
    });
    it("should get all ships from db", async () => {
        mockingGoose(StarShipModel).toReturn([starShipData], 'find');
        const result = await shipsService.fetchFighters();
        expect(result[0].starship).toBe("wing");
    })
    it("should save a ship in the db", async () => {
        const dbUpdate = {ok: 1, nModified: 1, n: 1};
        mockingGoose(StarShipModel).toReturn(dbUpdate, 'updateOne');
        const result = await shipsService.createFighter({starshipName: "test", clicks: 3});
        expect(result).toBe(dbUpdate);
    })
});

describe("do ships business logic", () => {
    it("should get all complete ships", async () => {
        const mockedFighters = require('../../src/utils/API_helper');
        const fighthers = ["wing1", "wing2"];
        const expectedFighters = [{starship: "wing1", timesClicked: 0}, {
            starship: "wing2",
            timesClicked: 0
        }, {starship: "wing", timesClicked: 4}];
        jest.spyOn(mockedFighters, 'getAllFighters').mockResolvedValue(fighthers);
        mockingGoose(StarShipModel).toReturn([starShipData], 'find');
        const result = await shipsService.fetchAllFighters();
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedFighters));
    })
});