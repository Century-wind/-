//打开数据库，创建MyData数据库进行访问
var dataform = null;
var db = openDatabase('MyData', '', 'My Database', 102400);

function init() {
    dataform = document.getElementById("dataform");
    showAllData(); //调用函数显示数据
}

function removeAllData() {
    if (dataform.childNodes != null) { //擦除数据以便重新写入
        for (var i = dataform.childNodes.length - 1; i >= 0; i--) {
            dataform.removeChild(dataform.childNodes[i]);
        }
    }
    //创建数据表
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    //    var th3 = document.createElement('th');
    //    th1.innerHTML = '姓名';
    th1.innerHTML = '留言';
    th2.innerHTML = '时间';
    tr.appendChild(th1);
    tr.appendChild(th2);
    //    tr.appendChild(th3);
    dataform.appendChild(tr);
}

function showData(row) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.innerHTML = row.text;
    //    var td2 = document.createElement('td');
    //    td2.innerHTML = row.message;
    var td2 = document.createElement('td');
    var t = new Date();
    t.setTime(row.time);
    td2.innerHTML = t.toLocaleDateString() + " " + t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    //    tr.appendChild(td3);
    dataform.appendChild(tr);
}

function showAllData() {

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(text TEXT, time TEXT)', []);
        tx.executeSql('SELECT * FROM MsgData', [], function (tx, rs) {
            removeAllData();
            for (var i = 0; i < rs.rows.length; i++) {
                showData(rs.rows.item(i));
            }
        });
    });
}

function addData(text, time) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO MsgData VALUES(?,?)', [text, time], function (tx, rs) {
            alert("成功保存数据！");
        }, function (tx, error) {
            alert(error.source + "::" + error.text);
        });
    });
}

function saveData() {
    var text = document.getElementById('text').value;
    //    var memo = document.getElementById('memo').value;
    var time = new Date().getTime();
    addData(text, time);
    showAllData();
}
