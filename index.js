const { App } = require('@slack/bolt');

// You can get these tokens from your Slack App configuration page
// Make sure to never share or publically post your tokens
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Simple message api that can listen to a message and respond
// message is the object containing the message sent and all it's metadata
// say is a service that can send messages to the chat
app.message('Hi', async ({ message, say }) => {
  say({
    // blocks are how you can send Slack UI elements in messages
    // Check out the Slack Block Kit Builder for a nice WYSIWYG UI that auto generates the JSON for you
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hello there, <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click_handler', // This ties the action of clicking the button to a handler
        },
      },
    ],
  });
});

// Actions are handlers for events ranging from button clicks, to messages and even simply logging in
app.action('button_click_handler', ({ body, ack, say }) => {
  ack(); // It is important to acknowledge the event first otherwise it will time out

  say(`You push my buttons <@${body.user.id}>`); // This action sends a message mentioning the user that fired off the event but actions can do many other things
});

(async () => {
  await app.start(4390);

  console.log('Slack App is running');
})();
