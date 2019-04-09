// link do gry: https://websamuraj.pl/examples/js/gra/ 

class Game {
    constructor(initialValue) {
     this.stats = new Statistics();
     this.wallet = new Wallet(initialValue);

     document.getElementById('start').addEventListener('click', this.startGame.bind(this));
     this.spanWallet = document.querySelector('.panel span.wallet');
     this.boards = [...document.querySelectorAll('div.color')];
     this.inputBid = document.getElementById('bid');
     this.spanResult = document.querySelector('.score span.result')
     this.spanGames = document.querySelector('.score span.number')
     this.spanWins = document.querySelector('.score span.win')
     this.spanLosses = document.querySelector('.score span.loss')

     this.render();
    }

    //domyślne pobieranie wartości statystyk i innych przy pierwszej grze
   render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), result = '', stats = [0,0,0], bid = 0, wonMoney = 0) {
    
    this.boards.forEach((board, i) => {
        board.style.backgroundColor = colors[i]
    });
    this.spanWallet.textContent = money;
     if(result) {
        result = `Wygrałeś ${wonMoney}$.`
     } else if (!result && result !== '') {
        result = `Przegrałeś ${bid}$.`
     }
    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];

    this.inputBid.value = '';
   }

   //pobieranie wartości przy każdej kolejnej grze
   startGame() {
    if(this.inputBid.value < 1) return alert('Kwota za mała'); //uwaga, w tym momencie this traci wiązanie z game i zyskuje wiązanie z button, bo to button kliknęliśmy, trzeba więc zastosować metodę bind (linijka 8)
    const bid = Math.floor(this.inputBid.value); //zaokrągla ale przy okazji zamienia też string na number

    if (!this.wallet.checkCanPlay(bid)) { //bid to value z Wallet.js
        return alert('Masz za mało środków lub podałeś złą wartość')
    }

    this.wallet.changeWallet(bid, '-');

    this.draw = new Draw(); //tworzenie nowej gry
    const colors = this.draw.getDrawResult(); //przypisywanie losowanych kolorów do zmiennej
    const win = Result.checkWinner(colors); //sprawdzanie, czy losowanie to wygrana czy przegrana i zwracanie true albo false, uwaga, to tworzenie zmiennej tylko w tej metodzie
    const wonMoney = Result.moneyWinInGame(win, bid); //pokazywanie czy gracz wygrał pieniądze, a jeśli tak to ile
    this.wallet.changeWallet(wonMoney) //dodawanie wygranej do wallet
    this.stats.addGameToStatictics(win, bid); //dodawanie statystyk

    this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney);

 }
}
