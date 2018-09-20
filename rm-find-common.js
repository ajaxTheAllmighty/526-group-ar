//test([[1,['bzs11','bzs12','bzs13'],['acs11','acs12','acs13'],['ri11','ri12','ri13']], [2,['bzs21','bzs22','bzs23'],['acs21','acs22','acs23'],['ri21','ri22','ri23']]]);
function getCommonItems(input,count){
	var match = 1;
	var out = [];
	var index = [];
	for (var i = 0; i < input.length; i++){
		for(var j = 1; j < input[i].length; j++){
			for(var k = 0; k < input[i][j]; k++){
				for(var itemCount = 1; itemCount < count; itemCount++){
					if(input[i][j][k].indexOf(input[itemCount][j][k])!=-1){
						index[0] = k;
						index.push(input[i][j][k].indexOf(input[itemCount][j][k]));
						match++;
						if(match == count){
							if(findAccess(input,index)){
								for(var indexCount = 0; i < index.length; indexCount++){
									out.push([input[indexCount][1][indexCount],input[indexCount][2][indexCount],input[indexCount][3][indexCount]]);
								}
							}
						}
					}
				}
			}
		}
	}
	return out;
}

function findAccess(input,originalIndex,index){
	var match = 0;
	for(var i = 0; i <input.length; i++){
		for(var j = i+1; j < input.length; j++){
			if(input[i][2][originalIndex]==input[j][2][index[i]]){
				print('match accs '+input[i][2][originalIndex] +' '+input[i][2][index[i]]);
				match++;
				if(match == index.length){
					return findRight(input,originalIndex,index);
				}
			}
		}
	}
}

function findRight(input,index){
	var match = 1;
	for(var i = 0; i <input.length; i++){
		for(var j = i+1; j <input.length; j++){
			if(input[i][3][index[i]].indexOf(input[j][3][index[i]])!= -1){
				match++;
				if(match == index.length) return true;
			}
		}
	}
}
