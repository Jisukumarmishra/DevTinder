const { SendEmailCommand } = require( "@aws-sdk/client-ses");
const { sesClient } = require ("./sesClient.js");


const createSendEmailCommand = (toAddress, fromAddress,subject, body) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          // Data: `<h1>${body}</h1>`, // not using this because body already Contains HTML
          Data: body,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};


const run = async (subject, body) => {
  // console.log("sendEmail function started");
  // console.log("SES CLIENT:", sesClient);

    //   console.log("SUBJECT:", subject);
    // console.log("BODY:", body);
    // console.log("BODY TYPE:", typeof body);
  const sendEmailCommand = createSendEmailCommand(
    "jisuk138@gmail.com",
    "Jisu@devtinder.jisukumar.in",
    subject,
    body,

  );

    // console.log("EMAIL COMMAND:",
    //     JSON.stringify(sendEmailCommand.input, null, 2)
    // );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
      console.log("SES ERROR:", caught);
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };