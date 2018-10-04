function docnew_cm3t(rec){
	var rteReturnValue = new SCDatum();
  	var rteNames = new SCDatum();
  	var rteVals = new SCDatum();
	rteNames.setType(8); //type array
	rteNames.push("file");        //Notification Name - INTO.NAME
	rteNames.push("name");      //Current File - INTO.FILE
	rteNames.push("prompt");
	rteNames.push("description");
	rteVals.setType(8);
	rteVals.push(rec); // Interaction Record
	rteVals.push("cm3t");	//RuleSet Name //TODO: на текущий момент такого не существует
	rteVals.push(true)
	rteVals.push("add")
	system.functions.rtecall("callrad",rteReturnValue,"document.new",rteNames,rteVals,false);
	return rec['number']
}

function createCM3T(CHANGE) {
	var ar = new SCFile('accessRequest');
	var rc = file.doSelect('sd.id="'+CHANGE['id']+'"');
	var file = new SCFile('cm3t')
	if(rc == RC_SUCCESS){
		do{
			if(ar['type'] = 'Ролевой'){
				var d = new SCFile('device')
				var rrc = d.doSelect('logical.name="'+ar['role.logical.name']+'"')
				if(rrc == RC_SUCCESS){
					for(var i = 0; i < _lng(bzs.id); i++){
						file['category'] = ar['category'];
						file['affected.item'] = CHANGE['affected.item'];
						file['initial.impact'] = 4
						file['severity'] = 'Низкая'
						file['priority.code'] = 3
						file['risk.assessment'] = 1
						file['planned.start'] = ar['start.date']
						file['planned.end'] = ar['end.date']
						file['need.accept'] = true
						file['brief.desc'] = ar['category']
						file['description'] = 'Требуется '+ar['category'] +'в связи с '+ar['description']
						docnew_cm3t(file)
					}
				}
			}
			else{
				file['category'] = ar['category'];
				file['affected.item'] = CHANGE['affected.item'];
				file['initial.impact'] = 4
				file['severity'] = 'Низкая'
				file['priority.code'] = 3
				file['risk.assessment'] = 1
				file['planned.start'] = ar['start.date']
				file['planned.end'] = ar['end.date']
				file['need.accept'] = true
				file['brief.desc'] = ar['category']
				file['description'] = 'Требуется '+ar['category'] +'в связи с '+ar['description']
				docnew_cm3t(file)
			}
			// ?????? file['assign.dept']
		}while(file.getNext() == RC_SUCCESS)
	}
}
