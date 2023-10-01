'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const vscode = require("vscode");


const doubleSlashRules = [
	{
		beforeText: /^\s*\/{2}\s+(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '// ' }
	},
	{
		beforeText: /^\s*\/{2}\S*(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '//' }
	},
];
const doubleSlashPrev = /^\s*\/{2}/;



const tripleSlashRules = [
	{
		beforeText: /^\s*\/{3}\s+(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '/// ' }
	},
	{
		beforeText: /^\s*\/{3}\S*(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '///' }
	},
];
const tripleSlashPrev = /^\s*\/{3}/;



const hashRules = [
	{
		beforeText: /^\s*\#\s+(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '# ' }
	},
	{
		beforeText: /^\s*\#\S*(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '#' }
	},
];
const hashPrev = /^\s*\#/;



const semicolonRules = [
	{
		beforeText: /^\s*\;\s+(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '; ' }
	},
	{
		beforeText: /^\s*\;\S*(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: ';' }
	},
];
const semicolonPrev = /^\s*\;/;


const doubleHyphenRules = [
	{
		beforeText: /^\s*\-{2}\s+(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '-- ' }
	},
	{
		beforeText: /^\s*\-{2}\S*(\s|\S)*$/,
		action: { indentAction: vscode.IndentAction.None, appendText: '--' }
	},
];
const doubleHyphenPrev = /^\s*\-{2}/;


exports.doubleSlashRules  = doubleSlashRules;
exports.tripleSlashRules  = tripleSlashRules;
exports.hashRules         = hashRules;
exports.semicolonRules    = semicolonRules;
exports.doubleHyphenRules = doubleHyphenRules;

exports.doubleSlashPrev  = doubleSlashPrev;
exports.tripleSlashPrev  = tripleSlashPrev;
exports.hashPrev         = hashPrev;
exports.semicolonPrev    = semicolonPrev;
exports.doubleHyphenPrev = doubleHyphenPrev;
//# sourceMappingURL=rules.js.map