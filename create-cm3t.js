for(var i = 0; i < approvedAR.length; i++){
	var f = new SCFile('accessRequest');
	var rc = f.doSelect('id="'+approvedAR[i]+'"')
	if(rc == RC_SUCCESS){
		vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.ci.name'])
		vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['date.open'])
		vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		var ar = new SCFile('accessRequest');
		var upd = ar.doSelect('id="'+approvedAR[i]+'" and category="Изменение"');
		f['sd.id'] = incidentID;
		f.doUpdate();
	}
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
