var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
});

describe("Inventory operations of non-special items:", () => {
  let gildedRose;
  let specialItems = [
    [new Item("Aged Brie", 20, 50)],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)],
    [new Item("Sulfuras, Hand of Ragnaros", 5, 50)]
  ]
  let averageItems =  [
    new Item("Rare Sash", 5, 50),
    new Item("Wings of Spit", 10, 100),
    new Item("Low Quality Potion", 20, 1)
  ]
  function printItems() {
    for (let item in gildedRose.items) {
      console.log(gildedRose.items[item])
    }
  }

  beforeEach(() => {
    gildedRose = new Shop(averageItems);
    console.log('\nItems at start\n______________________________________________________________')
    printItems()
    console.log('______________________________________________________________\n')
  });
  it("Quality of item decreases by one when updated if quality > 0", () => {
    const quality = gildedRose.items[0].quality
    gildedRose.updateQuality()
    expect(gildedRose.items[0].quality).to.equal(quality - 1);
  })

  it("Quality can not reach 0", () => {
    const quality = gildedRose.items[2].quality
    gildedRose.updateQuality()
    expect(gildedRose.items[2].quality).to.equal(quality);
  })



})
