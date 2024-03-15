// Send  the  email with callback
const nodeMailer = require('nodemailer');

function sendMailCallback() {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testifyofficial721@gmail.com',
      pass: 'vggx xuzn fmis rtzn',
    },
  });

  const mailOptions = {
    from: 'testifyofficial721@gmaiil.com',
    to: 'nitineon123@gmail.com',
    subject: 'TEST MSG',
    html: `
    <p>Hello,</p>
    <p>Here is your order sir :</p>
    <img src="cid:logo" alt="Logo" />
    <p>Best regards,</p>
    <p>NITIN </p>
  `,
    attachments: [
      {
        filename: 'Logo.png',
        path: './Logo.png',
        cid: 'logo',
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
}
sendMailCallback();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Using Async/Await->>
const nodeMailer = require('nodemailer');

async function sendMailCallback() {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testifyofficial721@gmail.com',
        pass: 'vggx xuzn fmis rtzn',
      },
    });
    const mailOptions = {
      from: 'testifyofficial721@gmail.com',
      to: 'nitineon123@gmail.com',
      subject: 'test msg',
      html: `<p>hi,</p>`,
      attachments: [
        {
          filename: 'Logo.png',
          path: './Logo.png',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}
sendMailCallback();
