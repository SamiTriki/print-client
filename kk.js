var truc =  'paris1/{{id}}/{{document_name}}/{{id}}.{{extension}}';
var id = '100';
var document_name = 'document_fabrication';
var extension = 'pdf';

truc = truc.replace('{{id}}', id);
truc = truc.replace('{{document_name}}', document_name);
truc = truc.replace('{{extension}}', extension);

console.log(truc);