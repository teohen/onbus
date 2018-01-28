<?php

	$mysqli = new mysqli("localhost", "root","","onbus");
	//$mysqli = new mysqli("mysql.hostinger.com.br","u736430953_teohe","teohen", "u736430953_mapa");
	
	$tarefa = $_GET['acao'];

		switch ($tarefa) {
			case 'buscaTodosComentarios':
					$id = $_GET['idMarcador'];
					$res = $mysqli->query("SELECT descricoes.comentario, descricoes.data FROM descricoes, marcador WHERE descricoes.idMarcador = marcador.idMarcador AND marcador.idMarcador = '$id'");
					$mysqli->close();
						while ($resultado = mysqli_fetch_array($res)){
							$final['comentario'] = $resultado['comentario'];
							$final['data'] = $resultado['data'];
							$descricoes[] = $final;	
				    	}
				    	header("Content-type: application/json;");
				    	header("Access-Control-Allow-Origin: *");
						if(isset($descricoes)){
					    	$json = json_encode($descricoes);
				    		echo $json;
				    	}else{
											    	
					    }
			break;
			case 'novaDescricao':
				if($post = file_get_contents("php://input")){
						$request  = json_decode($post, true);				
						$marcador = $request['marcador'];
						$descricao = $request['descricao'];
						if($descricao != ""){
							$insere = $mysqli->query("INSERT INTO descricoes (idMarcador, comentario, data) VALUES ('$marcador', '$descricao', CURDATE())");
						}
						$insere = $mysqli->query("UPDATE marcador SET confirmacaoMarcador = confirmacaoMarcador + 1 WHERE idMarcador = '$marcador'");
						
				}
			break;
		}
	?>