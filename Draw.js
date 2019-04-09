class Draw {
    constructor() {
    //przechowuje nazwy kolorów losowanych
     this.options = ['red', 'green', 'blue'];
    //przechowuje wynik losowania
     let _result = this.drawResult();
    //pobieranie wyniku losowania
     this.getDrawResult = () => _result;
    }

    drawResult() {
     let colors = [];
    //uzupełnianie tablicy poprz. losowanie
     for (let i = 0; i < this.options.length; i++) {
      const index = Math.floor(Math.random() * this.options.length);
      const color = this.options[index];
      //console.log(color);
      colors.push(color);
     }
     return colors;
    }
}
