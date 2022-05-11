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
  
  function printItems() {
    console.log('\nItems\n______________________________________________________________')
    
    for (let item in gildedRose.items) {
      console.log(gildedRose.items[item])
    }
    console.log('______________________________________________________________\n')
  }
  function updateTimes(n) {
    for (let i = 0; i < n; i++) {
      console.log('Update ', i + 1)
      gildedRose.updateQuality()
    }
  }

  beforeEach(() => {
    let averageItems =  [
      new Item("Rare Sash", 5, 50),
      new Item("Wings of Spit", 10, 100),
      new Item("Low Quality Potion", 20, 1)
    ]
    gildedRose = new Shop(averageItems);
    console.log('Initial items:')
    printItems()
  });

  it("Quality of item decreases by one when updated if quality > 0", () => {
    const quality = gildedRose.items[0].quality
    gildedRose.updateQuality()
    expect(gildedRose.items[0].quality).to.equal(quality - 1);
  })

  it("Quality can not reach below 0", () => {
    updateTimes(5)
    expect(gildedRose.items[2].quality).to.equal(0);
  })

  it("Quality of item A decreases even if item B reaches 0", () => {
    updateTimes(5)
    expect(gildedRose.items[0].quality).to.equal(45);
  })



})
