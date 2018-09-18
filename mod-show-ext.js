function extAccessTable(){
	var file = new SCFile('Subscription');
	var cont = new SCFile('contacts');
	cont.doSelect('full.name="'+vars['$recipient']+'"');
	//var data = [];
	//var cnt = 0;
	//var sCR = "\n";
	//var sHtmlReturn = getCSS();
	var rc = file.doSelect('subscriber="'+cont['contact.name']+'" and type="Расширенный доступ"');
	if(rc==RC_SUCCESS){
		do{
			//data[cnt] = {id:file['subscriptionID'],serv:file['displayName'],acss:file['acss.name'],right:file['right.name']};
			//cnt++;
			vars['$bzs'] = _ins(vars['$bzs'],file['displayName']);
			vars['$bzsID'] = _ins(vars['$bzsID'],file['serviceName']);
			vars['$accs'] = _ins(vars['$accs'],file['acss.name']);
			vars['$accsID'] = _ins(vars['$accsID'],file['acss.id']);
			vars['$right'] = _ins(vars['$right'],file['right.name']);
			vars['$rightID'] = _ins(vars['$rightID'],file['right.id']);
			vars['$subId'] = _ins(vars['$subId'],file['subscriptionID']);
		}while(file.getNext() == RC_SUCCESS)
	}
}
	/*sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Действие </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Услуга </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Обьект доступа </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Право доступа </div></th>";
	for (var i =0; i<data.length; i++) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" + text-align:center > <a href=\"scactivelink://device:"+data[i]['id']+"\">Изменить</a></td>";
			if(data[i]['roleid']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['serv']+"</td>";		//ResourceID
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['rolename']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['acss']+"</td>";	//SerialNumber0
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['rolename']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['right']+"</td>";	//SerialNumber0
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
		sHtmlReturn += "<tr>";
	}
	sHtmlReturn += "</table>" + sCR;
	return sHtmlReturn;
}*/
