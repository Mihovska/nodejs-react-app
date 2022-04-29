const apiHelper = require("../../src/utils/API_helper");

describe("Get get wing ships", () => {
    it("should get all of the ships", async () => {
        const filteredFighters = await apiHelper.getAllFighters();
        expect(filteredFighters).toContain("Y-wing", "X-wing");
    })
})