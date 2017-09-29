describe("Game of life", function() {
    it("Will be alive", function() {
        expect(willAlive(true, 2)).toBe(true);
        expect(willAlive(true, 3)).toBe(true);
        expect(willAlive(false, 3)).toBe(true);
        expect(willAlive(true, 1)).toBe(false);
        expect(willAlive(true, 4)).toBe(false);
        expect(willAlive(false, 2)).toBe(false);
    });
});