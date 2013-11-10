// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var todolist = [];

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:"Nuova ToDo",
    backgroundColor:'#fff',
    layout: "vertical"
});

var titleView = Ti.UI.createView({
	//borderWidth: 1,
	top: "10dp",
	width: "95%",
	height: "50dp"
});

win1.add(titleView);

var titleLbl = Ti.UI.createLabel({
	left: "5dp",
	text: "Titolo",
	color: "black"
});

var titleTxt = Ti.UI.createTextField({
	hintText: "Inserisci una todo",
	right: "5dp",
	height: "45dp",
	right: "5dp",
	left: "85dp",
	font: {fontSize: "14dp"},
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

titleView.add(titleLbl);
titleView.add(titleTxt);

var locationView = Ti.UI.createView({
	//borderWidth: 1,
	top: "20dp",
	width: "95%",
	height: "50dp"
});

win1.add(locationView);

var locationLbl = Ti.UI.createLabel({
	left: "5dp",
	text: "Location",
	color: "black"
});

var locationTxt = Ti.UI.createTextField({
	hintText: "inserire una location",
	//right: 5,
	height: "45dp",
	left: "85dp",
	width: "180dp",
	font: {fontSize: "14dp"},
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	//borderWidth: 1
});

locationView.add(locationLbl);
locationView.add(locationTxt);

var alarmView = Ti.UI.createView({
	//borderWidth: 1,
	top: "20dp",
	width: "95%",
	height: "50dp"
});

win1.add(alarmView);

var alarmLbl = Ti.UI.createLabel({
	left: "5dp",
	text: "Allarme",
	color: "black"
});

var alarmSwitch = Ti.UI.createSwitch({
	value: false,
	left: "85dp"
});

alarmView.add(alarmLbl);
alarmView.add(alarmSwitch);

var dueDateView = Ti.UI.createView({
	//borderWidth: 1,
	top: "20dp",
	width: "95%",
	height: "50dp"
});

win1.add(dueDateView);

var dueDateLbl = Ti.UI.createLabel({
	left: "5dp",
	text: "Scadenza",
	color: "black"
});

var dueDateBtn = Ti.UI.createButton({
	title: "Oggi",
	right: "5dp",
	left: "85dp",
	height: "40dp",
	width: "150dp",
});

dueDateView.add(dueDateLbl);
dueDateView.add(dueDateBtn);


var addToDoBtn = Ti.UI.createButton({
	width: "180dp",
	height: "60dp",
	top: "15dp",
	title: "Aggiungi ToDO"
})

win1.add(addToDoBtn);

var selectDateWin = Ti.UI.createWindow({
	backgroundColor: "white",
	title: "Seleziona una data"
});

var picker = Ti.UI.createPicker({
	minDate: new Date(2012,0,1),
	maxDate: new Date(2014,11,31),
	value: new Date(),
	type: Ti.UI.PICKER_TYPE_DATE,
	top: "80dp"
});

var closeWinBtn = Ti.UI.createButton({
	title: "Chiudi",
	top: "10dp",
	height: "40dp",
	width: "100dp"
})

selectDateWin.add(closeWinBtn);
selectDateWin.add(picker);


picker.addEventListener('change', function(e) {
	dueDateBtn.title = String.formatDate(e.value, "medium");
});



closeWinBtn.addEventListener('click', function() {
	//dueDateBtn.title = String.formatDate(picker.getValue(), "medium");
	//picker.value = new Date(2013,0,1);
	selectDateWin.close();
})


dueDateBtn.addEventListener('click', function() {

	selectDateWin.open({modal:true});
})


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:"Nuova ToDo",
    window:win1
});


var win2 = Titanium.UI.createWindow({  
    title:"Elenco ToDo",
    backgroundColor:'#fff',
});

var tv = Ti.UI.createTableView();

win2.add(tv);

addToDoBtn.addEventListener('click', function() {
	if (!titleTxt.value) {
		alert("Inserisci almeno il titolo, sciocco!");
	}
	var todo = {
		title: titleTxt.value,
		location: locationTxt.value,
		alarm: alarmSwitch.value,
		dueDate: dueDateBtn.title
	};
	todo.hasChild = true;
	todo.color = "black";
	todo.height = "60dp";
	todolist.push(todo);
	tv.data = todolist;
	titleTxt.value = "";
	locationTxt.value = "";
	alarmSwitch.value = false;
	dueDateBtn.title = "Oggi";
	//tv.appendRow(todo);
	tabGroup.setActiveTab(1);
	
});

tv.addEventListener('click', function(e) {
	titleTxt.value = e.rowData.title;
	locationTxt.value = e.rowData.location;
	alarmSwitch.value = e.rowData.alarm;
	dueDateBtn.title = e.rowData.dueDate;
	tabGroup.setActiveTab(0);
});




var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Lista ToDOs',
    window:win2
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
