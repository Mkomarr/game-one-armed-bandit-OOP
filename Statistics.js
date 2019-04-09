class Statistics {
 constructor() {
     this.gameResults = [];
 }
 addGameToStatictics(win, bid) {
    let gameResult = {
        win: win, //jeśli są takie same, można napisać tylko win,
        bid: bid
    }
 console.log(gameResult);
 this.gameResults.push(gameResult);
 }

 showGameStatistics() {
     let games = this.gameResults.length
     let wins = this.gameResults.filter(result => result.win).length;
     let losses = this.gameResults.filter(result => !result.win).length;
     return [games, wins, losses];
 }
}
