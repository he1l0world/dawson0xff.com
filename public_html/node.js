function login(){
	//let username = document.getElementById('username').value;
	//let password = document.getElementById('password').value;
	let username = $('#username').val();
	let password = $('#password').val();
	let account = {u:username, p: password};
	let info = JSON.stringify(account);

	$.ajax({
		url: "/login/"+username+'/'+password,
		method: "POST",
		data: {account: info}, 
		success: function(result){
			alert(result);
		},
  	});

}

function create(){
	//let username = document.getElementById('username').value;
	//let password = document.getElementById('password').value;
	let username = $('#username').val();
	let password = $('#password').val();
	let account = {u:username, p: password};
	let info = JSON.stringify(account);

	$.ajax({
		url: '/create/'+username+'/'+password,
		method: "POST",
		data: {account: info}, 
		success: function(result){
			alert(result);
		}
  	});

}