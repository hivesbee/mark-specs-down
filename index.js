var ejs = require('ejs');
var MarkdownIt = require('markdown-it');
var hljs = require('highlightjs');
var fs = require('fs');

// markdown-it settings.
md = new MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }
        
        return ''; // use external default escaping
    }
});

if (process.argv.length > 4) {
    console.log('Error : Too many args.');
    return;
}

var src = process.argv[2] == undefined ? './sample.md' : process.argv[2];
var dest = process.argv[3] == undefined ? './sample.html' : process.argv[3];

var template = fs.readFileSync('./template.ejs', 'utf8');
var text = fs.readFileSync(src, 'utf8');

var parsed = md.render(text);
var html = ejs.render(template, { body: parsed });

fs.writeFileSync(dest, html, { encoding: 'utf8'});

/*
fs.readFile(src, 'utf8', function (err, text) {
    console.log('file read.');
    //console.log(text);

    // Markdown to Html
    var parsed = md.render(text);

    var html = ejs.render(template, {
        body: parsed
    });

    fs.writeFile(dest, html, function(err){
        if (err != null) {
            console.log(err);
        } else {
            console.log('file wrote.');
        }
    });
});*/
