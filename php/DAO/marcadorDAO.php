<?php

	$mysqli = new mysqli("localhost", "root","","onbus");
	//$mysqli = new mysqli("mysql.hostinger.com.br","u736430953_teohe","teohen", "u736430953_mapa");
	
	$tarefa = $_GET['acao'];

		switch ($tarefa) {
			case 'novaOcorrencia':
				if($post = file_get_contents("php://input")){
						$request  = json_decode($post, true);				
						$categoria = $request['categoria'];
						$descricaoMarcador = $request['descricao'];
						$linhaOnibus = $request['linha']; 
						$latMarcador = $request['lat']; 
						$lngMarcador  = $request['lng'];
						$dataMarcador = $request['data'];

						$res = $mysqli->query("SELECT idOnibus FROM onibus WHERE linhaOnibus = '$linhaOnibus'");
						$resultado = mysqli_fetch_array($res);
						$idOnibus = $resultado['idOnibus'];
						if(isset($idOnibus)){
							$insere = $mysqli->query("INSERT INTO marcador (idOnibus, idCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador) VALUES ('$idOnibus', '$categoria', '$descricaoMarcador', '$latMarcador', '$lngMarcador', '$dataMarcador', 1)");	
						}
				}else{
					$marcadores = null;
				}
			break;
			case 'buscaTodasAsOcorrencias':													
					$dataInicio = $_GET['dataInicio'];
					$dataFim = $_GET['dataFim'];
					$todaslinhas = $_GET['todaslinhas'];
					$url = "";
					$todasocorrencias = $_GET['todasocorrencias'];
					if($todaslinhas == "true"){
						
					}else{
						$url = $url." AND";
						$idOnibus = $_GET['idOnibus'];
						$url = $url." marcador.idOnibus = '$idOnibus'";
					}
					if($todasocorrencias == "true"){
						
					}else{
						$url = $url." AND";
						$idCategoria = $_GET['idCategoria'];
						$url = $url." marcador.idCategoria = '$idCategoria'";
					}

					$sql = "SELECT idMarcador, linhaOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND onibus.statusOnibus = 1 AND dataMarcador >= '$dataInicio' AND dataMarcador <= '$dataFim' $url";
					$res = $mysqli->query($sql);
					while ($resultado = mysqli_fetch_array($res)) {
						$final['idMarcador'] = $resultado['idMarcador'];
						$final['linhaOnibus'] = $resultado['linhaOnibus'];
						$final['descricaoCategoria'] = $resultado['descricaoCategoria'];
						$final['descricaoMarcador'] = $resultado['descricaoMarcador'];
						$final['latMarcador'] = $resultado['latMarcador'];
						$final['lngMarcador'] = $resultado['lngMarcador'];
						$final['dataMarcador'] = $resultado['dataMarcador'];
						$final['confirmacaoMarcador'] = $resultado['confirmacaoMarcador'];
						$marcadores[] = $final;	
			    	}
			    	header("Content-type: application/json;");
				    header("Access-Control-Allow-Origin: *");
					if(isset($marcadores)){
				    	$json = json_encode($marcadores);
				    	echo $json;   
				    }
			break;
			case 'buscaOcorrenciaPorId':													
					$id = $_GET['id'];
					$res = $mysqli->query("SELECT idMarcador, linhaOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE onibus.idOnibus = marcador.idOnibus AND categoria.idCategoria = marcador.idCategoria AND marcador.idMarcador = '$id'");

						$resultado = mysqli_fetch_array($res);
						$final['idMarcador'] = $resultado['idMarcador'];
						$final['linhaOnibus'] = $resultado['linhaOnibus'];
						$final['descricaoCategoria'] = $resultado['descricaoCategoria'];
						$final['descricaoMarcador'] = $resultado['descricaoMarcador'];
						$final['latMarcador'] = $resultado['latMarcador'];
						$final['lngMarcador'] = $resultado['lngMarcador'];
						$final['dataMarcador'] = $resultado['dataMarcador'];
						$final['confirmacaoMarcador'] = $resultado['confirmacaoMarcador'];
							
			    	header("Content-type: application/json;");
				    header("Access-Control-Allow-Origin: *");
					if(isset($final)){
				    	$json = json_encode($final);
				    	echo $json;   
				    }
			break;
			case 'buscaTodasAsOcorrenciasPorLinha':													
					$idOnibus = $_GET['id'];
					$res = $mysqli->query("SELECT categoria.descricaoCategoria, linhaOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE onibus.idOnibus = marcador.idOnibus AND categoria.idCategoria = marcador.idCategoria AND marcador.idOnibus = '$idOnibus'");

						while($resultado = mysqli_fetch_array($res)){
							$final['tipo'] = $resultado['descricaoCategoria'];
							$final['data'] = $resultado['dataMarcador'];
							$marcadores[] = $final;	
						}
						header("Content-type: application/json;");
				    	header("Access-Control-Allow-Origin: *");
						if(isset($marcadores)){
					    	$json = json_encode($marcadores);
				    		echo $json;   
				    	}
			break;
		}
	?>