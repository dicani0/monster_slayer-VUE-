function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = new Vue({
    el: '#game',
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    computed: {
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'player'
            }
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        surrender(){
            this.winner = 'monster';
        },
        addLog(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            if(attackValue > this.monsterHealth){
                this.monsterHealth = 0;
            }
            else{
                this.monsterHealth -= attackValue;
                this.addLog('Player', 'attacks', attackValue);
                this.attackPlayer();
            }
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            if(attackValue > this.playerHealth){
                this.playerHealth = 0;
            }
            else{
                this.playerHealth -= attackValue;
            }
            this.addLog('Monster', 'attacks', attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            if(attackValue > this.monsterHealth){
                this.monsterHealth = 0;
            }
            else{
                this.monsterHealth -= attackValue;
            }
            this.addLog('Player', 'special attacks', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(5, 15);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;
            }
            this.addLog('Player', 'heals', healValue);
            this.attackPlayer();
        },
    },
});