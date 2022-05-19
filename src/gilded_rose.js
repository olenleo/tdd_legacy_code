class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function checkValidityOfItems( items ) {
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

reduceQuality( indexOfItem ) {
  if (this.items[indexOfItem].name === ("Sulfuras, Hand of Ragnaros")) {
    return;
  }
  if (this.items[indexOfItem].quality - 1 >= 0) {
  this.items[indexOfItem].quality--;
  }
}

reduceSellIn( indexOfItem ) {
  if (this.items[indexOfItem].name != "Sulfuras, Hand of Ragnaros") {
  this.items[indexOfItem].sellIn--;
  }
}
qualityShouldNotDecrease( indexOfItem ) {
  return (this.items[indexOfItem].name !== "Aged Brie" && this.items[indexOfItem].name !== "Backstage passes to a TAFKAL80ETC concert")
}


/**
 * Quality of items capped at 50.
 * @param {*} indexOfItem 
 */
increaseQuality( indexOfItem ) {
    if (this.items[indexOfItem].quality + 1 <= 50) {
      this.items[indexOfItem].quality++;
  }
}

incrementBackstagePassQuality( indexOfItem ) {
  if (this.items[indexOfItem].name == "Backstage passes to a TAFKAL80ETC concert") {
  if (this.items[indexOfItem].sellIn < 11) {
    this.increaseQuality(indexOfItem);
  }
  if (this.items[indexOfItem].sellIn < 6) {
    this.increaseQuality(indexOfItem);
  }
}}


  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.qualityShouldNotDecrease(i)) {
            this.reduceQuality(i)
      } else {
          this.increaseQuality(i)
            this.incrementBackstagePassQuality(i)
      }
      this.reduceSellIn(i)
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
                this.reduceQuality( i ) 
          } else {
            this.items[i].quality = 0; // Backstage pass is expired
          }
        } else {
            this.increaseQuality(i)
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
