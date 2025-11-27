const express = require("express");
const cors = require("cors");
const multer = require("multer");

const Brevo = require("@getbrevo/brevo");

const upload = multer();
const app = express();

app.use(cors());
app.use(upload.none());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your Brevo API Key here
const apiKey = "A5ePMN2tqrWu4oHy7kQ6"; // <-- your API key

const brevoClient = new Brevo.TransactionalEmailsApi();
brevoClient.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

app.post("/send-email", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const sendSmtpEmail = {
            sender: { email: email, name: name },
            to: [{ email: "aliyantowrat5227@gmail.com" }],
            subject: subject,
            htmlContent: `
                <h3>New Contact Form Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        await brevoClient.sendTransacEmail(sendSmtpEmail);

        res.json({ status: "success", message: "Email sent successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Failed to send email." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
