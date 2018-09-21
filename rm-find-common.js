function getCommonItems(input){

	var index=[];
	var match = 1;
	var out = [];
	for(var i=0; i < input.length; i++){

		for(var k=0; k<input[i][1].length; k++){

			match = 1;
			for(var next = i+1; next<input.length; next++){
				if(input[i][1][k] == input[next][1][k]){
					index = (k);

					match++;

					if(match == input.length){
						if(findAccess(input,k,index)){

							out.push(input[i][1][k],input[i][2][k],input[i][3][k]);
							match = 1;
						}
					}
				}
			}
		}
	}
	return out;
}

function findAccess(input,originalIndex,index){
	var match = 1;
		for(var j = 1; j < input.length; j++){

			if(input[0][2][originalIndex]==input[j][2][index]){

				match++;

				if(match == input.length){
					return findRight(input,originalIndex,index);
				}
			}
			else match = 0;
		}
}

function findRight(input,originalIndex,index){
	var match = 1;

		for(var j = 1; j <input.length; j++){

			if(input[0][3][originalIndex]==input[j][3][index]){

				match++;

				if(match == input.length) return true;
			}
			else match = 0;
		}
}
