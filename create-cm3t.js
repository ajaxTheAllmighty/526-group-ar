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
