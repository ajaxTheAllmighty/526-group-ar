function showRoleContents(){
	var device = new SCFile('device');
	var data = [];
	var dQuery;
	var cnt = 0;
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	for var(i = 0; i < _lng(vars['$roles']); i++){
		dQuery = device.doSelect('ci.name="'+vars['$roles'][i]+'"');

	}
	sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Test </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Наименование ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Версия ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Статус </div></th>";
	for (var i =0; i<data.length; i++) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" + text-align:center > <a href=\"scactivelink://sccmSoftware:"+data[i]['key']+"\">Добавить</a></td>";
			if(data[i]['name']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['name']+"</td>";		//ResourceID
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['ver']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['ver']+"</td>";	//SerialNumber0
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['status']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['status']+"</td>";		//Model00
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			sHtmlReturn += "<tr>";
	}
	sHtmlReturn += "</table>" + sCR;
	return sHtmlReturn;
}
