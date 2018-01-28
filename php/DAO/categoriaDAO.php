<?php

	$mysqli = new mysqli("localhost", "root","","onbus");
	//$mysqli = new mysqli("mysql.hostinger.com.br","u736430953_teohe","teohen", "u736430953_mapa");
	
	$tarefa = $_GET['acao'];

		switch ($tarefa) {
			case 'buscaTodosTiposDeOcorrencia':
					$res = $mysqli->query("SELECT * FROM categoria");
						while ($resultado = mysqli_fetch_array($res)) {
							$final['id'] = $resultado['idCategoria'];
							$final['descricaoCategoria'] = $resultado['descricaoCategoria'];
							$categorias[] = $final;	
				    	}
				    	if(isset($categorias)){
					    	$json = json_encode($categorias);
					    	echo $json;   
					    }else{
					    	
					    }
				break;
		}
	?>