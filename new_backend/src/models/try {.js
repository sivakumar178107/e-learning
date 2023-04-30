try {
    const { fromEmail, name, toEmail, subject, body, attachment } = req.body;
    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: fromEmail,
        name: name,
    }

    const receivers = [
        {
            email: toEmail,
        },
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: subject,
        textContent: body,
        params: {
            role: 'Frontend',
        },
    })
        .then(console.log)
        .catch(console.log)

    bookMark.push(req.body);
    res.render("home", { body: req.body, click });
} catch (error) {
    throw new Error(error);
}
});

helpDeskMailer(email, name, subject, message,)

exports.helpDeskMailer = (fromEmail, name, subject, message) => {

    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: fromEmail,
        name: name,
    }

    const receivers = [
        {
            email: `${process.env.toEmail}`,
        },
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: subject,
        textContent: message,
        params: {
            role: 'Frontend',
        },
    })
        .then(console.log)
        .catch(console.log)
}


