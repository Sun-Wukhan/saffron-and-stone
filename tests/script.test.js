const test = require("node:test");
const assert = require("node:assert/strict");

const { getDisplayYear, shouldShowDish } = require("../assets/script.js");

test("menu filter shows every dish when all is selected", () => {
  assert.equal(shouldShowDish("all", "rice"), true);
});

test("menu filter only shows dishes in the selected category", () => {
  assert.equal(shouldShowDish("small", "small"), true);
  assert.equal(shouldShowDish("small", "sweet"), false);
});

test("footer displays the provided calendar year", () => {
  assert.equal(getDisplayYear(new Date("2026-09-20T12:00:00Z")), 2026);
});
