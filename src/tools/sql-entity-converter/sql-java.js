
// import  sqlParser  from 'js-sql-parser';
import * as sqlParser from './sql-parser.min.js';
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
				function (m, i) {
				    return args[i];
				});
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//下划线转驼峰
function toHumpFunc(value) {
    value = value.toLowerCase();
    return value.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}

//驼峰转下划线
function toUnderLineFunc(value) {
  return value.replace(/([A-Z])/g,"_$1").toLowerCase();
}

//首字母大写
function firstUpper(name){
	return name.substring(0, 1).toUpperCase() + name.substring(1);
}

function getNowFormatDate() {
    var now = new Date();
    var year = now.getFullYear();        //年
    var month = now.getMonth() + 1;   //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();         //分
    var ss = now.getSeconds();           //秒
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}

export function startGen(sqlText,property,packagePath,author) {

  try {
        var clasResult = convert(window.SqlParser.parse(sqlText),property,packagePath,author);
        return clasResult;
    	
    } catch (e) {
    	return "输入的SQL数据格式不正确："+e.message
    }
}

function convert(result,property,packagePath,authorName){
	var columns = result[0]['columns'];
    var tableName = result[0]['name'];
    var options = result[0]['options'];
    var className = firstUpper(toHumpFunc(tableName));
    
    
    var classDesc='';
    for(var i=0;i<options.length;i++){
        var key = options[i]['key'];
        if(key=='COMMENT'){
        	classDesc=options[i]['value'];
        }
    }
  
    var author = "Sun.yk";
    if(authorName){
      author = authorName;
    }
    var genCode = "package top.sharktools\n\n";
    if(packagePath){
      genCode ="package "+packagePath+"\n\n";
    }
		genCode += "/**\n * @Description:" + classDesc + "\r\n * @Author "+ author +"\r\n * @Date : "+getNowFormatDate()+"\r\n */\r\n";
    if(property == 'swagger'){
      genCode += '@ApiModel("'+classDesc+'")\r\n';
    }
    genCode += 'public class '+className+' {\r\n\r\n';
    var genMethod = '';

    for(var i=0;i<columns.length;i++){
        var type = columns[i]['type'];
        if(type=='column'){
            var name = columns[i]['name'];
            var comment = columns[i]['comment'];
            var dataType = columns[i]['data_type']['type'];
            
            if(dataType=='INT'){
            	dataType='Integer';
            }else if(dataType=='BIGINT'){
            	dataType='Long';
            }else if(dataType=='VARCHAR'){
            	dataType='String';
            }else if(dataType=='TINYINT'){
            	dataType='Integer';
            }else if(dataType=='DOUBLE'){
            	dataType='Double';
            }else if(dataType=='DECIMAL'){
            	dataType='BigDecimal';
            }else if(dataType=='DATETIME' || dataType=='DATE'){
            	dataType='Date';
            }else if(dataType=='TEXT'){
            	dataType='String';
            }else if(dataType=='CHAR'){
            	dataType='String';
            }
            // 属性名
            name = toHumpFunc(name);
            
            // 注释
            if(property == 'text'){
              genCode += "    /**\r\n     * " + comment + "\r\n     */\n";
            }

            if(property == 'swagger'){
              genCode += "    @ApiModelProperty(value = \"" + comment + "\")\n";
            }
            
            
            // 生成属性
            genCode += '    private '+dataType+' '+name+';\r\n';
            
            // 生成get和set
            genMethod += "    public {0} {1}() {\r\n      return this.{2};\n    }\r\n\r\n".format(dataType,toHumpFunc('get_'+name),name);
            genMethod += "    public {0} {1}({2} {3}) {\r\n      this.{4} = {5};\n    }\r\n\r\n".format('void',toHumpFunc('set_'+name),dataType,name,name,name);
        }
    }
    return genCode+'\r\n\r\n'+genMethod+'\r\n}';
}


