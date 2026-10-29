const API_KEY="AQ.Ab8RN6KrW738Gejl4qjh5MDONS7vopmty2JshWq3vu1q2S4uxw"
const msgListLeft=document.getElementById("msg-list-left")
const msgListRight=document.getElementById("msg-list-right")
msgListLeft.style.listStyleType='none'
msgListRight.style.listStyleType='none'
function sendBtn(){
    msgListLeft.innerHTML=''
    msgListRight.innerHTML=''
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-goog-api-key", API_KEY);

    const input=document.getElementById("user-input")
    const text=input.value.trim()
    if(text==='')return;
    input.value=''
    input.focus()
    const newliR=document.createElement('li');
        newliR.textContent=text;
        newliR.style.fontSize = '18px';
        newliR.style.fontWeight = 'normal';
        newliR.style.fontStyle = 'normal';
        newliR.style.textDecoration = 'none';
        newliR.style.textTransform = 'none';
        newliR.style.textAlign = 'justify';

        msgListRight.appendChild(newliR);
    const raw = JSON.stringify({
        "contents": [
        {
            "parts": [
            {
                "text": text
            }
            ]
        }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        const newliL=document.createElement('li');
        const markdown = result.candidates[0].content.parts[0].text;

        const html = marked.parse(markdown);
        const cleanHtml = DOMPurify.sanitize(html);
        const temp = document.createElement("div");
        temp.innerHTML = cleanHtml;
        
        newliL.textContent=temp.innerText;
        newliL.style.fontSize = '18px';
        newliL.style.fontWeight = 'normal';
        newliL.style.fontFamily= 'Arial'
        newliL.style.fontStyle = 'normal';
        newliL.style.textDecoration = 'none';
        newliL.style.textTransform = 'none';
        newliL.style.textAlign = 'justify';
        
        msgListLeft.appendChild(newliL);
    })
    .catch((error) => console.error(error));
}
document.getElementById("user-input").addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendBtn()
            }
        });