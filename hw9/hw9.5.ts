enum Service {
  EMAIL = "email",
  SMS = "sms",
}

interface IMessage {
  sender: string;
  receiver: Service;
  content: string;
}

interface IMessageHandler {
  handleMessage(message: IMessage): void;
}

class Messenger {
  private messageHandlers: { [key: string]: IMessageHandler[] } = {};

  registerHandler(messageType: string, handler: IMessageHandler): void {
    if (!this.messageHandlers[messageType]) {
      this.messageHandlers[messageType] = [];
    }

    this.messageHandlers[messageType].push(handler);
  }

  sendMessage(message: IMessage): void {
    const { receiver } = message;

    if (this.messageHandlers[receiver]) {
      this.messageHandlers[receiver].forEach((handler) => {
        handler.handleMessage(message);
      });
    } else {
      console.log(`No handlers registered for receiver ${receiver}`);
    }
  }
}

class EmailService implements IMessageHandler {
  handleMessage(message: IMessage): void {
    console.log(`Sending email to ${message.receiver}: ${message.content}`);
  }
}

class SMSService implements IMessageHandler {
  handleMessage(message: IMessage): void {
    console.log(`Sending SMS to ${message.receiver}: ${message.content}`);
  }
}

const messenger = new Messenger();

const emailService = new EmailService();
messenger.registerHandler("email", emailService);

const smsService = new SMSService();
messenger.registerHandler("sms", smsService);

const message1: IMessage = {
  sender: "user1",
  receiver: Service.SMS,
  content: "Hello, Alex!",
};
messenger.sendMessage(message1);

const message2: IMessage = {
  sender: "user2",
  receiver: Service.SMS,
  content: "Hello, John!",
};
messenger.sendMessage(message2);

const message3: IMessage = {
  sender: "user3",
  receiver: Service.EMAIL,
  content: "Hello World",
};
messenger.sendMessage(message3);
