const $ = id => document.getElementById(id);
const source = $("sourceText"), output = $("cleanedText");
const sourceStats = $("sourceStats"), resultStats = $("resultStats"), changeStats = $("changeStats");
const indicator = $("resultIndicator"), copyButton = $("copyButton"), downloadButton = $("downloadButton"), toast = $("toast");
let toastTimer;
function stats(value) {
 const words=(value.trim().match(/\S+/g)||[]).length, lines=value?value.split(/\r\n?|\n/).length:0;
 return words.toLocaleString()+" "+(words===1?"word":"words")+" · "+lines.toLocaleString()+" "+(lines===1?"line":"lines");
}
function updateSourceStats(){sourceStats.textContent=stats(source.value)}
function normalizeLine(line){return line.replace(/\u00a0/g," ").replace(/[\t ]+/g," ").trim()}
function cleanParagraph(lines,repairHyphens,preserveLists){
 const cleaned=lines.map(normalizeLine).filter(Boolean); if(!cleaned.length)return "";
 const listLine=/^\s*(?:[-*•▪◦‣]|\d{1,3}[.)])\s+/;
 if(preserveLists&&cleaned.some(line=>listLine.test(line)))return cleaned.join("\n");
 let result=cleaned[0];
 for(const next of cleaned.slice(1)){
  if(repairHyphens&&/[A-Za-z]-$/.test(result)&&/^[a-z]/.test(next))result=result.slice(0,-1)+next;
  else result+=" "+next;
 }
 return result;
}
function cleanText(value){
 const normalized=value.replace(/\r\n?/g,"\n").replace(/\u00a0/g," ");
 const joinLines=$("joinLines").checked, repairHyphens=$("joinHyphens").checked, keepParagraphs=$("keepParagraphs").checked, preserveLists=$("preserveLists").checked;
 const paragraphs=normalized.split(/\n[ \t]*\n+/);
 const cleaned=paragraphs.map(paragraph=>joinLines?cleanParagraph(paragraph.split("\n"),repairHyphens,preserveLists):paragraph.split("\n").map(normalizeLine).filter(Boolean).join("\n")).filter(Boolean);
 return cleaned.join(keepParagraphs?"\n\n":" ").trim();
}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2100)}
function runClean(){
 const before=source.value;if(!before.trim()){source.focus();showToast("Paste some text first.");return}
 const after=cleanText(before);output.value=after;resultStats.textContent=stats(after);
 const saved=Math.max(0,before.length-after.length);changeStats.textContent=saved?saved.toLocaleString()+" extra characters removed":"Text is already tidy";
 indicator.innerHTML="<span></span> Cleaned";copyButton.disabled=!after;downloadButton.disabled=!after;
}
async function copyResult(){
 if(!output.value)return;
 try{await navigator.clipboard.writeText(output.value);showToast("Cleaned text copied.")}
 catch{output.focus();output.select();const copied=document.execCommand("copy");window.getSelection()?.removeAllRanges();showToast(copied?"Cleaned text copied.":"Select the result and copy it.")}
}
function downloadResult(){
 if(!output.value)return;const blob=new Blob([output.value],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");
 link.href=url;link.download="cleaned-text.txt";document.body.append(link);link.click();link.remove();URL.revokeObjectURL(url);
}
source.addEventListener("input",updateSourceStats);$("cleanButton").addEventListener("click",runClean);copyButton.addEventListener("click",copyResult);downloadButton.addEventListener("click",downloadResult);
$("clearButton").addEventListener("click",()=>{source.value="";output.value="";resultStats.textContent=stats("");changeStats.textContent="No changes yet";indicator.innerHTML="<span></span> Ready";copyButton.disabled=true;downloadButton.disabled=true;updateSourceStats();source.focus()});
$("exampleButton").addEventListener("click",()=>{source.value="When you copy text from a PDF, a sentence can be split across\nmultiple lines even though it belongs in one paragraph. Some words are also\ninter-\nrupted by a hyphen at the edge of a line.\n\n• The original paragraphs stay separate.\n• This bullet list keeps its line breaks.";updateSourceStats();runClean()});
source.addEventListener("keydown",event=>{if((event.ctrlKey||event.metaKey)&&event.key==="Enter")runClean()});
updateSourceStats();resultStats.textContent=stats("");