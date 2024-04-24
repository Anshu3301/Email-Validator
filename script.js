let mail = document.querySelector("#mail");
let send = document.querySelector("#send");
let resend = document.querySelector("#resend");
let verify = document.querySelector("#verify");
let otp = document.querySelector("#otp");
let validateButton = document.querySelector("#validate");
let generatedOTP,interval;
let i = 59;

// Generating & sending OTP
function sendOTP(mail_id) {
    let num = '';
    for (let j = 0; j < 6; j++) {
        num = num + `${Math.floor(((Math.random()) * 10))}`;
        if (num == '0') {
            num = '4';
        }
    }

    //smtpJS
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "sainjack46@gmail.com",
        Password: "6E968BA3C8D9442673D23B7BFA5A73F26DE2",
        To: `${mail_id}`,
        From: "sainjack46@gmail.com",
        Subject: "Your OTP",
        Body: `Your One Time Password(OTP) is: ${num}. Don't share this with anyone. Thank You!`
    })
        .then(() => {
            console.log(num); 
        })
        .catch((err) => console.log(err));

    return num;
}

// Count-down for Resend
function countdown() {
    interval = setInterval(() => {
        document.querySelector("#resend_in").innerHTML = `${i}`;
        i--;
        if (i == 0) {
            clearInterval(interval);
            send.style.opacity = '100%';
            resend.innerHTML = 'Resend Now!';
            send.disabled = false;
            send.style.cursor = 'pointer';
            i = 59;
            interval=null;
        }
    }, 1100);
}


send.addEventListener('click', () => {
    // console.log(typeof (mail.value));
    if (mail.value.trim() == '') {
        alert('Enter a Valid Email id...');
    } else {
        alert("Email sent Successfully!");
        countdown();

        let mail_id = mail.value;
        generatedOTP = sendOTP(mail_id);
        console.log(generatedOTP);

        // After click changes
        validateButton.style.display = 'block';
        resend.style.display = 'block';
        resend.innerHTML = `Resend in <span id="resend_in">59</span> sec(s)`;
        document.querySelector("#outer").style.height = '44vh';
        send.innerHTML = `Resend OTP`;
        send.disabled = true;
        send.style.cursor = 'no-drop';
        send.style.opacity = '50%';

    }
});

// Verifying Event Listener
verify.addEventListener('click', function otpCheck(){
    if (generatedOTP == otp.value) {
        generatedOTP = '';
        alert("Email verified Successfully!");
        send.innerHTML = `Send OTP`;
        send.style.opacity = '100%';
        send.style.cursor = 'pointer';
        document.querySelector("#outer").style.height = '23.5vh';
        send.disabled = false;
        send.style.cursor = 'pointer';
        validateButton.style.display = 'none';
        resend.style.display = 'none';
        mail.value = '';
        otp.value = '';
        i = 59;
    } else {
        alert("Invalid OTP! Try Again...");
    }
});
