let host_name = window.location.hostname;
let db = host_name.includes("localhost") ? 'http://' + host_name + '/felipe/github/JS-projects/menu/menu/db/PDO_connection.php?acao=view' : '';
var html = ''

function sorting_by_nome(array, ordem = 'nome'){
    array.sort(function (a, b) {
        if (+a[ordem] > +b[ordem]) return 1;          
        else if (+a[ordem] < +b[ordem]) return -1;
        else return 0;
    });
}

function sorting_by_ordem(array, ordem = 'ordem'){
    array.sort(function (a, b) {
        if (+a[ordem] > +b[ordem]) return 1;          
        else if (+a[ordem] < +b[ordem]) return -1;
        else return 0;
    });
}

function monta_menu(array){
    array.map( item => {
        if(item.id_pai !== '0'){
       
            console.log(item)

            array.map( pai => {
                if(pai.id == item.id_pai){
                    pai.items.push(item)
                }
            })
        
        }
    })
}

function imprime_item(array){
    if(typeof array == 'object'){

        html += '<li style="order: ' + array['ordem'] + ';" draggable="true" class="list-group-item"><span>' + array['nome'] + '</span><span style="float: right" class="glyphicon glyphicon-resize-vertical"></span>';

        if(typeof array['items'] == 'object' && array['items'].length > 0){
            html += '<ul class="list-group">';
            for(item in array['items']){
                imprime_item(array['items'][item])
            }
            html += '</ul>';
        }

        html += '</li>';
    }
}

fetch(`${db}`)
    /* transforma em json */
    .then((body) => body.json())
    /* subscribe, response */
    .then((data) => {
    	html = '<ul class="list-group" style="display: flex;flex-direction: column;">';

        monta_menu(data)

        console.log(data)

    	for(item in data){
            if(data[item]['id_pai'] === '0'){
                imprime_item(data[item])

                let menu = document.getElementById('dinamic-menu');
                menu.innerHTML = html; 
            }
    	}
    })