<?php
	function pega_dados(){

		$hostname='localhost';
		$username='root';
		$password='';

		try {
		    $dbh = new PDO("mysql:host=$hostname;dbname=menu",$username,$password);
		    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // <== add this line

		    $sql = "SELECT * FROM menu_items";
		    $query = $dbh->query($sql);
		    $items = [];

			foreach ($query as $row){
				if($row['exibir'] == 1){
					$items[] = [
			    		'id'       => $row['id'],
			    		'nome'     => utf8_encode($row['nome']),
			    		'id_pai'   => $row['item_pai'],
			    		'ordem'    => $row['ordem'],
			    		'exibir'   => $row['exibir'],
			    		'items'    => [],
			    	];
				}
		    }
		}catch(PDOException $e){echo $e->getMessage();}

		echo json_encode($items);
	}

	$get = $_GET['acao'];

	switch($get){
		case 'view':
			pega_dados();
			break;
	}
?>