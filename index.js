const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message('Hi', async ({ message, say }) => {
  say({
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
          action_id: 'button_click_handler',
        },
      },
    ],
  });
});

app.action('button_click_handler', ({ body, ack, say }) => {
  ack();

  say(`You push my buttons <@${body.user.id}>`);
});

(async () => {
  await app.start(4390);

  console.log('Slack App is running');
})();
