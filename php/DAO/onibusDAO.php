<?php

	$mysqli = new mysqli("localhost", "root","","onbus");
	//$mysqli = new mysqli("mysql.hostinger.com.br","u736430953_teohe","teohen", "u736430953_mapa");
	
	$tarefa = $_GET['acao'];

		switch ($tarefa) {
			case 'buscaLinhasDeOnibus':
					$linhaOnibus = $_GET['linha'];
					$res = $mysqli->query("SELECT idOnibus, linhaOnibus FROM onibus WHERE linhaOnibus LIKE  '".$linhaOnibus."%' AND onibus.statusOnibus <> 0 LIMIT 0,3");
						while ($resultado = mysqli_fetch_array($res)) {
							$final['id'] = $resultado['idOnibus'];
							$final['linhaOnibus'] = $resultado['linhaOnibus'];
							$linhas[] = $final;	
				    	}
				    	if(isset($linhas)){
					    	$json = json_encode($linhas);
					    	echo $json;   
					    }else{
					    	
					    }
				break;
			case 'buscaLinhasDeOnibusPorId':
					$id = $_GET['id'];
					$res = $mysqli->query("SELECT idOnibus, linhaOnibus FROM onibus WHERE idOnibus = '$id'");
						$resultado = mysqli_fetch_array($res);
						$final['id'] = $resultado['idOnibus'];
						$final['linhaOnibus'] = $resultado['linhaOnibus'];
				    	if(isset($final)){
					    	$json = json_encode($final);
					    	echo $json;   
					    }else{
					    	
					    }
				break;				
				case 'buscaDezLinhasDeOnibus':
					$linhaOnibus = $_GET['linha'];
					$res = $mysqli->query("SELECT idOnibus, linhaOnibus, statusOnibus FROM onibus WHERE linhaOnibus LIKE '%".$linhaOnibus."%' LIMIT 0,6");
						while ($resultado = mysqli_fetch_array($res)) {
							$final['id'] = $resultado['idOnibus'];
							$final['linhaOnibus'] = $resultado['linhaOnibus'];
							$final['status'] = $resultado['statusOnibus'];
							$linhas[] = $final;	
				    	}
				    	if(isset($linhas)){
					    	$json = json_encode($linhas);
					    	echo $json;   
					    }else{
					    	
					    }
				break;
				case 'novaLinha':
				if($post = file_get_contents("php://input")){
						$request  = json_decode($post, true);				
						$linha = $request['linha'];
						$insere = $mysqli->query("INSERT INTO onibus (linhaOnibus, statusOnibus) VALUES ('$linha', 0)");	
				}
			break;
		}
	?>