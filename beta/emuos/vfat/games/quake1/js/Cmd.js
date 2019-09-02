// noinspection DuplicatedCode
Cmd = {};

// noinspection DuplicatedCode
Cmd.id = 'Cmd';

// noinspection DuplicatedCode
Cmd.alias = [];

// noinspection DuplicatedCode
Cmd.Wait_f = function() {
	Sys.DPrint('Cmd.Wait_f()');

	Cmd.wait = true;
};

// noinspection DuplicatedCode
Cmd.text = '';

// noinspection DuplicatedCode
Cmd.Execute = function() {
	// Sys.DPrint('Cmd.Execute()');

	var c, line = '', quotes = false;

	while (Cmd.text.length !== 0) {
		c = Cmd.text.charCodeAt(0);
		Cmd.text = Cmd.text.substring(1);

		if (c === 34) {
			quotes = !quotes;
			line += '\42';
			continue;
		}

		if (((quotes === false) && (c === 59)) || (c === 10)) {
			if (line.length === 0) {
				continue;
			}

			Cmd.ExecuteString(line);

			if (Cmd.wait === true) {
				Cmd.wait = false;
				return;
			}

			line = '';

			continue;
		}

		line += String.fromCharCode(c);
	}

	Cmd.text = '';
};

// noinspection DuplicatedCode
Cmd.StuffCmds_f = function() {
	Sys.DPrint('Cmd.StuffCmds_f()');

	var i, s = false, build = '', c;

	for (i = 0; i < COM.argv.length; ++i) {
		c = COM.argv[i].charCodeAt(0);

		if (s === true) {
			if (c === 43) {
				build += ('\n' + COM.argv[i].substring(1) + ' ');
				continue;
			}

			if (c === 45) {
				s = false;
				build += '\n';
				continue;
			}

			build += (COM.argv[i] + ' ');

			continue;
		}

		if (c === 43) {
			s = true;
			build += (COM.argv[i].substring(1) + ' ');
		}
	}

	if (build.length !== 0) {
		Cmd.text = build + '\n' + Cmd.text;
	}
};

// noinspection DuplicatedCode
Cmd.Exec_f = function() {
	Sys.DPrint('Cmd.Exec_f()');

	if (Cmd.argv.length !== 2) {
		Con.Print('exec <filename> : execute a script file\n');
		return;
	}

	var f = COM.LoadTextFile(Cmd.argv[1]);

	if (f == null) {
		Con.Print('couldn\'t exec ' + Cmd.argv[1] + '\n');
		return;
	}

	Con.Print('execing ' + Cmd.argv[1] + '\n');
	Cmd.text = f + Cmd.text;
};

// noinspection DuplicatedCode
Cmd.Echo_f = function() {
	Sys.DPrint('Cmd.Echo_f()');

	var i;

	for (i = 1; i < Cmd.argv.length; ++i) {
		Con.Print(Cmd.argv[i] + ' ');
	}

	Con.Print('\n');
};

// noinspection DuplicatedCode
Cmd.Alias_f = function() {
	Sys.DPrint('Cmd.Alias_f()');

	var i;

	// noinspection DuplicatedCode
	if (Cmd.argv.length <= 1) {
		Con.Print('Current alias commands:\n');

		for (i = 0; i < Cmd.alias.length; ++i) {
			Con.Print(Cmd.alias[i].name + ' : ' + Cmd.alias[i].value + '\n');
		}
	}

	var s = Cmd.argv[1], value = '';

	for (i = 0; i < Cmd.alias.length; ++i) {
		if (Cmd.alias[i].name === s) {
			break;
		}
	}

	var j;

	for (j = 2; j < Cmd.argv.length; ++j) {
		value += Cmd.argv[j];

		if (j !== Cmd.argv.length) {
			value += ' ';
		}
	}

	Cmd.alias[i] = {name: s, value: value + '\n'};
};

// noinspection DuplicatedCode
Cmd.argv = [];
// noinspection DuplicatedCode
Cmd.functions = [];

// noinspection DuplicatedCode
Cmd.Init = function() {
	Sys.DPrint('Cmd.Init()');

	Cmd.AddCommand('stuffcmds', Cmd.StuffCmds_f);
	Cmd.AddCommand('exec', Cmd.Exec_f);
	Cmd.AddCommand('echo', Cmd.Echo_f);
	Cmd.AddCommand('alias', Cmd.Alias_f);
	Cmd.AddCommand('cmd', Cmd.ForwardToServer);
	Cmd.AddCommand('wait', Cmd.Wait_f);
};

// noinspection DuplicatedCode
Cmd.TokenizeString = function(text) {
	// Sys.DPrint(Cmd.id, 'TokenizeString', arguments);

	Cmd.argv = [];

	var i, c;

	// noinspection DuplicatedCode
	for (; ;) {
		for (i = 0; i < text.length; ++i) {
			c = text.charCodeAt(i);

			if ((c > 32) || (c === 10)) {
				break;
			}
		}

		if (Cmd.argv.length === 1) {
			Cmd.args = text.substring(i);
		}

		if ((text.charCodeAt(i) === 10) || (i >= text.length)) {
			return;
		}

		text = COM.Parse(text);

		if (text == null) {
			return;
		}

		Cmd.argv[Cmd.argv.length] = COM.token;
	}
};

// noinspection DuplicatedCode
Cmd.AddCommand = function(name, command) {
	// Sys.DPrint(Cmd.id, 'AddCommand', arguments);
	Sys.DPrint('Cmd.AddCommand(' + name + ')');

	var i;

	for (i = 0; i < Cvar.vars.length; ++i) {
		if (Cvar.vars[i].name === name) {
			Con.Print('Cmd.AddCommand: ' + name + ' already defined as a var\n');
			return;
		}
	}

	for (i = 0; i < Cmd.functions.length; ++i) {
		if (Cmd.functions[i].name === name) {
			Con.Print('Cmd.AddCommand: ' + name + ' already defined\n');
			return;
		}
	}

	Cmd.functions[Cmd.functions.length] = {name: name, command: command};
};

// noinspection DuplicatedCode
Cmd.CompleteCommand = function(partial) {
	Sys.DPrint(Cmd.id, 'CompleteCommand', arguments);

	if (partial.length === 0) {
		return;
	}

	var i;

	for (i = 0; i < Cmd.functions.length; ++i) {
		if (Cmd.functions[i].name.substring(0, partial.length) === partial) {
			return Cmd.functions[i].name;
		}
	}
};

// noinspection DuplicatedCode
Cmd.ExecuteString = function(text, client) {
	// Sys.DPrint(Cmd.id, 'ExecuteString', arguments);

	Cmd.client = client;
	Cmd.TokenizeString(text);

	if (Cmd.argv.length === 0) {
		return;
	}

	var name = Cmd.argv[0].toLowerCase();
	var i;

	for (i = 0; i < Cmd.functions.length; ++i) {
		if (Cmd.functions[i].name === name) {
			Cmd.functions[i].command();
			return;
		}
	}

	for (i = 0; i < Cmd.alias.length; ++i) {
		if (Cmd.alias[i].name === name) {
			Cmd.text = Cmd.alias[i].value + Cmd.text;
			return;
		}
	}

	if (Cvar.Command() !== true) {
		Con.Print('Unknown command "' + name + '"\n');
	}
};

// noinspection DuplicatedCode
Cmd.ForwardToServer = function() {
	Sys.DPrint('Cmd.ForwardToServer()');

	if (CL.cls.state !== CL.active.connected) {
		Con.Print('Can\'t "' + Cmd.argv[0] + '", not connected\n');
		return;
	}

	if (CL.cls.demoplayback === true) {
		return;
	}

	var args = String.fromCharCode(Protocol.clc.stringcmd);

	if (Cmd.argv[0].toLowerCase() !== 'cmd') {
		args += Cmd.argv[0] + ' ';
	}

	if (Cmd.argv.length >= 2) {
		args += Cmd.args;
	} else {
		args += '\n';
	}

	MSG.WriteString(CL.cls.message, args);
};