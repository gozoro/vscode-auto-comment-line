"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const vscode = require("vscode");
const path   = require("path");
const fs     = require("fs");
const rules  = require("./rules");

const EXTENSION_NAME = 'auto-comment-line';



var defaultLanguageConfigurationFiles;
var extensionLanguageEnterRules;
var cache = {};



async function activate(context)
{
	console.log(EXTENSION_NAME, ': extension is activated');

	init();

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(сhangeConfigurationHandler));
	context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(openTextDocumentHandler));

	//for already opened tabs
	for (const editor of vscode.window.visibleTextEditors)
	{
		updateLanguageConfiguration(editor.document.languageId);
	}
}


function init()
{
	defaultLanguageConfigurationFiles = getDefaultLanguageConfigurationFiles();
	extensionLanguageEnterRules       = getExtensionLanguageEnterRules();
}


function getDefaultLanguageConfigurationFiles()
{
	let languageConfigurationFiles = {}

	for(let ext of vscode.extensions.all)
	{
		for(let lang of ext?.packageJSON?.contributes?.languages ?? [])
		{
			if(lang.configuration != null && !languageConfigurationFiles[lang.id])
			{
				languageConfigurationFiles[lang.id] = path.resolve(ext.extensionPath, lang.configuration);
			}
		}
	}

	return languageConfigurationFiles;
}



function isLanguageSupported(languageId)
{
	return languageId in defaultLanguageConfigurationFiles;
}



function getExtensionConfiguration()
{
	return vscode.workspace.getConfiguration(EXTENSION_NAME);
}



function getExtensionLanguageEnterRules()
{
	let langRules = {};
	let extensionConfig = getExtensionConfiguration();
	const afterTwoLines = extensionConfig.afterTwoLines;


	let variants = [
		'tripleSlash',
		'doubleSlash',
		'hash',
		'semicolon',
		'doubleHyphen'
	];


	for(let v of variants)
	{
		for(let langId of extensionConfig[v + 'Langs'] )
		{
			langRules[langId] = [];

			for(let rule of rules[v + 'Rules'])
			{
				if(afterTwoLines)
				{
					rule.previousLineText = rules[v + 'Prev'];
				}

				langRules[langId].push(rule);
			}
		}
	}

	return langRules;
}


async function сhangeConfigurationHandler(event)
{
	if (event.affectsConfiguration(EXTENSION_NAME))
	{
		cache = {};
		extensionLanguageEnterRules = getExtensionLanguageEnterRules();
	}
}


async function openTextDocumentHandler(document)
{
	let langId = document.languageId;

	if (isLanguageSupported(langId))
	{
		updateLanguageConfiguration(langId);
	}
}


function parsePattern (pattern)
{
	if(typeof pattern === 'string')
	{
		return new RegExp(pattern)
	}

	return new RegExp(pattern.pattern, pattern.flags)
}


function parseEnterRules(defaultRules)
{
	let parsedRules = [];

	for(let rule of defaultRules)
	{
		const newRule = {};

		if(rule.beforeText != null)
			newRule.beforeText = parsePattern(rule.beforeText);

		if(rule.afterText != null)
			newRule.afterText = parsePattern(rule.afterText);

		if(rule.previousLineText != null)
			newRule.previousLineText = parsePattern(rule.previousLineText);

		if(rule.action != null)
		{
			newRule.action = {};

			if(rule.action.appendText != null)
			{
				newRule.action.appendText = rule.action.appendText;
			}

			if(rule.action.removeText != null)
			{
				newRule.action.removeText = rule.action.removeText;
			}

			if(rule.action.indent != null)
			{
				let indent = rule.action.indent;
				indent = indent[0].toUpperCase() + indent.slice(1);
				newRule.action.indentAction = vscode.IndentAction[indent];
			}
		}

		parsedRules.push(newRule);
	}

	return parsedRules;
}



function updateLanguageConfiguration(langId)
{
	if(langId in cache)
	{
		return;
	}

	if(defaultLanguageConfigurationFiles[langId])
	{
		let langPath = defaultLanguageConfigurationFiles[langId];
		let langConf = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
		let defaultEnterRules =  langConf.onEnterRules ?? [];

		defaultEnterRules = parseEnterRules(defaultEnterRules);

		if(extensionLanguageEnterRules[langId])
		{
			let extensionEnterRules = extensionLanguageEnterRules[langId];

			let mergedRules = [...defaultEnterRules, ...extensionEnterRules];

			vscode.languages.setLanguageConfiguration(langId, {onEnterRules: mergedRules});
		}
	}

	cache[langId] = true;

	console.log(EXTENSION_NAME, ': update language configuration: ', langId);
}


// this method is called when your extension is deactivated
function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;









