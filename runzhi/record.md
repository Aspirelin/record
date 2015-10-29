### 习惯的力量是伟大的，切莫忽视点滴积累的力量。
#### 2015.10.22 working record!
*   当一行内容超出容器宽度时，三点省略的效果实现

	display: inline-block;   
	overflow: hidden;	
	white-space: nowrap;	
	text-overflow: ellipsis;   
	max-width: 450px; // 其中一个必要的宽度限制是必要的
	
*   markdown中如果现实一段代码，代码每一行前后都要四个空格，或者制表符    
    1、然后三个`英文反引号包裹`    
    2、然后前后要空一格

	```
	p2.after('show', function() {
    	if (!loadedData) {
        	retrieveDetailHtml(function(data) {
            	var html = data.html;
            	p2.set('content', html);
            	Emoji.render('td.emoji-explain');
            	p2.element.find('[data-role=content]').width(320);
        	});
    	}
	});
	```
*   Jquery中has的用法     
	has() 将匹配元素集合缩减为拥有匹配指定选择器或 `DOM 元素`的后代的子集   
	return: 返回时符合筛选条件的子集    
	
	```
	$("ul").has("li").addClass("full");
	```
*   Jquery中

