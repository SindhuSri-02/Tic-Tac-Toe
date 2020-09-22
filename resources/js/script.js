let gameActive = true;
            let currentPlayer = 'X';
            let gameState = ['','','','','','','','',''];
            let selected = false;
            
            function computer() {
                var num = Math.floor(Math.random()*9);
                if(gameState[num] === '') {
                    gameState[num] = currentPlayer;
                    FindByAttributeValue('data-cell-index', num.toString(), 'div');
                    handleResult();
                } else {
                    computer();
                }
            }
            
            function FindByAttributeValue(attribute, value, element_type)    {
                  element_type = element_type || "*";
                  var All = document.getElementsByTagName(element_type);
                  for (var i = 0; i < All.length; i++)       {
                    if (All[i].getAttribute(attribute) == value) { 
                        All[i].innerHTML = currentPlayer;
                        return;
                    }
                  }
            }
            
            function handleCellClick(clickedCellEvent) {
                if(gameActive) {
                    if(selected) {
                        if(document.getElementById('name-1').textContent === 'computer' && currentPlayer !== 'X') {
                        return;
                        }

                        function cellclick() {
                            clickedCell = clickedCellEvent.target;
                            clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

                            if(gameState[clickedCellIndex] !== '' || !gameActive) {
                                return;
                            }

                            gameState[clickedCellIndex] = currentPlayer;
                            clickedCell.innerHTML = currentPlayer;
                            handleResult();
                        }

                        if(!(document.getElementById('name-1').textContent === 'computer')) {
                            cellclick();
                        }

                        if(document.getElementById('name-1').textContent === 'computer' && currentPlayer === 'X') {
                            cellclick();
                        }
                    } else {return;}
                    
                }
                
            }
            
            function handleResult() {
                const winningCondition = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
                let won = false;
                for (var i=0;i <= 7;i++) {
                    const winCon = winningCondition[i];
                    var a = gameState[winCon[0]];
                    var b = gameState[winCon[1]];
                    var c = gameState[winCon[2]];
                    
                    if (a === '' || b === '' || c === '') {
                        continue;
                    }
                    
                    if(a === b && b === c) {
                        won = true;
                        break;
                    }
                }
                
                if(won) {
                    gameActive = false;
                    if(currentPlayer === 'X') {
                        document.getElementById('playerOne').classList.add('winner');
                        document.getElementById('name-0').innerHTML = 'WINNER';
                    } else {
                        document.getElementById('playerTwo').classList.add('winner');
                        document.getElementById('name-1').innerHTML = 'WINNER';
                    }
                    setTimeout(function(){
                        alert(`winner is ${currentPlayer} start a new game`);
                        window.location.reload();
                    },1000);
                    return;
                }
                
                let roundDraw = !gameState.includes('');
                if (roundDraw) {
                    setTimeout(function() {alert(`tie game----start new game`)}, 1000);
                    gameActive = false;
                    return;
                }
                
                handleChangePlayer();
                
            }
            
            function handleChangePlayer() {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.getElementById("playerOne").classList.toggle("active");
                document.getElementById("playerTwo").classList.toggle("active");
                if(document.getElementById('name-1').textContent === 'computer' && currentPlayer === 'O') {
                    computer();
                }
            }
            
            document.querySelectorAll('.griditem').forEach(griditem => griditem.addEventListener('click', handleCellClick));
            
            document.querySelector('#playerOne').addEventListener('click',function() {
                if(selected === false) {
                    document.getElementById('name-0').textContent = 'player-1';
                    document.getElementById('name-1').textContent = 'player-2';
                    document.getElementById('grid').style.display = 'grid';
                    todo();
                }
            });
            
            document.querySelector('#playerTwo').addEventListener('click',function() {
                if(selected === false) {
                    document.getElementById('name-0').textContent = 'player';
                    document.getElementById('name-1').textContent = 'computer';
                    document.getElementById('grid').style.display = 'grid';
                    todo();
                }
            });
            
            
            
            function ne() {
                window.location.reload();
                return false;
            }
            
            function todo() {
                document.querySelector('.one').textContent = 'close';
                document.querySelector('.two').textContent = 'radio_button_unchecked';
                document.getElementById('playerOne').classList.add('active');
                selected = true;
            }
            
            function playboard() {
                var ele = document.getElementById('next');
                ele.parentNode.removeChild(ele);
                document.querySelector('.playing').style.display = 'block';
                document.getElementById('container').classList.remove('front'); 
            }