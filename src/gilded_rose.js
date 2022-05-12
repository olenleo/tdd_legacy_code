class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function checkValidityOfItems( items ) {
  console.log('Recieved ', items)
  if (items.constructor !== Array) {
    return ("Inventory should be an array.")
  }
  if (items.length === 0) {
    return ("Inventory can not be empty.")
  }
  for (let item in items) {
    if (items[item].constructor !== Item) {
      return ("Inventory contains invalid object.")
    }
  }
  return true;
}

class Shop {
  constructor(items = []) {
    if (checkValidityOfItems(items) === true) {
      this.items = items;
    } else {
      throw new Error(checkValidityOfItems(items))
    }
  }

  
  

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Aged Brie" && 
      this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
