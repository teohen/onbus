<?php

	$mysqli = new mysqli("localhost", "root","","onbus");
	
	$tarefa = $_GET['tarefa'];

		switch ($tarefa) {
			//BUSCAR OCORRENCIAS PELA DATA
			case 'buscadata':
				$dataInicio = $_GET['inicio'];
				$dataFim = $_GET['fim'];

				$res = $mysqli->query("SELECT idMarcador, linhaOnibus, corOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND dataMarcador >= '$dataInicio' AND dataMarcador <= '$dataFim'");

						while ($resultado = mysqli_fetch_array($res)) {
							$final['idMarcador'] = $resultado['idMarcador'];		
							$final['linhaOnibus'] = $resultado['linhaOnibus'];
							$final['corOnibus'] = $resultado['corOnibus'];
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
						
					    $json = json_encode($marcadores);
					    echo $json;
				break;
					//BUSCA COM FILTRO E PAGINAS
			case 'buscapaginada':
				$filt = $_GET['filtro'];//RECEBE O FILTRO QUE VEM JUNTO COM A BUSCA PAGINADA. EX: CONFIRMACAO>3 
				$pag = $_GET['pag'];//RECEBE O NUMERO DA PAGINA DE RESULTADOS PARA SEREM MOSTRADOS

				$inicio = ($pag  - 1) * 10;//DEFINE A PRIMEIRA PARTE DA LIMITACAO NO BANCO. DE ONDE OS RESULTADOS VAO PARTIR
				$ultimo = $pag * 10;	//DEFINE A SEGUNDA PARTE DA LIMITACAO NO BANCO. ATE ONDE OS RESULTADOS PODEM IR
				
				$res = $mysqli->query("SELECT linhaOnibus, corOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND $filt ORDER BY marcador.idMarcador LIMIT $inicio,$ultimo");

						while ($resultado = mysqli_fetch_array($res)) {

							$final['linhaOnibus'] = $resultado['linhaOnibus'];
							$final['corOnibus'] = $resultado['corOnibus'];
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

			//CONFIRMAR UMA OCORRENCIA
			case 'confirma':
				if($post = file_get_contents("php://input")){
					$request  = json_decode($post, true);

					$id = $request['idMarcador'];
					$descricao = $request['descricaoConfirmacaoOcorrencia'];

					if($descricao != "n"){						
						$res = $mysqli->query("SELECT descricaoMarcador FROM marcador WHERE idMarcador = '$id'");
						$resultado = mysqli_fetch_array($res);
						$descricaoMarcador = $resultado['descricaoMarcador'];
						$descricaoFinal = $descricaoMarcador."\n".$descricao;					
						$mysqli->query("UPDATE marcador SET descricaoMarcador = '$descricaoFinal' WHERE idMarcador = '$id'");					
						$mysqli->query("UPDATE marcador SET confirmacaoMarcador = confirmacaoMarcador + 1 WHERE idMarcador = '$id'");
					}else{
						$mysqli->query("UPDATE marcador SET confirmacaoMarcador = confirmacaoMarcador + 1 WHERE idMarcador = '$id'");
					}
				}	
				break;
			//CADAST3RAR UMA OCORRENCIA	
			case 'cadastro':
				if($post = file_get_contents("php://input")){
					$request  = json_decode($post, true);				
					$idCategoria = $request['idCategoria'];
					$descricaoMarcador = $request['descricao'];
					$idOnibus = $request['idOnibus'];				
					$linhaOnibus = $request['linhaOnibus']; 
					$latMarcador = $request['lat']; 
					$lngMarcador  = $request['lng'];
					$dataMarcador = $request['data'];

					if($idOnibus == 0){
						$inser = $mysqli->query("INSERT INTO onibus (linhaOnibus, corOnibus, statusOnibus) VALUES ('$linhaOnibus', 'NULO', 0)");	
						$res = $mysqli->query("SELECT	idOnibus FROM onibus ORDER BY idOnibus DESC");
						$resultado = mysqli_fetch_array($res);
						$idOnibus = $resultado['idOnibus'];
						$insere = $mysqli->query("INSERT INTO marcador (idOnibus, idCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador) VALUES ('$idOnibus', '$idCategoria', '$descricaoMarcador', '$latMarcador', '$lngMarcador', '$dataMarcador', 1)");	
					}else{
						$inser = $mysqli->query("INSERT INTO marcador (idOnibus, idCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador) VALUES ('$idOnibus', '$idCategoria', '$descricaoMarcador', '$latMarcador', '$lngMarcador', '$dataMarcador', 1)");	
					}
				}else{
					$marcadores = null;
				}
				break;
			case 'buscalinhaonibus':
					$linhaOnibus = $_GET['linhaOnibus'];
					$res = $mysqli->query("SELECT idOnibus, linhaOnibus FROM onibus WHERE linhaOnibus LIKE  '".$linhaOnibus."%' AND onibus.statusOnibus <> 0 LIMIT 0,3");
						while ($resultado = mysqli_fetch_array($res)) {
							$final['id'] = $resultado['idOnibus'];
							$final['linhaOnibus'] = $resultado['linhaOnibus'];
							$marcadores[] = $final;	
				    	}
				    	if(isset($marcadores)){
					    	$json = json_encode($marcadores);
					    	echo $json;   
					    }else{
					    	
					    }
				break;
			case 'buscatipo':	
					$res = $mysqli->query("SELECT idCategoria, descricaoCategoria FROM categoria");
						while ($resultado = mysqli_fetch_array($res)) {
							$final['id'] = $resultado['idCategoria'];
							$final['descricaoCategoria'] = $resultado['descricaoCategoria'];
							$marcadores[] = $final;	
				    	}
				    	if(isset($marcadores)){
					    	$json = json_encode($marcadores);
					    	echo $json;   
					    }
				break;	
			case 'buscaocorrencias':													
					$dataInicio = $_GET['dataInicio'];
					$dataFim = $_GET['dataFim'];
					$linha = $_GET['linha'];
					$tipo = $_GET['tipo'];

					if($linha == "todas" && $tipo == "todas"){
						$res = $mysqli->query("SELECT idMarcador, linhaOnibus, corOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND dataMarcador >= '$dataInicio'");
					}else if ($linha != "todas" && $tipo == "todas") {
						$res = $mysqli->query("SELECT idMarcador, linhaOnibus, corOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND dataMarcador >= '$dataInicio' AND marcador.idOnibus = '$linha'");
					}else if($linha == "todas" && $tipo != "todas"){
						$res = $mysqli->query("SELECT idMarcador, linhaOnibus, corOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND dataMarcador >= '$dataInicio' AND marcador.idCategoria = '$tipo'");
					}else if($linha != "todas" && $tipo != "todas"){
						$res = $mysqli->query("SELECT idMarcador, linhaOnibus, corOnibus, descricaoCategoria, descricaoMarcador, latMarcador, lngMarcador, dataMarcador, confirmacaoMarcador FROM marcador, onibus, categoria WHERE marcador.idOnibus = onibus.idOnibus AND categoria.idCategoria = marcador.idCategoria AND dataMarcador >= '$dataInicio' AND marcador.idOnibus = '$linha' AND marcador.idCategoria = '$tipo'");
					}

					while ($resultado = mysqli_fetch_array($res)) {
						$final['linhaOnibus'] = $resultado['linhaOnibus'];
						$final['corOnibus'] = $resultado['corOnibus'];
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
		}
	?>