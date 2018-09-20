function common(bzs,bzsID,accs,accsID,right,rightID,recipientCount){
	var count = 0;
	var newBzs=[];
	var newBzsID=[];
	var newAccs=[];
	var newAccsID=[];
	var newRight=[];
	var newRightID=[];
	while(count < recipientCount){
		for(var bCount = 0; bCount < bzsID.length; bCount++){
			if(bzsID[bCount] == bzsID[bCount+1]){
				for(var aCount = bCount; aCount < accsID.length; aCount++){
					if(accsID[aCount] == accsID[aCount+1]){
						for(var rCount = bCount; rCount< rightID.length; rCount++){
							if(rightID[rCount] == rightID[rCount+1]){
								newBzs.push(bzs[bCount]);
								newBzsID.push(bzsID[bCount]);
								newAccs.push(accs[bCount]);
								newAccsID.push(accsID[bCount]);
								newRight.push(right[bCount]);
								newRightID.push(rightID[bCount]);
								count++;
							}
						}
					}
				}
			}
		}
	}
	return [newBzs, newBzsID, newAccs, newAccsID, newRight, newRightID]
}
