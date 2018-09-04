var serv = new SCFile('device');
var rel = new SCFile('cirelationship');
var rc = serv.doSelect('type="bizservice" and company="'+vars['$lo.operator']['company']+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.")');
	do{
		var rcc=rel.doSelect('logical.name="'+serv['logical.name']+'"')
		do{
			if(!(-1==rel['cis.related'].indexOf('acss'))){
				vars['$acss']=_ins(vars['$acss'],0,1,rel['cis.related'].indexOf('acss'));
			}
		}while(rel.getNext() == RC_SUCCESS)
	}while(serv.getNext() == RC_SUCCESS)
