let getKeys20 = localStorage.getItem('2020')
let getKeys21 = localStorage.getItem('2021')


if(getKeys20 === null){
    localStorage.setItem('2020',JSON.stringify(year20))
    console.log('key no estaba creado');
}else{
    let getKeysArray = JSON.parse(getKeys20)
    year20 = getKeysArray
    console.log('key estaba creado');
}
if(getKeys21 === null){
    localStorage.setItem('2021',JSON.stringify(year20))
    console.log('key no estaba creado');
}else{
    let getKeysArray = JSON.parse(getKeys21)
    year20 = getKeysArray
    console.log('key estaba creado');
}


function start(){
    for( let i = 1; i<=12; i++){
        year20[i]=[]
        if(i==3||i==1||i==5||i==7||i==8||i==10||i==12){
            for( let j = 1; j<=31; j++){
                year20[i][j]= ""
        
            }
        }else if(i==2){
            for( let j = 1; j<=29; j++){
                year20[i][j]= ""
        
            }
        }
        else{
            for( let j = 1; j<=30; j++){
                year20[i][j]= ""
        
            }
        }
    }
    for( let i = 1; i<=12; i++){
        year21[i]=[]
        if(i==3||i==1||i==5||i==7||i==8||i==10||i==12){
            for( let j = 1; j<=31; j++){
                year21[i][j]= ""
        
            }
        }else if(i==2){
            for( let j = 1; j<=28; j++){
                year21[i][j]= ""
        
            }
        }
        else{
            for( let j = 1; j<=30; j++){
                year21[i][j]= ""
        
            }
        }
    }
}
start()







