var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  let gildedRose;
  let inventory;
  let specialItems = [
    [new Item("Aged Brie", 20, 50)],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)],
    [new Item("Sulfuras, Hand of Ragnaros", 5, 50)]
  ]
  


    it("should foo", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("foo");
    });


  describe("Inventory operations of non-special items:", () => {

  

    beforeEach(() => {
      let averageItems =  [
        new Item("Rare Sash", 5, 50),
        new Item("Wings of Spit", 10, 100),
        new Item("Low Quality Potion", 20, 1)
      ]
      
      gildedRose = new Shop(averageItems);
      inventory = gildedRose.items;
      //printItems()
    });
    describe("Quality changes with update()", () => {
      it("Quality of item decreases by one when updated if quality > 0", () => {
        const currentQuality = inventory[0].quality
        gildedRose.updateQuality()
        expect(inventory[0].quality).to.equal(currentQuality - 1);
      })

      it("Quality can not reach below 0", () => {
        updateTimes(5)
        expect(inventory[2].quality).to.equal(0);
      })

      it("Quality of item A decreases even if item B reaches 0", () => {
        updateTimes(5)
        expect(inventory[0].quality).to.equal(45);
      })
  });
    describe("sellIn (days to sell) changes with update()", () => {
      it("Item sellIn decreases when updated", () => {
        const currentSellIn = inventory[0].sellIn
        updateTimes(1)
        expect(inventory[0].sellIn).to.equal(currentSellIn - 1);
      })
      it("Item sellIn can be negative", () => {
        const currentSellIn = inventory[0].sellIn;
        updateTimes(6)
        expect(inventory[0].sellIn).to.equal(currentSellIn - 6);
      })
      it("update() decreases sellIn of all items", () => {
        updateTimes(5)
      })
    });
    describe("Quality and sellIn affect each other:", () => {

      it("Quality decreases at double speed if sellIn is negative", () => {
        updateTimes(10)
        expect(inventory[0].quality).to.equal(35)
        updateTimes(1)
        expect(inventory[0].quality).to.equal(33)
      })
    });
  });
  function printItems() {
    console.log('\nItems\n______________________________________________________________')
    
    for (let item in gildedRose.items) {
      console.log(gildedRose.items[item])
    }
    console.log('______________________________________________________________\n')
  }
  function updateTimes(n) {
    for (let i = 0; i < n; i++) {
      gildedRose.updateQuality()
    }
  }
});