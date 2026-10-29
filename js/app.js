const msgListLeft=document.getElementById("msg-list-left")
const msgListRight=document.getElementById("msg-list-right")
msgListLeft.style.listStyleType='none'
msgListRight.style.listStyleType='none'
function sendBtn(){
    msgListLeft.innerHTML=''
    msgListRight.innerHTML=''
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-goog-api-key", "AQ.Ab8RN6KDrN-46sM2jzAvgYaXhhkMzd5AxY_g6cqbsxdzNvBHwg");

    const input=document.getElementById("user-input")
    const text=input.value.trim()
    if(text==='')return;
    input.value=''
    input.focus()
    const newliR=document.createElement('li');
        newliR.textContent=text;
        newliR.style.fontSize = '20px';
        newliR.style.fontWeight = 'normal';
        newliR.style.fontStyle = 'normal';
        newliR.style.textDecoration = 'none';
        newliR.style.textTransform = 'none';
        newliR.style.textAlign= 'right';
        
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
        console.log(result);
        const newliL=document.createElement('li');
        newliL.textContent=result.candidates[0].content.parts[0].text;
        newliL.style.fontSize = '20px';
        newliL.style.fontWeight = 'normal';
        newliL.style.fontStyle = 'normal';
        newliL.style.textDecoration = 'none';
        newliL.style.textTransform = 'none';
        newliL.style.textAlign= 'right';
        
        msgListLeft.appendChild(newliL);
    })
    .catch((error) => console.error(error));
}
document.getElementById("user-input").addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendBtn()
            }
        });