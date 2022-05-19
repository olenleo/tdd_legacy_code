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

  /*
doThing( item ) {
    switch(item.name) {
      case "Aged Brie":
        item.quality += 1;
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        break;
      case "Sulfuras, Hand of Ragnaros":

        break;
      case "Conjured":
        break;
      default:
        
    } 
  }
  updateAgedBrie (item) {
    if (item.sellIn >= 0) {
      item.quality++;
    } else {
      item.quality++;
    }
    if (item.quality > 50) {
      item.quality = 50;
    }
    
  }
*/
reduceQuality( indexOfItem ) {
  if (this.items[indexOfItem].name != "Sulfuras, Hand of Ragnaros") {
    this.items[indexOfItem].quality--;
  }
}

reduceSellIn( indexOfItem ) {
  if (this.items[indexOfItem].name != "Sulfuras, Hand of Ragnaros") {
  this.items[indexOfItem].sellIn--;
  }
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


  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].quality > 0) {
            this.reduceQuality(i)
        }
      } else {
          this.increaseQuality(i)
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].sellIn < 11) {
                this.increaseQuality(i)
            }
            if (this.items[i].sellIn < 6) {
                this.increaseQuality(i)
            }
          }
      }
      this.reduceSellIn(i)
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].quality > 0) {
                this.reduceQuality( i ) 
            }
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
