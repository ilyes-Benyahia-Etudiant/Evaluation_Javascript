
/* * Code réalisé suivant les consignes de l'xercice * */


// Declaration variables
let scores, roundScore, activePlayer, gamePlaying;

// Initialisation du jeu 
init();

// Ajout d'un écouteur d'événement au bouton qui lance le Dé 
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    // vérifier si le jeu est en cours de lecture
    if(gamePlaying) {

        // 1. Créer un nombre aléatoire pour le Dé
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Afficher le résultat
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';    

        // 3. Mettre à jour le score du tour si le numéro obtenu n'était pas un 1
        if(dice !== 1) {       
            // Ajouter un score si le nombre de dés est différent de 1
            roundScore += dice;    
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Tour du joueur suivant
            nextPlayer();
        }

    }
    
});

// Fonctionnalité qui permet d'accumuler des points ('Boutton hold')
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {

        // 1. Ajout du score actuel au score global
        scores[activePlayer] += roundScore; 

        // 2. Mise à jour de l'interface utilisateur
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Vérifier si le joueur a gagné la partie
        if(scores[activePlayer] >= 100) {

            // Changer le nom du joueur en 'Winner!'
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            // Cacher le Dé
            document.querySelector('.dice').style.display = 'none';

            // Ajout de la classe 'winner'(gagnant) au joueur
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // Supprimer le statut de joueur actif du winner (gagnant)
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // Changer la variable 'gamePlaying' en 'false'
            gamePlaying = false;

        } else {
            // Si le joueur gagne la partie, c'est au tour du joueur suivant
            nextPlayer();
        }
    }
});

// Redémarrer le jeu après avoir cliqué sur le bouton 'New Game' 
document.querySelector(".btn-new").addEventListener('click', init);

// Function qui initialise le jeu
function init() {

  // Changer la variable 'gamePlaying' en 'true'
  gamePlaying = true;

  // Remettre les deux scores à 0
  scores = [0, 0];

  // Redéfinir le joueur actif sur "Joueur 1
  activePlayer = 0;

  // Remettre le roundScore à 0
  roundScore = 0;

  // Cacher le Dé au début du jeu
  document.querySelector('.dice').style.display = 'none';

  // Définir les scores à 0 par défaut 
  // > Méthode utilisée : 'getElementById'
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0'; 

  // Supprimer le "statut winner" du joueur gagnant
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2'; 
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Supprimer 'status active' du joueur gagnant
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // S'assurer que le « statut actif » du « Joueur 2 » est supprimé et attribué au « Joueur 1 »
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

// Fonction pour donner le tour au joueur suivant
function nextPlayer() {
    
    // C'est au tour du joueur suivant si le nombre du Dé est 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Remettre le roundScore à 0
    roundScore = 0;

    // Remettre le score actuel à 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Ajouter la classe active au joueur qui a le tour maintenant
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Masquer le Dé après le changement de joueur actif
    document.querySelector('.dice').style.display = 'none';

}

