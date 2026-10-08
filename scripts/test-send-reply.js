import handler from '../api/support/send-reply.js';

const mockReq = {
  method: 'POST',
  body: {
    to: 'deepesh.garg@zohomail.in',
    subject: 'Pocket Advisor Inquiry',
    message: 'Hello Deepesh, this is a test agent reply from the Pocket Advisor Support Team!',
    ticketNumber: 'PA-2026-000003',
    agentName: 'Support Agent'
  }
};

const mockRes = {
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    console.log('SEND-REPLY STATUS:', this.statusCode, JSON.stringify(data, null, 2));
    return this;
  },
  setHeader() {}
};

handler(mockReq, mockRes).catch(console.error);
