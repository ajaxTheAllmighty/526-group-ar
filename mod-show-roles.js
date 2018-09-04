function roleAccessTable(){
	var file = new SCFile('Subscription');
	var cont = new SCFile('contacts');
	cont.doSelect('full.name="'+vars['$recipient']+'"');
	var data = [];
	var cnt = 0;
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	var rc = file.doSelect('subscriber="'+cont['contact.name']+'" and type="Ролевой доступ"');
	if(rc==RC_SUCCESS){
		do{
			data[cnt] = {roleid:file['role.id'],rolename:file['role.name'],id:file['subscriptionID']};
			cnt++;
		}while(file.getNext() == RC_SUCCESS)
	}
	sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Действие </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Роль </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Имя роли </div></th>"
	for (var i =0; i<data.length; i++) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" + text-align:center > <a href=\"scactivelink://device:"+data[i]['id']+"\">Извменить</a></td>";
			if(data[i]['roleid']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['roleid']+"</td>";		//ResourceID
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['rolename']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['rolename']+"</td>";	//SerialNumber0
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
		sHtmlReturn += "<tr>";
	}
	sHtmlReturn += "</table>" + sCR;
	return sHtmlReturn;
}
