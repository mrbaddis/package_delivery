import { MailboxPipe } from './mailbox.pipe';

describe('MailboxPipe', () => {
  it('create an instance', () => {
    const pipe = new MailboxPipe();
    expect(pipe).toBeTruthy();
  });
});
