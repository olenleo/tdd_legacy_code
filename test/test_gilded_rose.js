var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  let gildedRose;
  let inventory;
  const specialInventoryItems = [
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Sulfuras, Hand of Ragnaros"
  ]


    it("Shop contains provided item", function () {
      gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("foo");
    });
    it("Shop() with no parameters return an error", ()  => {
      expect(() => new Shop()).to.throw("Inventory can not be empty.")
    })
    it("Shop() expects an array", function () {
      expect(() => new Shop("bar")).to.throw("Inventory should be an array.")
    });
    it("Shop() expects a non-empty array", function () {
      expect(() => new Shop([])).to.throw("Inventory can not be empty.")
    });
    it("Shop() expects an array consisting exclusively of items", function() {
      expect(() => new Shop([new Item("A can of worms",5,10), "fancy pants"])).to.throw("Inventory contains invalid object")

    })



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
        const currentQuality = inventory[1].quality
        updateTimes(10)
        expect(inventory[1].quality).to.equal(currentQuality - 10);
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
        const sellInOfItemA = inventory[0].sellIn;
        const sellInOfItemB = inventory[1].sellIn;
        updateTimes(5)
        expect(inventory[0].sellIn).to.be.lessThan(sellInOfItemA)
        expect(inventory[1].sellIn).to.be.lessThan(sellInOfItemB)
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

    describe("Inventory operations of special items:", () => {
      let backStagePassShop;
      beforeEach(() => {
        let specialItems = [
          new Item("Aged Brie", 20, 25),
          new Item("Backstage passes to a TAFKAL80ETC concert", 25, 40),
          new Item("Sulfuras, Hand of Ragnaros", 5, 50)
        ]
        backStagePassShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)]);
        gildedRose = new Shop(specialItems)
        inventory = gildedRose.items;
        
      });    
      
      describe("Name of item is tested to check if it belongs to the special items", () => {
        it("Aged Brie is tested", () => {
          const before = inventory[0].quality
          updateTimes(5);
          for (let item in inventory) {
            if (inventory[item].name === "Aged Brie") {
              expect(inventory[item].quality).to.equal(before + 5)
            }
          }

        })
        it("Backstage pass is tested", () => {
          const before = inventory[1].quality
          updateTimes(5);
          for (let item in inventory) {
            if (inventory[item].name === "Backstage passes to a TAFKAL80ETC concert") {
              expect(inventory[item].quality).to.equal(before + 5)
            }
          }
        })
      });
      
      it("Quality of \'Aged Brie\' increases with each update", () => {
        const qualityOfCheeseAtStart = inventory[0].quality;
        updateTimes(5)
        expect(inventory[0].quality).to.equal(qualityOfCheeseAtStart + 5)
      })

      it("Quality of \'Aged Brie\' can not exceed 50", () => {
        updateTimes(500);
        for (let item in inventory) {
          if (item.name === "Aged Brie") {
            expect(item.quality).to.equal(50)     
          }
        }
      })
      
      it("Legendary item \'Hand of Ragnaros'\ is not affected by update()", () => {
        updateTimes(500);
        for (let item in inventory) {
          if (inventory[item].name === "Sulfuras, Hand of Ragnaros") {
            expect(inventory[item].quality).to.equal(50)     
            expect(inventory[item].sellIn).to.equal(5)
          }
        }
      });
      it("Legendary item \'Hand of Ragnaros'\ is not affected by update() pt 2", () => {
        updateTimes(500);
        expect(inventory[2].quality).to.equal(50)
        expect(inventory[2].sellIn).to.equal(5)
      });

      it("Quality of \'Aged Brie\' or \'Backstage pass\' can not exceed 50", () => {
        let shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5,49), new Item("Aged Brie",5,49)])
        shop.updateQuality()
        for (const item in shop.items) {
          expect(shop.items[item].quality).to.equal(50)
        }
      

      })

      describe("Backstage passes", () => {
        it("Backstage pass quality increases by 1 before sellIn <= 10", () => {
          let shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)])
          shop.updateQuality()
          expect(shop.items[0].quality).to.equal(11)
          expect(shop.items[1].quality).to.equal(13)
        })

        it("Backstage pass quality increases by 2 when 5 < sellIn <= 10", () => {
          const quality = backStagePassShop.items[0].quality
          backStagePassShop.updateQuality()          
          expect(backStagePassShop.items[0].quality).to.equal(quality + 2)
        })

        it("Backstage pass quality increases by 3 when 0 < sellIn < 5", () => {
        let shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)])
        shop.updateQuality()
        expect(shop.items[0].quality).to.equal(12)
        shop.updateQuality()
        expect(shop.items[0].quality).to.equal(15)
        })

        it("Backstage pass quality can not exceed 50", () => {
          updateTimes(23)
          for (let item in inventory) {
            if (inventory[item].name === "Backstage passes to a TAFKAL80ETC concert") {
              expect(inventory[item].quality).to.equal(50)     
            }
          }
          
        })
        it("Backstage pass quality set to 0 when sellIn === 0", () => {
          updateTimes(inventory[1].sellIn + 1)
          expect(inventory[1].quality).to.equal(0)
          })
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